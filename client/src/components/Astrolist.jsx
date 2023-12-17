import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Astrolist = () => {
  const [astrologers, setAstrologers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/astrologers")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setAstrologers(data))
      .then(() => console.log(astrologers))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
      });
  }, []);

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 70,
      disableColumnMenu: true,
      disableColumnSort: true,
    },
    {
      field: "name",
      headerName: "Name",
      width: 120,
      disableColumnMenu: true,
      disableColumnSort: true,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 90,
      disableColumnMenu: true,
      disableColumnSort: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      disableColumnMenu: true,
      disableColumnSort: true,
    },
    {
      field: "languages",
      headerName: "Languages",
      width: 150,
      disableColumnMenu: true,
      disableColumnSort: true,
    },
    {
      field: "specialties",
      headerName: "Specialties",
      width: 200,
      disableColumnMenu: true,
      disableColumnSort: true,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 80,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={params.row._id ? `/edit/${params.row._id}` : "#"}
        >
          Edit
        </Button>
      ),
      disableColumnMenu: true,
    },
  ];

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <div style={{ flexGrow: 1 }}>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
          </div>
          <Button color="inherit" component={Link} to="/add">
            Add Astrologer
          </Button>
        </Toolbar>
      </AppBar>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <div style={{ height: 300, width: "80%" }}>
          <DataGrid
            rows={astrologers}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            getRowId={(row) => row._id}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Astrolist;
