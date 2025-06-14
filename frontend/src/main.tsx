import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import user pages
import BookingPage from '@/app/pages/BookingPage.tsx'
import CheckoutPage from '@/app/pages/CheckoutPage.tsx'
import FoodDrinksPage from '@/app/pages/FoodDrinksPage.tsx'
import LoginPage from '@/app/pages/LoginPage.tsx'
import MovieListPage from '@/app/pages/MovieListPage.tsx'
import NewsUpdatesPage from '@/app/pages/NewsUpdatesPage.tsx'
import SignupPage from '@/app/pages/SignupPage.tsx'

import App from './App.tsx'
import './index.css'

// import admin page
import DashboardPage from './admin/pages/Dashboard.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/movielist" element={<MovieListPage />} />
        <Route path="/fooddrinks" element={<FoodDrinksPage />} />
        <Route path="/newsupdates" element={<NewsUpdatesPage />} />
        <Route path="/dashboard/admin" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
