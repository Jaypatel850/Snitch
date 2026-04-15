import React from "react";
import { Auth } from "./features/auth/pages/Auth";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
