import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3214;

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend"))); // Serve frontend files

// Route to handle URL submission
app.post("/count-vi", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const response = await axios.get(url, { timeout: 5000 });
    const $ = cheerio.load(response.data);
    const text = $("body").text();
    const count = (text.match(/\bvi\b/gi) || []).length;

    res.json({ count });
  } catch (error) {
    console.error("Error: ", error.message);
    res.status(500).json({ error: "Failed to process the URL." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
