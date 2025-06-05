"use client"

import { motion } from "framer-motion"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { Pencil, ImageIcon, Clock, Award } from "lucide-react"

function AboutPage() {
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
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                  About the Artist
                </Typography>
                <Typography variant="h6" paragraph>
                  Passionate about capturing emotions and memories through the art of sketching.
                </Typography>
                <Typography paragraph>
                  With over 10 years of experience in portrait sketching, I've developed a unique style that combines
                  realism with artistic expression. Each sketch is carefully crafted to capture not just the likeness,
                  but the essence and emotion of the subject.
                </Typography>
                <Typography paragraph>
                  My journey as an artist began in childhood, drawing everything I could see. This passion evolved into
                  a professional career after formal training in fine arts, specializing in pencil portraiture and
                  charcoal techniques.
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Box
                  component="img"
                  src="/placeholder.svg?height=600&width=600"
                  alt="Artist portrait"
                  sx={{
                    width: "100%",
                    borderRadius: 2,
                    boxShadow: 3,
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Tools & Techniques */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6 }}>
            Tools & Techniques
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                title: "Premium Pencils",
                description:
                  "Using high-quality graphite pencils ranging from 2H to 8B for precise shading and detailing.",
                icon: <Pencil className="h-10 w-10 mb-4 text-gray-700 dark:text-gray-300" />,
              },
              {
                title: "Archival Paper",
                description:
                  "All sketches are created on acid-free, archival quality paper to ensure longevity and durability.",
                icon: <ImageIcon className="h-10 w-10 mb-4 text-gray-700 dark:text-gray-300" />,
              },
              {
                title: "Detailed Process",
                description:
                  "Each sketch goes through multiple stages of refinement, from initial outline to detailed shading.",
                icon: <Clock className="h-10 w-10 mb-4 text-gray-700 dark:text-gray-300" />,
              },
              {
                title: "Quality Assurance",
                description:
                  "Every artwork is sealed with a fixative to prevent smudging and ensure the sketch remains pristine.",
                icon: <Award className="h-10 w-10 mb-4 text-gray-700 dark:text-gray-300" />,
              },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
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
                      alignItems: "center",
                      textAlign: "center",
                      p: 3,
                    }}
                    className="hover:shadow-lg transition-shadow duration-300"
                  >
                    <CardContent>
                      {item.icon}
                      <Typography variant="h5" component="h3" gutterBottom>
                        {item.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" className="dark:text-gray-300">
                        {item.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Artistic Style */}
      <Box sx={{ py: 8, bgcolor: "background.paper" }} className="bg-gray-50 dark:bg-gray-800">
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6 }}>
            Artistic Style
          </Typography>

          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Box
                  component="img"
                  src="/placeholder.svg?height=600&width=600"
                  alt="Artistic style example"
                  sx={{
                    width: "100%",
                    borderRadius: 2,
                    boxShadow: 3,
                  }}
                />
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Typography variant="h4" component="h3" gutterBottom>
                  Realistic with Emotional Depth
                </Typography>
                <Typography paragraph>
                  My sketching style balances technical precision with emotional expression. While I strive for
                  realistic representation, I also focus on capturing the emotion and personality behind each subject.
                </Typography>
                <Typography paragraph>
                  I specialize in creating high-contrast, detailed portraits that emphasize the play of light and
                  shadow. This technique brings depth and dimension to each sketch, making the subject come alive on
                  paper.
                </Typography>
                <Typography paragraph>
                  Whether it's a single portrait, a couple, or a family sketch, I pay special attention to the eyes and
                  facial expressions, as they are the windows to the soul and tell the most compelling stories.
                </Typography>
                <Typography>
                  Each commission is approached with care and dedication, ensuring that the final artwork not only
                  resembles the subject but also captures their essence and the emotion of the moment.
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6 }}>
            Client Testimonials
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                quote:
                  "The portrait captured my daughter's personality perfectly. It's now the centerpiece of our living room!",
                name: "Priya Sharma",
                location: "Mumbai",
              },
              {
                quote:
                  "Our wedding sketch is a beautiful reminder of our special day. The attention to detail is remarkable.",
                name: "Rahul & Neha",
                location: "Delhi",
              },
              {
                quote:
                  "I commissioned a family portrait and was blown away by the result. Every family member's personality shines through.",
                name: "Anand Family",
                location: "Bangalore",
              },
            ].map((testimonial, index) => (
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
                      p: 3,
                    }}
                    className="hover:shadow-lg transition-shadow duration-300"
                  >
                    <CardContent>
                      <Typography variant="body1" paragraph sx={{ fontStyle: "italic" }}>
                        "{testimonial.quote}"
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" className="dark:text-gray-300">
                        {testimonial.location}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </div>
  )
}

export default AboutPage
