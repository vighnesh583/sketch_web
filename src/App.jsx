"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ServicesPage from "./pages/ServicesPage"
import CommissionPage from "./pages/CommissionPage"
import ContactPage from "./pages/ContactPage"
import "./App.css"

const theme = createTheme({
  palette: {
    primary: {
      main: "#4a4a4a",
    },
    secondary: {
      main: "#f5f5f5",
    },
    background: {
      default: "#ffffff",
      paper: "#f9f9f9",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
  },
})

function App() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/commission" element={<CommissionPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
