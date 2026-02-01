import express from "express";
import { ENV } from "./utils/env.js";
import cors from "cors";
import { connectDB } from "./utils/db.js";
import menuRoutes from "./routes/menu.routes.js";
import orderRoutes from "./routes/order.routes.js";

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.json({ msg: "app is up and running" });
});

const startServer = async () => {
  await connectDB();

  app.listen(ENV.PORT, () => {
    console.log("app is listening on port", ENV.PORT);
  });
};

startServer();

// zqEX1YS7pLbMwiCn
// sakshibattala6_db_user
