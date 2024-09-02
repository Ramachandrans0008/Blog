import express from "express";
import cors from "cors";
import connectDB from "./LIB/db.js";
import postroutes from "./routes/posts.js";
import categoryroutes from "./routes/categories.js";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8585;

// DBS
connectDB();

// use routes
app.use("/api/posts", postroutes);
app.use("/api/categories", categoryroutes);

app.listen(PORT, () => {
  console.log("Server Running at " + PORT);
});
