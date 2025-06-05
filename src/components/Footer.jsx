import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"
import { Instagram, Facebook, Twitter, Mail } from "lucide-react"

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
      className="bg-gray-100 dark:bg-gray-900 dark:text-white"
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              SketchArtist
            </Typography>
            <Typography variant="body2" color="text.secondary" className="dark:text-gray-300">
              Creating beautiful, handcrafted sketches that capture moments and emotions.
            </Typography>
            <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
              <Link href="https://instagram.com" color="inherit" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://facebook.com" color="inherit" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com" color="inherit" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="mailto:contact@sketchartist.com" color="inherit" aria-label="Email">
                <Mail className="h-5 w-5" />
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <ul className="list-none p-0 m-0">
              <li className="mb-1">
                <Link href="/" color="inherit" underline="hover">
                  Home
                </Link>
              </li>
              <li className="mb-1">
                <Link href="/about" color="inherit" underline="hover">
                  About
                </Link>
              </li>
              <li className="mb-1">
                <Link href="/services" color="inherit" underline="hover">
                  Services
                </Link>
              </li>
              <li className="mb-1">
                <Link href="/commission" color="inherit" underline="hover">
                  Commission
                </Link>
              </li>
              <li>
                <Link href="/contact" color="inherit" underline="hover">
                  Contact
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" color="text.secondary" className="dark:text-gray-300">
              Email: contact@sketchartist.com
            </Typography>
            <Typography variant="body2" color="text.secondary" className="dark:text-gray-300">
              Phone: +91 98765 43210
            </Typography>
            <Typography variant="body2" color="text.secondary" className="dark:text-gray-300">
              Address: 123 Art Street, Creative City, India
            </Typography>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center" className="dark:text-gray-300">
            {"© "}
            {new Date().getFullYear()}
            {" SketchArtist. All rights reserved."}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
