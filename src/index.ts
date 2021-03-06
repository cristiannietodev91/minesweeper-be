import express from "express";
import cors from "cors";
import path from "path";

import * as indexRouter from "./routes/index";
import * as playersRouter from "./routes/playersRoute";
import * as gameRouter from "./routes/gameRoute";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//Secure
app.disable("x-powered-by");

indexRouter.register(app);
playersRouter.register(app);
gameRouter.register(app);

app.listen(process.env.PORT || 3000, () => {
  console.log("The application is running!");
});

