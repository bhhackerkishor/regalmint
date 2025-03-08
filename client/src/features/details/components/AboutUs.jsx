import React from 'react';
import { Container, Grid, Card, CardContent, Button, Typography, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GroupIcon from '@mui/icons-material/Group';
import StorefrontIcon from '@mui/icons-material/Storefront';

const AboutPage = () => {
  return (
    <div>
      <header style={{ backgroundColor: '#f4f4f4', padding: '3rem 0', textAlign: 'center' }}>
        <Container>
          <img src="/path/to/logo.png" alt="RegalMints Logo" style={{ maxWidth: '150px' }} />
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to RegalMints
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Your go-to destination for high-quality products at unbeatable prices.
          </Typography>
        </Container>
      </header>

      <section id="our-story" style={{ backgroundColor: '#fff', padding: '3rem 0' }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item md={6}>
              <Typography variant="h4" component="h2" gutterBottom>
                Our Story
              </Typography>
              <Typography variant="body1" paragraph>
                RegalMints started with a simple goal: provide a wide variety of premium products at affordable prices. We believe that everyone deserves access to quality items without breaking the bank. Our journey began in 2020, and today we offer a curated selection of electronics, home goods, fashion, and more. We’re constantly growing, ensuring we meet our customers' ever-changing needs.
              </Typography>
            </Grid>
            <Grid item md={6}>
              <img src="/path/to/your-image.jpg" alt="Our Story Image" style={{ width: '100%', borderRadius: '8px' }} />
            </Grid>
          </Grid>
        </Container>
      </section>

      <section id="mission-values" style={{ backgroundColor: '#f9f9f9', padding: '3rem 0' }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item md={6} textAlign="center">
              <Typography variant="h4" component="h2" gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body1" paragraph>
                Our mission is simple: to provide exceptional value to our customers by offering a curated range of high-quality products at the best prices. We aim to make online shopping easier, more affordable, and more enjoyable.
              </Typography>
            </Grid>
            <Grid item md={6} textAlign="center">
              <Typography variant="h4" component="h2" gutterBottom>
                Our Values
              </Typography>
              <Typography variant="body1" paragraph>
                <ul>
                  <li>Customer-centric: We always put our customers first.</li>
                  <li>Integrity: We stand by our products and services.</li>
                  <li>Innovation: We continuously seek new ways to improve.</li>
                  <li>Sustainability: We are committed to eco-friendly practices.</li>
                </ul>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </section>

      <section id="our-team" style={{ backgroundColor: '#fff', padding: '3rem 0' }}>
        <Container>
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Meet the Team
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {["John Doe", "Jane Smith", "Alex Lee"].map((member, index) => (
              <Grid item md={4} key={index}>
                <Card>
                  <CardContent style={{ textAlign: 'center' }}>
                    <img src={`/path/to/team-member${index + 1}.jpg`} alt={member} style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
                    <Typography variant="h6" component="h3" className="mt-3">
                      {member}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      {index === 0 ? "CEO & Founder" : index === 1 ? "Head of Marketing" : "Chief Product Officer"} <GroupIcon fontSize="small" />
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      <section id="contact" style={{ backgroundColor: '#f4f4f4', padding: '3rem 0' }}>
        <Container>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Contact Us
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Our Address:</Typography>
                  <Typography variant="body1">1234 E-Commerce Lane, Suite 567, New Delhi, India</Typography>
                </CardContent>
              </Card>
              <Card style={{ marginTop: '1rem' }}>
                <CardContent>
                  <Typography variant="h5">Phone Number:</Typography>
                  <Typography variant="body1">+91-9876543210</Typography>
                </CardContent>
              </Card>
              <Card style={{ marginTop: '1rem' }}>
                <CardContent>
                  <Typography variant="h5">Email Address:</Typography>
                  <Typography variant="body1"><a href="mailto:contact@regalmints.com">contact@regalmints.com</a></Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </section>

      <section id="cta" style={{ backgroundColor: '#333', color: '#fff', padding: '2rem 0', textAlign: 'center' }}>
        <Container>
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to Shop at RegalMints?
          </Typography>
          <Typography variant="body1" paragraph>
            Explore our wide selection of high-quality products at unbeatable prices. Start your shopping journey today!
          </Typography>
          <Button
            style={{ backgroundColor: 'black', color: '#fff' }}
            variant="contained"
            size="large"
            startIcon={<ShoppingCartIcon />}
            href="/products"
          >
            Shop Now
          </Button>
        </Container>
      </section>
    </div>
  );
};

export default AboutPage;
