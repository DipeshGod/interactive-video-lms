import nodemailer from "nodemailer";

const sender = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "sg.emailsender@gmail.com", //`${process.env.NODEMAILER_USER}`,
    pass: "testEmail", //`${process.env.NODEMAILER_PASS}`
  },
});


export const ForgotPassword = async (data: any) => {
  await sender.sendMail({
    from: "Learning Management System",
    to: data.email,
    subject: "Forgot Password✔",
    text: "Forgot Password✔",
    html: `<p><strong>Hi</strong></p>
  <p>We noticed you are having forgot your password,use the code below to reset your password</p>
  <p><strong>${data.code}</strong></p>`,
  })
};

export const verifyUserMail = async (data: any) => {
  await sender.sendMail({
    from: "Learning Management System",
    to: data.email,
    subject: "Verify Emal✔",
    text: "Verify Emal✔",
    html: `<p><strong>Hi</strong></p>
    <p>Please use the link below to verify your email address</p>
    <p><a href="${process.env.CLIENT_ADDRESS}/verify?id=${data.id}" target="_blank">Verify your Email Address</p>`,
  });
};

