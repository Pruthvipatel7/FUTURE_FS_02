const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Lead = require("./models/Lead");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/miniCRM", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Login (simple admin)
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "1234") {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// Create Lead
app.post("/leads", async (req, res) => {
  const lead = new Lead(req.body);
  await lead.save();
  res.json(lead);
});

// Get Leads
app.get("/leads", async (req, res) => {
  const leads = await Lead.find();
  res.json(leads);
});

// Update Lead
app.put("/leads/:id", async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body);
  res.json(lead);
});

// Delete Lead
app.delete("/leads/:id", async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});