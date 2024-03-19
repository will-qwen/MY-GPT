import { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Chat } from "./chat";
import { Auth } from "./auth";
import { Path } from "../constant";



function Screen() {
  return (
    <div>
      <Routes>
        <Route path={Path.Home} element={<Auth />} />

        <Route path={Path.Chat} element={<Chat />} />
        {/* <Route path={Path.NewChat} element={<NewChat />} /> */}
        {/* <Route path={Path.Masks} element={<MaskPage />} /> */}
        {/* <Route path={Path.Chat} element={<Chat />} /> */}
        {/* <Route path={Path.Settings} element={<Settings />} /> */}
      </Routes>
    </div>
  );
}
export function Home() {
  return (
    <Router>
      <Screen />
    </Router>
  );
}
