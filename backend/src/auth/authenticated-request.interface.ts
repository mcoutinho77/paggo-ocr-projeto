import { Request } from 'express';
import { JwtPayload } from './jwt-payload.interface'; 

export interface AuthenticatedRequest extends Request {
    user: {
      id: number; // Certifique-se de que o tipo é number
      username: string;
      email: string;
    };
  }