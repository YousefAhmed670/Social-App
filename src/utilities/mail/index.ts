import nodemailer from "nodemailer";
import devConfig from "../../env/dev.config";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
export async function sendMail(mailOptions: MailOptions) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: devConfig.NODMAILER_USER,
      pass: devConfig.NODMAILER_PASSWORD,
    },
  });
  mailOptions.from = `social-app <${devConfig.NODMAILER_USER}>`;
  await transporter.sendMail(mailOptions);
}