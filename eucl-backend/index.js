const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "*" }));
// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
const tokenRoutes = require("./routes/tokens");
app.use("/api", tokenRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
