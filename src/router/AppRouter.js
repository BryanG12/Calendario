import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { LoginScreen } from '../auth/LoginScreen';
import { CalendarScreen } from '../calendar/CalendarScreen';

export const AppRouter = () => {
  return( 
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<CalendarScreen />} />
        
        <Route path="/login" element={<LoginScreen />} />
        
        <Route path="/*" element={<LoginScreen />} />

      </Routes>
    </BrowserRouter>
  );
};
