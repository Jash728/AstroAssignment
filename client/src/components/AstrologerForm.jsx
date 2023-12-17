import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateAstrologerMutation } from "../services/astrologers";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField, Container, Typography, Grid } from "@mui/material";
import Footer from "./Footer";

const AstrologerForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    email: "",
    languages: "",
    specialties: "",
  });

  const [createAstrologer, { isLoading }] = useCreateAstrologerMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createAstrologer(formData);

      toast.success("Created Successful!", { autoClose: 3000 }); 
      navigate("/");
    } catch (error) {
      console.error("Error creating astrologer:", error);
    }
  };

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
      <Container component="main" maxWidth="xs" style={{ marginBottom: "95px" }}>
        <div>
          <Typography component="h1" variant="h5" style={{ marginTop: "20px" }}>
            Create Astrologer
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Languages"
                  name="languages"
                  value={formData.languages}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Specialties"
                  name="specialties"
                  value={formData.specialties}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Astrologer"}
            </Button>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                style={{ marginTop: "8px" }}
              >
                Cancel
              </Button>
            </Link>
          </form>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default AstrologerForm;
