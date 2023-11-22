import nodemailer from 'nodemailer'
const EMAIL = process.env.NODEMAILER_USER
const PASSWORD = process.env.NODEMAILER_PASS

const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
  connectionTimeout: 10000,
})

export const EmailSender = async (
  email: string,
  subject: string,
  heading: string,
  text: string,
  spanText: string,
  url: string
) => {
  await transport.sendMail({
    from: EMAIL,
    to: email,
    subject: subject,
    html: `
    <h3>${heading}</h3>
    <p style="margin-bottom:30px">${text}</p>
    <a href=${url}
      ><span
        style="
          background-color: #5624d0;
          color: white;
          padding: 10px 20px 10px 20px;
        "
        >${spanText}</span
      ></a
    >
    <p style="margin-top:30px">If button does not work, then click below url to reset your password</p>
    <a href=${url} style="color: #5624d0; text-decoration: none"
      >${url}</a
    >
        `,
  })
}
