import nodemailer from "nodemailer";
import { IUserDoc } from "../interfaces/models/User";
import { ResetPassword } from "./../models/Code";
import crypto from "crypto";

const sender = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "sg.emailsender@gmail.com", //`${process.env.NODEMAILER_USER}`,
    pass: "testEmail", //`${process.env.NODEMAILER_PASS}`
  },
});

const prepareMail = (details: any) => {
  return {
    from: "Learning Management System",
    to: details.email,
    subject: "Forgot Password✔",
    text: "Forgot Password✔",
    html: `<p><strong>Hi</strong></p>
    <p>We noticed you are having forgot your password,use the code below to reset your password</p>
    <p><strong>${details.code}</strong></p>`,
  };
};

export const ForgotPassword = async (user: IUserDoc) => {
  console.log(user);
  // console.log(`${process.env.NODEMAILER_SERVICE} hgsdhgd ${process.env.NODEMAILER_USER} sdasdgfas ${process.env.NODEMAILER_PASS}`)
  console.log("crypto:", crypto.randomBytes(3).toString("hex"));
  const resetPassword = new ResetPassword();
  resetPassword.email = user.email;
  resetPassword.code = crypto.randomBytes(3).toString("hex");
  try {
    const doc = await resetPassword.save();
    if (doc) {
      let mailBody = prepareMail({
        email: doc.email,
        code: doc.code,
      });
      await sender.sendMail(mailBody);
    }
  } catch (err) {
    console.log("errrr", err);
    return "Error sending mail";
  }
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
