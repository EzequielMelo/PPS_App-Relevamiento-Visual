import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware";
import { Request, Response } from "express";

const router = express.Router();

router.get("/me", authenticateUser, (req: Request, res: Response) => {
  const user = res.locals.user;
  res.json({ user });
});

export default router;
