import "dotenv/config";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Report from "./models/Report.js";

const app = express();
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in .env");
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.post("/api/report", async (req: Request, res: Response) => {
  try {
    const { message, url, userAgent } = req.body;
    const newReport = new Report({ message, url, userAgent });
    await newReport.save();
    res.status(200).json({ message: "Report received" });
  } catch (error) {
    console.error("Error saving report:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/reports", async (req: Request, res: Response) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
