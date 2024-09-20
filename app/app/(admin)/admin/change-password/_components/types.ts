import * as z from 'zod';
import { changePasswordSchema } from './schemas';
export type TMyProfile = {
  _id: string;
  honorific: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string[];
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TMyProfileProps = {
  data: TMyProfile;
};

export type TChangePasswordForm = z.infer<typeof changePasswordSchema>;