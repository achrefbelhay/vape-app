const express = require("express");
const app = express();

const authRoutes = require("./routes/auth");
const db = require("./Config/db");
db();
app.use(express.json());
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`The server is running on port ${port}`));
