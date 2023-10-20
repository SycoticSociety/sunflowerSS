import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { initialise } from "lib/utils/init";

import "./styles.css";
import { Navigation } from "./Navigation";
import { Helios } from "./Helios"; // Import your Helios component

// Initialise Global Settings
initialise();

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Helios />} /> {/* Helios is the default route */}
        <Route path="/other-route" element={<OtherComponent />} /> {/* Define other routes here */}
      </Routes>
    </BrowserRouter>
  );
};
