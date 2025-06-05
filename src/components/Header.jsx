"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import MenuItem from "@mui/material/MenuItem"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import { Palette } from "lucide-react"

const pages = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Commission", path: "/commission" },
  { name: "Contact", path: "/contact" },
]

function Header({ darkMode, toggleDarkMode }) {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const location = useLocation()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppBar position="sticky" color="default" elevation={1} className="bg-white dark:bg-gray-900">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for larger screens */}
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}>
            <Palette className="h-8 w-8 text-gray-800 dark:text-white" />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SketchArtist
          </Typography>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={page.path}
                  selected={location.pathname === page.path}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo for mobile */}
          <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
            <Palette className="h-6 w-6 text-gray-800 dark:text-white" />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SketchArtist
          </Typography>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  mx: 1,
                  color: "inherit",
                  display: "block",
                  fontWeight: location.pathname === page.path ? 700 : 500,
                  borderBottom: location.pathname === page.path ? "2px solid" : "none",
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Dark mode toggle */}
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={toggleDarkMode} color="inherit">
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
