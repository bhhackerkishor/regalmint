import { useState } from "react";
import { Container, Paper, Typography, TextField, Button, Alert, CircularProgress, Box, Input } from "@mui/material";
import { submitContactForm } from "../contactApi";

const ContactScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("message", message);
      if (file) {
        formData.append("file", file);
      }

      // Use API function
      const data = await submitContactForm(formData);
      setSuccessMessage(data.message || "Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
      setFile(null);
    } catch (error) {
      setErrorMessage(error.message || "Error submitting message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ p: 4, mt: 5, borderRadius: "12px", backgroundColor: "#f9f9f9" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}>
          Contact Us
        </Typography>

        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <Box component="form" onSubmit={submitHandler} sx={{ mt: 2 }}>
          <TextField fullWidth label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} required sx={{ mb: 2 }} />

          <TextField fullWidth label="Email" type="email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} required sx={{ mb: 2 }} />

          <TextField fullWidth label="Message" variant="outlined" multiline rows={4} value={message} onChange={(e) => setMessage(e.target.value)} required sx={{ mb: 2 }} />

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Button variant="contained" component="label">
              Upload Proof (Image/PDF)
              <Input type="file" hidden onChange={handleFileChange} accept="image/*,application/pdf" />
            </Button>
            {file && <Typography variant="body2">{file.name}</Typography>}
          </Box>

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, p: 1.5, fontSize: "16px", fontWeight: "bold", textTransform: "none" }} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ContactScreen;
