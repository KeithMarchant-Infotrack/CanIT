import * as nodemailer from 'nodemailer';

const config = require('../../config.json');

export interface IMailerOptions {
    text: string;
    to: string;
    subject: string;
}

export class Mailer {
    public static async send(options: IMailerOptions) {
        const mailOptions = {
            from: config.mail.username,
            to: options.to,
            subject: options.subject,
            text: options.text
        };

        await Mailer.getTransporter().sendMail(mailOptions);
    }

    private static getTransporter(): nodemailer.Transporter {
        return nodemailer.createTransport({
            service: config.mail.service,
            auth: {
                user: config.mail.username,
                pass: config.mail.password
            }
        });
    }
}
