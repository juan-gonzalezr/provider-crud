import axios from "axios";
import { Request, Response } from "express";

// Controlador para obtener el JWT
export const getJWTToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await axios.post(
      "https://analyticsdev.app.marval.com.co/api/jwtjde/loginjwt",
      {
        login: "prueba",
        pswd: "4d89b2a6498c0f4170ef9aa1de125a27.1dd564de6063cf1e0ec171ad7d030595730b0704a17fae8b066e44f67633ea876e8dfda41176672341b4f42aa044e4a2",
      }
    );
    const token = response.data.accessToken;
    console.log("token visualization ",(response.data));
    
    // Envía la respuesta y termina la ejecución
    res.status(200).json({ token });
  } catch (error) {
    // Envía un error en caso de fallo
    res.status(400).json({ message: 'Error obtaining token' });
  }
};

// Controlador para consumir la API de proyectos
export const consumeAPIProjects = async (req: Request, res: Response): Promise<void> => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Access denied' });
    return;
  }

  try {
    const response = await axios.get('https://analyticsdev.app.marval.com.co/api/jwtjde/getAllProyectos', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: 'Error consuming API' });
  }
};