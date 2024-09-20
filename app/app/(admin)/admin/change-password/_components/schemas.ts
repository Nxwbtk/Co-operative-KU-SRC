import * as z from 'zod'

export const changePasswordSchema = z.object({
    oldPassword: z.string().min(6, 'รหัสผ่านเก่าต้องมีอย่างน้อย 6 ตัวอักษร'),
    newPassword: z.string().min(6, 'รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร'),
    confirmPassword: z.string().min(6, 'รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร')
})