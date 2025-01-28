import nodemailer from 'nodemailer';

export class mailService {
    static transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });

    static async sendEmail(to, link) {
        await this.transporter.sendMail({
            from: process.env.MAIL_USER,
            to,
            subject: 'Account activation for the Streaming Platform',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">For account activation please click on the button:</h2>
                    <a href="${link}" style="text-decoration: none;">
                        <button style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; cursor: pointer; border-radius: 5px;">
                            Confirm Email
                        </button>
                    </a>
                </div>
            `
        });
    }
}


