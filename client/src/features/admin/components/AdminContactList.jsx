import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Alert
} from "@mui/material";
import { fetchAllContactForms } from "../../contact/contactApi.jsx";

const AdminContactListScreen = () => {
  const [contact, setContact] = useState([]);
  const [error, setError] = useState(null);

  const fetchAllContact = async () => {
    try {
      const response = await fetchAllContactForms();
      setContact(response);
      console.log(response);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchAllContact();
  }, []);

  return (
    <div style={{ padding: "2rem" ,marginLeft:"230px"}}>
      <Typography variant="h4" gutterBottom>
        Contact Messages
      </Typography>

      {error && (
        <Alert severity="error" style={{ marginBottom: "1rem" }}>
          {error?.data?.message || "Error fetching messages"}
        </Alert>
      )}

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead style={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Message</strong></TableCell>
              <TableCell><strong>File</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contact.length > 0 ? (
              contact.map((msg) => (
                <TableRow key={msg._id}>
                  <TableCell>{msg.name}</TableCell>
                  <TableCell>{msg.email}</TableCell>
                  <TableCell>{msg.message}</TableCell>
                  <TableCell>
                    {msg.fileUrl ? (
                      <a
                        href={msg.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", color: "#1976d2" }}
                      >
                        View File
                      </a>
                    ) : (
                      "No File"
                    )}
                  </TableCell>
                  <TableCell>{new Date(msg.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="body1" color="textSecondary">
                    No messages available.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminContactListScreen;
