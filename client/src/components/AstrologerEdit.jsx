import  { useState, useEffect } from "react";
import { Button, TextField, Typography, Container, Grid } from "@mui/material";
import {  Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Footer from "./Footer";

const AstrologerEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [astrologer, setAstrologer] = useState(null);
  const [isUpdateSuccessful, setUpdateSuccessful] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/${id}`)
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Astrologer not found");
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        }
        return response.json();
      })
      .then((data) => setAstrologer(data))
      .then(() => console.log("Astrologer", astrologer))
      .catch((error) =>
        console.error("Error fetching astrologer details:", error)
      );
  }, [id]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    fetch(`http://localhost:5000/api/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(astrologer),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((updatedAstrologer) => {
        console.log("Changes submitted successfully:", updatedAstrologer);
      })
      .catch((error) => {
        console.error("Error submitting changes:", error);
      });

    setUpdateSuccessful(true);
    setTimeout(() => {
      setUpdateSuccessful(false);
      navigate("/");
      toast.success("Update Successful!", { autoClose: 3000 }); 
    }, 1000);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAstrologer((prevAstrologer) => ({ ...prevAstrologer, [name]: value }));
  };

  if (astrologer === null) {
    console.log("Astrologer is null. Still loading...");
    return <div>Loading...</div>;
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <div style={{ flexGrow: 1 }}>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
          </div>
          
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs" style={{ marginBottom: "120px" }}>
        <div>
          <Typography component="h1" variant="h5" marginBlockEnd={2} style={{ marginTop: "20px" }}>
            Edit Astrologer
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={astrologer.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Gender"
                  name="gender"
                  value={astrologer.gender}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={astrologer.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Languages"
                  name="languages"
                  value={astrologer.languages}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Specialties"
                  name="specialties"
                  value={astrologer.specialties}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Submit Changes
            </Button>
          </form>
        </div>
        
      </Container>
      <Footer/>
    </>
  );
};

export default AstrologerEdit;
