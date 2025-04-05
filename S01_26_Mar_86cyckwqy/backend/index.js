require("dotenv").config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const db = require("./db")



const app = express();
app.use(express.json());
app.use(cors());

const taskRoute= require("./routes/task")
app.use("/api",taskRoute)




const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});