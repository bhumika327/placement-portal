const express = require("express");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");
const companyRoutes =
require("./routes/companyRoutes");
const applicationRoutes =
require("./routes/applicationRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/students", studentRoutes);

app.use(
  "/api/applications",
  applicationRoutes
);

app.use(
  "/api/companies",
  companyRoutes
);

app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});