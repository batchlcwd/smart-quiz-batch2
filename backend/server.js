import dotenv from "dotenv";
dotenv.config();

import express from "express";

const app = express();

import "./utils/db.js";

import authRouter from "./routes/auth.route.js";
import categoryRouter from "./routes/category.route.js";

//middleware- helps to parse json
const jsonMiddleware = express.json();
app.use(jsonMiddleware);

//attach routes

app.use("/api/v1/auth", authRouter);
app.use("/api/v1", categoryRouter);

// app.get("/", (req, resp) => {
//   resp.json({
//     message: "Hello World",
//     users: [
//       {
//         id: 1,
//         name: "Durgesh",
//       },
//       {
//         id: 2,
//         name: "Shubham",
//       },
//     ],
//   });
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
