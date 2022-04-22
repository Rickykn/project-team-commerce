const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const PORT = process.env.PORT;

const { sequelize } = require("./lib/sequelize");

sequelize.sync({ alter: true });

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>E-Commerce</h1>");
});

const { authRoutes } = require("./routes")

app.use("/auth", authRoutes)

app.listen(PORT, () => {
  console.log("Listening in port", PORT);
});
