import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import investmentRoutes from "./routes/investmentRoutes.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/prosperwise", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch((err) => console.log("❌ MongoDB Connection Error:", err));

app.use("/api/investments", investmentRoutes);

app.get("/", (req, res) => res.send("Backend running!"));

app.listen(5000, () => console.log("Server running on port 5000"));
