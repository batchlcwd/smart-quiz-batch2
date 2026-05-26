import dotenv from "dotenv";
dotenv.config();

import express from "express";

const app = express();

import "./utils/db.js";

//middleware- helps to parse json
const jsonMiddleware = express.json();
app.use(jsonMiddleware);

app.get("/", (req, resp) => {
  resp.json({
    message: "Hello World",
    users: [
      {
        id: 1,
        name: "Durgesh",
      },
      {
        id: 2,
        name: "Shubham",
      },
    ],
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
