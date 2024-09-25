import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export function createNodeMailerClient() {
    const client = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD
        }
    } as SMTPTransport.Options) 
    return client
}