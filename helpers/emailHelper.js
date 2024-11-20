const nodemailer = require("nodemailer");
const emailHelper = async (name, email, text) => {
  const USER = process.env.KEY_USER_EMAIL;
  const PASS = process.env.KEY_PASS_APP_EMAIL;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: USER,
      pass: PASS,
    },
  });
  let mailOptions = {
    from: USER,
    to: email,
    subject: "Nuevo mensaje del sitio web",
    text: text,
    html: `<!doctype html>
<html ⚡4email>
  <head>
    <meta charset="utf-8">
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f5f5f5;
        margin: 0;
        padding: 0;
      }
      .email-container {
        background-color: #ffffff;
        max-width: 600px;
        margin: 20px auto;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        border: 1px solid #e5e5e5;
      }
      .header {
        background-color: #007bff;
        color: #ffffff;
        text-align: center;
        padding: 20px;
        font-size: 1.5rem;
        font-weight: bold;
      }
      .content {
        padding: 20px;
        color: #333333;
      }
      .content p {
        margin: 10px 0;
        font-size: 1rem;
      }
      .footer {
        background-color: #f1f1f1;
        text-align: center;
        padding: 10px;
        font-size: 0.875rem;
        color: #666666;
      }
      .label {
        font-weight: bold;
        color: #555555;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">Nuevo Mensaje de Contacto</div>
      <div class="content">
        <p><span class="label">Nombre:</span> ${name}</p>
        <p><span class="label">Correo Electrónico:</span> ${email}</p>
        <p><span class="label">Mensaje:</span></p>
        <p>${text}</p>
      </div>
      <div class="footer">
        Gracias por contactarnos. Nos pondremos en contacto contigo pronto.
      </div>
    </div>
  </body>
</html>`,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
module.exports = emailHelper;
