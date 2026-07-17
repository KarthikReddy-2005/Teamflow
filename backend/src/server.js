import connectDB from "./configs/db.js";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is Running at http://localhost:${PORT}`);
    });
  } catch (error) {}
};

startServer();
