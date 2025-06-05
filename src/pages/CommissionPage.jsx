"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Radio from "@mui/material/Radio"
import Checkbox from "@mui/material/Checkbox"
import InputAdornment from "@mui/material/InputAdornment"
import Alert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { Upload, Check, ArrowLeft, ArrowRight } from "lucide-react"
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init("GHAseR6OhmUrNUn3l");

// Steps for the multi-step form
const steps = [
  "User Information",
  "Sketch Type",
  "Size Selection",
  "Framing & Delivery",
  "Upload Image",
  "Review & Submit",
]

// Sketch types with prices
const sketchTypes = [
  { value: "single", label: "Single Portrait", price: 800 },
  { value: "double", label: "Double Portrait", price: 1500 },
  { value: "wedding", label: "Wedding", price: 2000 },
  { value: "family", label: "Family", price: 2500 },
  { value: "pet", label: "Pet", price: 1000 },
  { value: "other", label: "Other (Custom)", price: 1500 },
]

// Size options
const sizeOptions = [
  { value: "a4", label: "A4 (210 × 297 mm)", price: 0 },
  { value: "a3", label: "A3 (297 × 420 mm)", price: 0 },
  { value: "custom", label: "Custom Size", price: 500 },
]

function CommissionPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    sketchType: "single",
    size: "a4",
    frame: false,
    courier: false,
    distance: "",
    image: null,
    imagePreview: "",
    imageUrl: "",
    notes: "",
  })
  const [errors, setErrors] = useState({})
  const [totalCost, setTotalCost] = useState(0)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const fileInputRef = useRef(null)

  // Calculate total cost whenever relevant form data changes
  useEffect(() => {
    let cost = 0

    // Add sketch type cost
    const selectedSketchType = sketchTypes.find((type) => type.value === formData.sketchType)
    if (selectedSketchType) {
      cost += selectedSketchType.price
    }

    // Add size cost
    const selectedSize = sizeOptions.find((size) => size.value === formData.size)
    if (selectedSize) {
      cost += selectedSize.price
    }

    // Add frame cost if selected
    if (formData.frame) {
      cost += 400
    }

    // Add courier cost if selected
    if (formData.courier) {
      cost += 150
      // Add distance-based cost if provided
      if (formData.distance) {
        const distance = Number.parseInt(formData.distance)
        if (!isNaN(distance) && distance > 0) {
          // Add ₹5 per km for distances over 30km
          if (distance > 30) {
            cost += (distance - 30) * 5
          }
        }
      }
    }

    setTotalCost(cost)
  }, [formData])

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
    window.scrollTo(0, 0)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    // Clear error when field is updated
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrors({
          ...errors,
          image: "File size exceeds 10MB limit",
        })
        return
      }

      // Check file type
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setErrors({
          ...errors,
          image: "Only JPEG and PNG files are allowed",
        })
        return
      }

      try {
        // Create FormData for Cloudinary upload
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'unsigned_upload')
        formData.append('cloud_name', 'dk8dr8v2r')

        // Upload to Cloudinary
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dk8dr8v2r/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        )

        if (!response.ok) {
          throw new Error('Failed to upload image')
        }

        const data = await response.json()

        // Create local preview
        const reader = new FileReader()
        reader.onload = () => {
          setFormData(prev => ({
            ...prev,
            image: file,
            imagePreview: reader.result,
            imageUrl: data.secure_url
          }))
        }
        reader.readAsDataURL(file)

        // Clear error
        setErrors({
          ...errors,
          image: "",
        })
      } catch (error) {
        console.error('Error uploading image:', error)
        setErrors({
          ...errors,
          image: "Failed to upload image. Please try again."
        })
      }
    }
  }

  const validateStep = (step) => {
    let isValid = true
    const newErrors = {}

    switch (step) {
      case 0: // User Information
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

        if (!formData.phone.trim()) {
          newErrors.phone = "Phone number is required"
          isValid = false
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
          newErrors.phone = "Phone number should be 10 digits"
          isValid = false
        }

        if (!formData.address.trim()) {
          newErrors.address = "Address is required"
          isValid = false
        }
        break

      case 3: // Framing & Delivery
        if (formData.courier && !formData.distance.trim()) {
          newErrors.distance = "Please enter the distance for delivery"
          isValid = false
        } else if (formData.courier && isNaN(formData.distance)) {
          newErrors.distance = "Distance must be a number"
          isValid = false
        }
        break

      case 4: // Upload Image
        if (!formData.image) {
          newErrors.image = "Please upload a reference image"
          isValid = false
        }
        break

      default:
        break
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async () => {
    setSubmitting(true)

    try {
      // Format all values as simple strings
      const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        sketchType: sketchTypes.find(type => type.value === formData.sketchType)?.label,
        size: sizeOptions.find(size => size.value === formData.size)?.label,
        frame: formData.frame ? 'Yes' : 'No',
        courier: formData.courier ? 'Yes' : 'No',
        distance: formData.distance,
        notes: formData.notes,
        totalCost: `₹${totalCost}`,
        imageUrl: formData.imageUrl ? formData.imageUrl : 'No image uploaded'
      };

      console.log('Sending email with params:', templateParams); // Debug log

      // Send email using EmailJS
      const response = await emailjs.send(
        'service_xqnh8hy',
        'template_x6c242q',
        templateParams,
        'GHAseR6OhmUrNUn3l'
      );

      console.log('Email sent successfully:', response); // Debug log

      setSnackbarOpen(true)

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          sketchType: "single",
          size: "a4",
          frame: false,
          courier: false,
          distance: "",
          image: null,
          imagePreview: "",
          imageUrl: "",
          notes: "",
        })
        setActiveStep(0)
      }, 2000)
    } catch (error) {
      console.error("Error submitting form:", error)
      alert(`Error submitting form: ${error.message}`) // More detailed error message
    } finally {
      setSubmitting(false)
    }
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  // Render the appropriate step content
  const getStepContent = (step) => {
    switch (step) {
      case 0: // User Information
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Full Name"
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
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Address"
                name="address"
                multiline
                rows={3}
                value={formData.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
              />
            </Grid>
          </Grid>
        )

      case 1: // Sketch Type
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Select Sketch Type</FormLabel>
                <RadioGroup name="sketchType" value={formData.sketchType} onChange={handleChange}>
                  {sketchTypes.map((type) => (
                    <FormControlLabel
                      key={type.value}
                      value={type.value}
                      control={<Radio />}
                      label={`${type.label} - ₹${type.price}`}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Additional Notes (Optional)"
                name="notes"
                multiline
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                placeholder="Please provide any specific details about your sketch requirements"
              />
            </Grid>
          </Grid>
        )

      case 2: // Size Selection
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Select Size</FormLabel>
                <RadioGroup name="size" value={formData.size} onChange={handleChange}>
                  {sizeOptions.map((size) => (
                    <FormControlLabel
                      key={size.value}
                      value={size.value}
                      control={<Radio />}
                      label={`${size.label}${size.price > 0 ? ` - Additional ₹${size.price}` : " (Standard)"}`}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            {formData.size === "custom" && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Specify Custom Size (in mm)"
                  name="customSize"
                  placeholder="e.g., 400 × 500 mm"
                  onChange={handleChange}
                />
              </Grid>
            )}
          </Grid>
        )

      case 3: // Framing & Delivery
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Framing Options</FormLabel>
                <FormControlLabel
                  control={<Checkbox checked={formData.frame} onChange={handleChange} name="frame" />}
                  label="Add a frame to your sketch (₹400)"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Delivery Options</FormLabel>
                <FormControlLabel
                  control={<Checkbox checked={formData.courier} onChange={handleChange} name="courier" />}
                  label="Courier service (starts at ₹150)"
                />
              </FormControl>
            </Grid>
            {formData.courier && (
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Distance (km)"
                  name="distance"
                  type="number"
                  value={formData.distance}
                  onChange={handleChange}
                  error={!!errors.distance}
                  helperText={errors.distance || "Distance affects delivery cost (₹5/km for distances over 30km)"}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">km</InputAdornment>,
                  }}
                />
              </Grid>
            )}
          </Grid>
        )

      case 4: // Upload Image
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="body1" paragraph>
                Please upload a high-quality reference image for your sketch. This will help the artist create an
                accurate representation.
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph className="dark:text-gray-300">
                Accepted formats: JPEG, PNG (Max size: 10MB)
              </Typography>
              <Box
                sx={{
                  border: "2px dashed #ccc",
                  borderRadius: 2,
                  p: 3,
                  textAlign: "center",
                  cursor: "pointer",
                  mb: 2,
                  "&:hover": {
                    borderColor: "primary.main",
                  },
                }}
                onClick={() => fileInputRef.current.click()}
              >
                <input
                  type="file"
                  accept="image/jpeg, image/png"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <Upload className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                <Typography variant="body1">
                  {formData.image ? formData.image.name : "Click to upload or drag and drop"}
                </Typography>
              </Box>
              {errors.image && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                  {errors.image}
                </Typography>
              )}
            </Grid>
            {formData.imagePreview && (
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Preview:
                </Typography>
                <Box
                  component="img"
                  src={formData.imagePreview}
                  alt="Preview"
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "300px",
                    borderRadius: 1,
                  }}
                />
              </Grid>
            )}
          </Grid>
        )

      case 5: // Review & Submit
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Paper variant="outlined" sx={{ p: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Personal Information:</Typography>
                    <Typography variant="body2">Name: {formData.name}</Typography>
                    <Typography variant="body2">Email: {formData.email}</Typography>
                    <Typography variant="body2">Phone: {formData.phone}</Typography>
                    <Typography variant="body2">Address: {formData.address}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Sketch Details:</Typography>
                    <Typography variant="body2">
                      Type: {sketchTypes.find((type) => type.value === formData.sketchType)?.label}
                    </Typography>
                    <Typography variant="body2">
                      Size: {sizeOptions.find((size) => size.value === formData.size)?.label}
                    </Typography>
                    <Typography variant="body2">Frame: {formData.frame ? "Yes" : "No"}</Typography>
                    <Typography variant="body2">Courier: {formData.courier ? "Yes" : "No"}</Typography>
                    {formData.courier && formData.distance && (
                      <Typography variant="body2">Distance: {formData.distance} km</Typography>
                    )}
                  </Grid>
                  {formData.notes && (
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">Additional Notes:</Typography>
                      <Typography variant="body2">{formData.notes}</Typography>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Reference Image:</Typography>
                    {formData.imagePreview ? (
                      <Box
                        component="img"
                        src={formData.imagePreview}
                        alt="Reference"
                        sx={{
                          maxWidth: "100%",
                          maxHeight: "200px",
                          borderRadius: 1,
                          mt: 1,
                        }}
                      />
                    ) : (
                      <Typography variant="body2">No image uploaded</Typography>
                    )}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ bgcolor: "primary.light", color: "primary.contrastText" }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Total Cost: ₹{totalCost}
                  </Typography>
                  <Typography variant="body2">
                    This is an estimated cost based on your selections. The final price may vary slightly based on the
                    complexity of the sketch.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )

      default:
        return "Unknown step"
    }
  }

  // Live preview component
  const LivePreview = () => {
    // Get the selected sketch type and size
    const selectedSketchType = sketchTypes.find((type) => type.value === formData.sketchType)?.label || ""
    const selectedSize = sizeOptions.find((size) => size.value === formData.size)?.label || ""

    return (
      <Card sx={{ height: "100%" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Live Preview
          </Typography>
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: 1,
              p: 2,
              mb: 2,
              position: "relative",
              height: 300,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "background.paper",
            }}
          >
            {/* Frame */}
            {formData.frame && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  border: "10px solid #8B4513",
                  borderRadius: 1,
                  zIndex: 1,
                }}
              />
            )}

            {/* Sketch preview */}
            <Box
              sx={{
                width: formData.size === "a3" ? "80%" : "70%",
                height: formData.size === "a3" ? "80%" : "70%",
                bgcolor: "#f5f5f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                zIndex: 0,
              }}
            >
              {formData.imagePreview ? (
                <Box
                  component="img"
                  src={formData.imagePreview}
                  alt="Preview"
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    opacity: 0.7,
                  }}
                />
              ) : (
                <Typography variant="body2" color="text.secondary" align="center">
                  {selectedSketchType || "Sketch"} Preview
                </Typography>
              )}
            </Box>
          </Box>

          <Typography variant="body2" gutterBottom>
            <strong>Type:</strong> {selectedSketchType || "Not selected"}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Size:</strong> {selectedSize || "Not selected"}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Frame:</strong> {formData.frame ? "Yes" : "No"}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Delivery:</strong> {formData.courier ? "Courier" : "Not selected"}
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Estimated Cost: ₹{totalCost}
          </Typography>
        </CardContent>
      </Card>
    )
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
              Commission a Sketch
            </Typography>
            <Typography variant="h6" align="center" paragraph sx={{ maxWidth: "800px", mx: "auto", mb: 4 }}>
              Fill out the form below to request a custom sketch. Follow the steps to provide all the necessary details
              for your commission.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Commission Form */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Paper sx={{ p: { xs: 2, md: 4 } }} elevation={3}>
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Box sx={{ mb: 4 }}>{getStepContent(activeStep)}</Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                  <Button disabled={activeStep === 0} onClick={handleBack} startIcon={<ArrowLeft />}>
                    Back
                  </Button>

                  {activeStep === steps.length - 1 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      disabled={submitting}
                      endIcon={submitting ? null : <Check />}
                    >
                      {submitting ? "Submitting..." : "Submit Order"}
                    </Button>
                  ) : (
                    <Button variant="contained" color="primary" onClick={handleNext} endIcon={<ArrowRight />}>
                      Next
                    </Button>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <LivePreview />
              </Grid>
            </Grid>
          </Paper>
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
          Your commission request has been submitted successfully! We'll contact you soon.
        </Alert>
      </Snackbar>
    </div>
  )
}

export default CommissionPage
