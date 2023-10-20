import React from "react";
import { BrowserRouter } from 'react-router-dom';

import { initialise } from "lib/utils/init";

import "./styles.css";
import * as Auth from "features/auth/lib/Provider";
import ErrorBoundary from "features/auth/components/ErrorBoundary";
import { Navigation } from "./Navigation";

// Initialise Global Settings
initialise();

/**
 * Top level wrapper for providers
 */
export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Auth.Provider>
        <ErrorBoundary>
          <Navigation />
        </ErrorBoundary>
      </Auth.Provider>
    </BrowserRouter>
  );
};
