import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
const PORT = parseInt(process.env.PORT || "3000", 10);

// configuracion de cors
app.use(
  cors({
    origin: "*", // En produccion especificar el url de mi app
    credentials: true,
  }),
);

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

/* For local use
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
*/
