const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const DBService = require("./src/utils/DBService/DBService.js");

const graduateRouter = require("./src/routes/graduates/graduates.routes.js");
const industryPartnerRouter = require("./src/routes/industryPartner/industryPartner.routes.js");
const authRouter = require("./src/routes/auth/auth.routes.js");


const { NODE_ENV } = process.env;

require("dotenv").config({ path: `.env.${NODE_ENV}.local` });


const { HOST, PORT, DB_URI } = process.env;

const app = express();

if (NODE_ENV === "development") app.use(morgan("dev"));

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((_, res, next) => {
  res.header(
    `Access-Control-Allow-Headers`,
    `x-access-token, Origin, Content-Type, Accept`
  );
  next();
});

app.use("/graduates", graduateRouter);
app.use("/industryPartner", industryPartnerRouter);
app.use("/auth", authRouter);

const server = app.listen(PORT, HOST, () => {
  const SERVER_ADDRESS = server.address().address;
  const SERVER_PORT = server.address().port;
  console.log(`Server listening at http://${SERVER_ADDRESS}:${SERVER_PORT}`);
});


if (!DBService.isTestEnv()) {
  (async () => {
    await DBService.connect(DB_URI);
  })();
}

module.exports = server;
