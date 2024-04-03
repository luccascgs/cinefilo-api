require("dotenv").config();
const { app } = require("./app");

app.listen(3333, () => console.log("Server iniciado na porta 3333!🚀"));
