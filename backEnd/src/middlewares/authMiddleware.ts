import { Request, Response, NextFunction } from "express";
import { supabase } from "../supabaseClient";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "No token provided" });
      return;
    }
    const token = authHeader.split(" ")[1];

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      res.status(401).json({ error: "Invalid or expired token" });
      return;
    }

    // Asigna el usuario a una variable temporal en `req.locals` (o cualquier otro objeto)
    res.locals.user = {
      id: data.user.id,
      email: data.user.email || "",
    };

    next(); // Llama a next() si la autenticación es exitosa
  } catch (error) {
    next(error); // Pasa los errores al manejador de errores de Express
  }
};
