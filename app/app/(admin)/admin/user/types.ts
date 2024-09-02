import * as z from "zod";
import { createUserSchema } from "./schemas";
export type TGetUser = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string[];
};

export type TUserScreenProps = {
  data: TGetUser[];
};

export type TCreateUserForm = z.infer<typeof createUserSchema>;
