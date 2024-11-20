const express = require("express");
const emailHelper = require("./helpers/emailHelper");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

const CLIENT_FRONT = process.env.CLIENT;

app.use(express.json());
app.use(cors({
  origin: CLIENT_FRONT,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Métodos HTTP permitidos
  credentials: true, // Para permitir cookies o headers personalizados
}));

app.get("/api/ping",function(req, res){
  res.status(200).json({message:"pong"})
});

app.post("/api/sendEmail", async (req, res) => {
  const { name, email, text } = req.body;
  if (!name || !email || !text) {
    res.status(400).json({message:'Faltan campos adisionales'});
  }
  try {
    let info = await emailHelper(name, email, text);
    res.status(200).send(`Email sent: ${info.response}`);
  } catch (error) {
    res.status(500).send("Error sending email");
  }
});

app.listen(PORT, () => {
  console.log(`Server app listening on port ${PORT}`);
});
