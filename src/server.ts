import "reflect-metadata";
import './shared/container'
require("dotenv").config();
import express from "express";
import cors from "cors";
import AssociationConfig from "./db/association";
const associationConfig = new AssociationConfig();
import sequelize from "./db/config";
import routes from "./shared/http/router";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(routes);

const port = process.env.PORT;

associationConfig.execute(() => {
  sequelize
    .sync({ force: false })
    .then(() => {
      app.listen(port, () => {
        console.log("🚀API RUNNING🚀");
      });
    })
    .catch((err) => {
      if (err) {
        console.log("Wops! Something went wrong: " + err);
      }
    });
});
