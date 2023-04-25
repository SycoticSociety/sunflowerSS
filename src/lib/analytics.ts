import { initializeApp } from "firebase/app";
import {
  Analytics,
  AnalyticsCallOptions,
  CustomEventName,
  EventNameString,
  getAnalytics,
  logEvent,
  setUserId,
  setUserProperties,
} from "firebase/analytics";

type GameAnalyticEvent =
  | EventNameString
  | "tutorial_begin"
  | "tutorial_complete"
  | "earn_virtual_currency"
  | "spend_virtual_currency"
  | "level_up"
  | "unlock_achievement"
  // Custom events
  | "chore_complete"
  | "play_as_guest"
  | "wallet_connected"
  | "wallet_funded";

class GameAnalytics {
  private analytics: Analytics;

  public constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyCozYr5S8ahU0WSoTS13ctjtFrleD5rZB8",
      authDomain: "sunflower-land.firebaseapp.com",
      projectId: "sunflower-land",
      storageBucket: "sunflower-land.appspot.com",
      messagingSenderId: "1061537811936",
      appId: "1:1061537811936:web:4357cbb765c9c990f66f85",
      measurementId: "G-EM6CNBH1F8",
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    this.analytics = getAnalytics(app);
  }

  public initialise({ id, type }: { id?: number; type: "GUEST" | "FULL" }) {
    if (id) {
      setUserId(this.analytics, id.toString());
    }

    setUserProperties(this.analytics, {
      userType: type,
    });
  }

  /*
    Stick to standard Firebase events - this ensures reports work seamlessly
    Recommended game events: https://support.google.com/analytics/answer/9267735
  */
  public logEvent(
    eventName: GameAnalyticEvent,
    eventParams?: {
      [key: string]: any;
    },
    options?: AnalyticsCallOptions
  ): void {
    logEvent(
      this.analytics,
      eventName as CustomEventName<GameAnalyticEvent>,
      eventParams,
      options
    );
  }
}

export const analytics = new GameAnalytics();