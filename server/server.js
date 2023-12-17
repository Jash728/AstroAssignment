require("dotenv").config();
const express = require("express")
const cors = require("cors")
const app = express();
const connectDb = require("../server/utils/db")
const authRoute = require("./router/auth-router")

var corsOptions = {
    origin: 'http://127.0.0.1:5173',
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,

}


app.use(cors(corsOptions))
app.use(express.json());

app.use("/api", authRoute)

const PORT = 5000

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on ${PORT}`);
    });
})