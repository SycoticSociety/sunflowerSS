import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "@xstate/react";
import {
  Routes,
  Route,
  HashRouter,
  Navigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";

import * as AuthProvider from "features/auth/lib/Provider";

import { Splash } from "features/auth/components/Splash";
import { Auth } from "features/auth/Auth";

import { useImagePreloader } from "features/auth/useImagePreloader";
import { CONFIG } from "lib/config";
import { Retreat } from "features/retreat/Retreat";
import { Builder } from "features/builder/Builder";
import { wallet } from "lib/blockchain/wallet";
import { AuthMachineState } from "features/auth/lib/authMachine";
import { ZoomProvider } from "components/ZoomProvider";
import { World } from "features/world/World";
import { CommunityTools } from "features/world/ui/CommunityTools";
import { Helios } from "features/helios/Helios"; // Added Helios import

/**
 * FarmID must always be passed to the /retreat/:id route.
 * The problem is that when deep-linking to the goblin trader, the FarmID will not be present.
 * This react-router helper component will compute the correct route and navigate to retreat.
 */
const TraderDeeplinkHandler: React.FC<{ farmId?: number }> = ({ farmId }) => {
  const [params] = useSearchParams();

  if (!farmId) return null;

  return (
    <Navigate to={`/retreat/${farmId}?${createSearchParams(params)}`} replace />
  );
};

const selectProvider = (state: AuthMachineState) =>
  state.context.user.web3?.provider;
const selectFarmId = (state: AuthMachineState) => state.context.user.farmId;
const selectState = (state: AuthMachineState) => ({
  isAuthorised: state.matches({ connected: "authorised" }),
  isVisiting: state.matches("visiting"),
});

/**
 * Entry point for the game, which reflects the user session state.
 * Controls the flow of authorized and unauthorized games.
 */
export const Navigation: React.FC = () => {
  const { authService } = useContext(AuthProvider.Context);
  const provider = useSelector(authService, selectProvider);
  const farmId = useSelector(authService, selectFarmId);
  const state = useSelector(authService, selectState);

  const [showGame, setShowGame] = useState(false);
  useImagePreloader();

  /**
   * Listen to web3 account/chain changes.
   * TODO: move into a hook
   */
  useEffect(() => {
    if (provider) {
      if (provider.on) {
        provider.on("chainChanged", (chain: any) => {
          if (parseInt(chain) === CONFIG.POLYGON_CHAIN_ID) {
            return;
          }

          // Phantom handles this internally.
          if (provider.isPhantom) return;

          authService.send("CHAIN_CHANGED");
        });
        provider.on("accountsChanged", function (accounts: string[]) {
          // Metamask Mobile accidentally triggers this on route changes.
          const didChange = accounts[0] !== wallet.myAccount;
          if (didChange) {
            authService.send("ACCOUNT_CHANGED");
          }
        });
      } else if (provider.givenProvider) {
        provider.givenProvider.on("chainChanged", () => {
          authService.send("CHAIN_CHANGED");
        });
        provider.givenProvider.on("accountsChanged", function () {
          authService.send("ACCOUNT_CHANGED");
        });
      }
    }
  }, [provider]);

  useEffect(() => {
    const _showGame = state.isAuthorised || state.isVisiting;

    // TODO: look into this further.
    // This is to prevent a modal clash when the auth machine switches
    // to the game machine.
    setTimeout(() => setShowGame(_showGame), 20);
  }, [state]);

  return (
    <>
      <Auth />
      {showGame ? (
        <ZoomProvider>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Helios />} /> {/* Use Helios as the default starting map. */}
              {/* Forbid entry to Goblin Village when in Visiting State and show Forbidden screen. */}
              {!state.isVisiting && (
                <Route
                  path="/goblins"
                  element={
                    <Splash>
                      {/* You can add content for the Goblin Village here. */}
                    </Splash>
                  }
                />
              }
              <Route path="/world/:name" element={<World key="world" />} />
              <Route
                path="/community/:name"
                element={<World key="community" isCommunity />}
              />
              {CONFIG.NETWORK === "mumbai" && (
                <Route
                  path="/community-tools"
                  element={<CommunityTools key="community-tools" />}
                />
              }

              <Route path="/visit/*" element={<Helios key="visit" />} /> {/* Use Helios for visiting as well. */}
              <Route
                path="/land/:id?/*"
                element={<Helios key="land" />} // Use Helios for land.
              />
              <Route path="/retreat">
                <Route
                  index
                  element={<TraderDeeplinkHandler farmId={farmId} />}
                />
                <Route path=":id" element={<Retreat key="retreat" />} />
              </Route>
              {CONFIG.NETWORK === "mumbai" && (
                <Route path="/builder" element={<Builder key="builder" />} />
              )}
            </Routes>
          </HashRouter>
        </ZoomProvider>
      ) : (
        <Splash />
      )}
    </>
  );
};
