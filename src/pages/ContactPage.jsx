"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Alert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { Send, Phone, Mail, MapPin, Clock } from "lucide-react"

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState({})
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when field is updated
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
      isValid = false
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
      isValid = false
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setSubmitting(true)

    try {
      // In a real application, you would send the form data to your backend
      // or use a service like EmailJS to send the data to the artist's email

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSnackbarOpen(true)

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error sending your message. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

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
              Contact Us
            </Typography>
            <Typography variant="h6" align="center" paragraph sx={{ maxWidth: "800px", mx: "auto", mb: 4 }}>
              Have questions about commissioning a sketch or want to discuss a custom project? Get in touch with us
              using the form below or through our contact information.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Contact Form & Info */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Paper sx={{ p: { xs: 3, md: 4 } }} elevation={3}>
                  <Typography variant="h4" gutterBottom>
                    Send a Message
                  </Typography>
                  <Typography variant="body1" paragraph color="text.secondary" className="dark:text-gray-300">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </Typography>

                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          label="Your Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          error={!!errors.name}
                          helperText={errors.name}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          label="Email Address"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          error={!!errors.email}
                          helperText={errors.email}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          label="Subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          error={!!errors.subject}
                          helperText={errors.subject}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          label="Message"
                          name="message"
                          multiline
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          error={!!errors.message}
                          helperText={errors.message}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          size="large"
                          disabled={submitting}
                          endIcon={<Send />}
                        >
                          {submitting ? "Sending..." : "Send Message"}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={5}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card sx={{ mb: 4 }}>
                  <CardContent>
                    <Typography variant="h4" gutterBottom>
                      Contact Information
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                      <Box sx={{ display: "flex", mb: 3 }}>
                        <Phone className="h-6 w-6 mr-3 text-gray-700 dark:text-gray-300" />
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            Phone
                          </Typography>
                          <Typography variant="body1" color="text.secondary" className="dark:text-gray-300">
                            +91 98765 43210
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: "flex", mb: 3 }}>
                        <Mail className="h-6 w-6 mr-3 text-gray-700 dark:text-gray-300" />
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            Email
                          </Typography>
                          <Typography variant="body1" color="text.secondary" className="dark:text-gray-300">
                            contact@sketchartist.com
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: "flex", mb: 3 }}>
                        <MapPin className="h-6 w-6 mr-3 text-gray-700 dark:text-gray-300" />
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            Address
                          </Typography>
                          <Typography variant="body1" color="text.secondary" className="dark:text-gray-300">
                            123 Art Street, Creative City
                            <br />
                            India - 400001
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: "flex" }}>
                        <Clock className="h-6 w-6 mr-3 text-gray-700 dark:text-gray-300" />
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            Working Hours
                          </Typography>
                          <Typography variant="body1" color="text.secondary" className="dark:text-gray-300">
                            Monday - Friday: 9:00 AM - 6:00 PM
                            <br />
                            Saturday: 10:00 AM - 4:00 PM
                            <br />
                            Sunday: Closed
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      Follow Us
                    </Typography>
                    <Typography variant="body1" paragraph color="text.secondary" className="dark:text-gray-300">
                      Stay updated with our latest sketches and offers by following us on social media.
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Button variant="outlined" href="https://instagram.com" target="_blank" rel="noopener">
                        Instagram
                      </Button>
                      <Button variant="outlined" href="https://facebook.com" target="_blank" rel="noopener">
                        Facebook
                      </Button>
                      <Button variant="outlined" href="https://twitter.com" target="_blank" rel="noopener">
                        Twitter
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Map Section */}
      <Box sx={{ py: 8, bgcolor: "background.paper" }} className="bg-gray-50 dark:bg-gray-800">
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 4 }}>
            Our Location
          </Typography>

          <Box
            sx={{
              width: "100%",
              height: "400px",
              bgcolor: "#eee",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* In a real application, you would embed a Google Map here */}
            <Typography variant="body1" color="text.secondary">
              Map would be embedded here
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          Your message has been sent successfully! We'll get back to you soon.
        </Alert>
      </Snackbar>
    </div>
  )
}

export default ContactPage
