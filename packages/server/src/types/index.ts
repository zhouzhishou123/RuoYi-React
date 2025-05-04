import { Request } from 'express';
import { SysRole } from '../entities/SysRole';

export interface UserPayload {
  username: string;
  id: string | number;
  roles: SysRole[];
}

export interface AuthenticatedRequest extends Request {
  user: UserPayload;
}
