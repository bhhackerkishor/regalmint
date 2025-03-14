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
          <img 
  src="https://static.vecteezy.com/system/resources/thumbnails/004/700/955/small/rm-letter-logo-concept-isolated-on-white-background-vector.jpg" 
  alt="RegalMints Logo" 
  style={{ maxWidth: '150px', borderRadius: '50%' }} 
/>
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
              <img src="https://img.freepik.com/premium-photo/modern-office-building-business-center-neural-network-ai-generated_76080-22242.jpg" alt="Our Story Image" style={{ width: '100%', borderRadius: '8px' }} />
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

      <section id="about-me" style={{ backgroundColor: '#fff', padding: '3rem 0' }}>
  <Container>
    <Typography variant="h4" component="h2" align="center" gutterBottom>
      Meet the Founder
    </Typography>
    <Grid container justifyContent="center">
      <Grid item md={4}>
        <Card>
          <CardContent style={{ textAlign: 'center' }}>
            <img src="https://kishordev.vercel.app/images/person.png" alt="Kishor" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
            <Typography variant="h6" component="h3" className="mt-3">
              Kishor
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Founder & CEO
            </Typography>
            <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
              Passionate about building innovative solutions and making e-commerce accessible for everyone.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              href="https://kishordev.vercel.app" 
              target="_blank" 
              style={{ marginTop: '15px' }}
            >
              View Portfolio
            </Button>
          </CardContent>
        </Card>
      </Grid>
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
