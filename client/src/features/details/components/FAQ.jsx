import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Container, Paper } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQ = () => {
  const faqs = [
    { question: "How can I track my order?", answer: "You can track your order through the 'Order History' section in your account." },
    { question: "What payment methods are accepted?", answer: "We accept credit/debit cards, UPI, and Wallets." },
    { question: "Can I return a product?", answer: "Yes, products can be returned within 7 days of purchase." },
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: "12px", backgroundColor: "#fafafa" }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", textAlign: "center" }}>
          Frequently Asked Questions
        </Typography>
        
        {faqs.map((faq, index) => (
          <Accordion key={index} sx={{ mt: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>
    </Container>
  );
};

export default FAQ;
