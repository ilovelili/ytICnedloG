require("dotenv").config();

const express = require("express");
const cors = require("cors");
const voteRoutes = require("./routes/voteRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Voting API is running" });
});

app.use("/", voteRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});
