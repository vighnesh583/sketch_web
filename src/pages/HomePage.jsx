"use client"

import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

// Sample gallery images
const galleryImages = [
  {
    id: 1,
    src: "/placeholder.svg?height=400&width=300",
    alt: "Portrait sketch",
    title: "Portrait",
    size: "medium",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=500&width=300",
    alt: "Family sketch",
    title: "Family",
    size: "large",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=350&width=300",
    alt: "Wedding sketch",
    title: "Wedding",
    size: "medium",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=450&width=300",
    alt: "Couple sketch",
    title: "Couple",
    size: "large",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=380&width=300",
    alt: "Pet sketch",
    title: "Pet",
    size: "medium",
  },
  {
    id: 6,
    src: "/placeholder.svg?height=420&width=300",
    alt: "Landscape sketch",
    title: "Landscape",
    size: "medium",
  },
]

function HomePage() {
  const galleryRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    const galleryItems = document.querySelectorAll(".gallery-item")
    galleryItems.forEach((item) => {
      observer.observe(item)
    })

    return () => {
      galleryItems.forEach((item) => {
        observer.unobserve(item)
      })
    }
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <Box
        sx={{
          height: { xs: "70vh", md: "80vh" },
          display: "flex",
          alignItems: "center",
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(/placeholder.svg?height=1080&width=1920)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
        }}
        className="parallax"
      >
        <Container maxWidth="lg">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
              }}
            >
              Capturing Moments Through Sketches
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, maxWidth: "800px" }}>
              Handcrafted, personalized sketches that bring your memories to life with artistic precision and emotion.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                component={Link}
                to="/commission"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "white",
                  color: "black",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.9)",
                  },
                }}
              >
                Commission a Sketch
              </Button>
              <Button
                component={Link}
                to="/services"
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "white",
                  color: "white",
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                View Services
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Gallery Section */}
      <Box sx={{ py: 8 }} ref={galleryRef}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6 }}>
            Gallery
          </Typography>

          <div className="masonry-grid">
            {galleryImages.map((image) => (
              <div key={image.id} className={`gallery-item masonry-item opacity-0`}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={image.src}
                    alt={image.alt}
                    sx={{
                      height: image.size === "large" ? 400 : 300,
                      objectFit: "cover",
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6">{image.title}</Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Button component={Link} to="/services" variant="outlined" size="large" endIcon={<ArrowRight />}>
              View All Artworks
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Services Preview */}
      <Box sx={{ py: 8, bgcolor: "background.paper" }} className="bg-gray-50 dark:bg-gray-800">
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6 }}>
            Services
          </Typography>

          <Grid container spacing={4}>
            {[
              { title: "Single Portrait", price: "₹800", image: "/placeholder.svg?height=300&width=300" },
              { title: "Double Portrait", price: "₹1500", image: "/placeholder.svg?height=300&width=300" },
              { title: "Wedding Sketch", price: "₹2000", image: "/placeholder.svg?height=300&width=300" },
            ].map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <CardMedia component="img" height="200" image={service.image} alt={service.title} />
                    <CardContent>
                      <Typography variant="h5" component="h3" gutterBottom>
                        {service.title}
                      </Typography>
                      <Typography variant="h6" color="primary" gutterBottom>
                        {service.price}
                      </Typography>
                      <Button
                        component={Link}
                        to="/commission"
                        variant="text"
                        endIcon={<ArrowRight />}
                        sx={{ mt: 2, p: 0 }}
                      >
                        Commission Now
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Button component={Link} to="/services" variant="contained" size="large" endIcon={<ArrowRight />}>
              View All Services
            </Button>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 10,
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/placeholder.svg?height=600&width=1920)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
        }}
        className="parallax"
      >
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            Ready to Capture Your Memory?
          </Typography>
          <Typography variant="h6" align="center" sx={{ mb: 4 }}>
            Commission a custom sketch today and transform your special moments into timeless art.
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <Button
              component={Link}
              to="/commission"
              variant="contained"
              size="large"
              sx={{
                bgcolor: "white",
                color: "black",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.9)",
                },
              }}
            >
              Start Your Commission
            </Button>
          </Box>
        </Container>
      </Box>
    </div>
  )
}

export default HomePage
