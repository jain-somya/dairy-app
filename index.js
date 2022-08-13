import * as dotenv from "dotenv";
dotenv.config();
import express from "express";

import routes from "./src/routes/routes.js";
const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/", routes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
