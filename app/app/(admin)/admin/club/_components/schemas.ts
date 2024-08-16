import * as z from 'zod';

export const createClubSchema = z.object({
  firstName: z.string().min(1, { message: 'กรุณากรอกชื่อ' }),
  lastName: z.string().min(1, { message: 'กรุณากรอกนามสกุล' }),
  faculty: z.string().min(1, { message: 'กรุณากรอกคณะ' }),
  major: z.string().min(1, { message: 'กรุณากรอกสาขา' }),
  year: z.string().min(1, { message: 'กรุณาเลือกปีการศึกษา' }),
  clubPosition: z.string().min(1, { message: 'กรุณากรอกตำแหน่งในสโมสรนิสิต' }),
});

export type TCreateStdClubForm = z.input<typeof createClubSchema>;