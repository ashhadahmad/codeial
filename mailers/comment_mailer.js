const nodeMailer = require("../config/nodemailer");

module.exports.newComment = (comment) => {
  console.log("Inside new comment mailer");

  nodeMailer.transporter.sendMail(
    {
      from: "ashhad@ashhad.in",
      to: comment.user.email,
      subject: "New comment published",
      html: "<h1>Your comment is now published</h1>",
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending email", err);
        return;
      }
      console.log("Message Sent", info);
      return;
    }
  );
};
