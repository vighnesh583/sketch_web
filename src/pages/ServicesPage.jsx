"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import { ArrowRight } from "lucide-react"

// Service data
const services = [
  {
    id: 1,
    title: "Single Portrait",
    description:
      "A detailed sketch of one person, capturing their likeness and personality. Perfect for individual portraits, graduation photos, or professional headshots.",
    price: "₹800",
    timeframe: "5-7 days",
    image: "/placeholder.svg?height=400&width=400",
    features: [
      "High-quality pencil sketch",
      "Detailed facial features",
      "Various sizes available (A4, A3)",
      "Optional framing",
    ],
  },
  {
    id: 2,
    title: "Double Portrait",
    description:
      "A beautiful sketch of two people, perfect for couples, siblings, or friends. Captures the relationship and connection between the subjects.",
    price: "₹1500",
    timeframe: "7-10 days",
    image: "/placeholder.svg?height=400&width=400",
    features: [
      "Two subjects in one sketch",
      "Focus on relationship dynamics",
      "Various poses available",
      "Optional background elements",
    ],
  },
  {
    id: 3,
    title: "Wedding Portrait",
    description:
      "Commemorate your special day with a detailed sketch of the bride and groom. Based on your wedding photos, this sketch captures the emotion and beauty of the occasion.",
    price: "₹2000",
    timeframe: "10-14 days",
    image: "/placeholder.svg?height=400&width=400",
    features: [
      "Based on wedding photographs",
      "Detailed wedding attire",
      "Captures emotional moments",
      "Premium paper quality",
    ],
  },
  {
    id: 4,
    title: "Family Portrait",
    description:
      "A comprehensive family sketch that includes multiple family members. Perfect for family reunions, anniversaries, or as a special gift.",
    price: "₹2500+",
    timeframe: "14-21 days",
    image: "/placeholder.svg?height=400&width=400",
    features: [
      "Up to 5 family members",
      "Additional members at extra cost",
      "Various grouping options",
      "Larger size options available",
    ],
  },
  {
    id: 5,
    title: "Pet Portrait",
    description:
      "A loving sketch of your furry friend that captures their personality and charm. Based on your favorite photo of your pet.",
    price: "₹1000",
    timeframe: "5-7 days",
    image: "/placeholder.svg?height=400&width=400",
    features: [
      "Detailed fur textures",
      "Captures pet personality",
      "Various sizes available",
      "Makes a perfect memorial gift",
    ],
  },
  {
    id: 6,
    title: "Custom Sketch",
    description:
      "Have something special in mind? Commission a custom sketch based on your specific requirements. Can include landscapes, buildings, or special themes.",
    price: "Varies",
    timeframe: "Varies",
    image: "/placeholder.svg?height=400&width=400",
    features: [
      "Completely customizable",
      "Consultation included",
      "Multiple revision options",
      "Special requests accommodated",
    ],
  },
]

function ServicesPage() {
  return (
    <div>
      {/* Hero Section */}
      <Box
        sx={{
          py: 8,
          bgcolor: "background.paper",
        }}
        className="bg-gray-50 dark:bg-gray-800"
      >
        <Container maxWidth="lg">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Typography variant="h2" component="h1" align="center" gutterBottom sx={{ fontWeight: 700 }}>
              Services & Pricing
            </Typography>
            <Typography variant="h6" align="center" paragraph sx={{ maxWidth: "800px", mx: "auto", mb: 4 }}>
              Explore the range of sketch services offered, from individual portraits to family sketches, each crafted
              with care and attention to detail.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Services Grid */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} md={6} lg={4} key={service.id}>
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
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <CardMedia component="img" height="250" image={service.image} alt={service.title} />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" component="h2" gutterBottom>
                        {service.title}
                      </Typography>
                      <Typography variant="h6" color="primary" gutterBottom>
                        {service.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom className="dark:text-gray-300">
                        Timeframe: {service.timeframe}
                      </Typography>
                      <Typography variant="body2" paragraph sx={{ mt: 2 }}>
                        {service.description}
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="subtitle2" gutterBottom>
                        Features:
                      </Typography>
                      <ul className="list-disc pl-5 mt-2">
                        {service.features.map((feature, i) => (
                          <li key={i} className="mb-1">
                            <Typography variant="body2">{feature}</Typography>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button component={Link} to="/commission" variant="contained" fullWidth endIcon={<ArrowRight />}>
                        Commission Now
                      </Button>
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Additional Options */}
      <Box sx={{ py: 8, bgcolor: "background.paper" }} className="bg-gray-50 dark:bg-gray-800">
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6 }}>
            Additional Options
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                title: "Framing",
                price: "₹400",
                description:
                  "Add a beautiful, high-quality frame to your sketch. Available in various styles and colors to complement your artwork.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                title: "Size Upgrade",
                price: "₹300 - ₹600",
                description:
                  "Upgrade from standard A4 size to A3 or custom sizes for a more impactful presentation of your sketch.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                title: "Courier Service",
                price: "₹150+",
                description:
                  "Safe and secure delivery of your sketch to your doorstep. Price varies based on location and distance.",
                image: "/placeholder.svg?height=300&width=300",
              },
            ].map((option, index) => (
              <Grid item xs={12} md={4} key={index}>
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
                    }}
                  >
                    <CardMedia component="img" height="200" image={option.image} alt={option.title} />
                    <CardContent>
                      <Typography variant="h5" component="h3" gutterBottom>
                        {option.title}
                      </Typography>
                      <Typography variant="h6" color="primary" gutterBottom>
                        {option.price}
                      </Typography>
                      <Typography variant="body2">{option.description}</Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Typography variant="h3" component="h2" align="center" gutterBottom>
              Ready to Commission Your Sketch?
            </Typography>
            <Typography variant="h6" align="center" sx={{ mb: 4 }}>
              Start the process today and turn your special moments into timeless art.
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
          </motion.div>
        </Container>
      </Box>
    </div>
  )
}

export default ServicesPage
