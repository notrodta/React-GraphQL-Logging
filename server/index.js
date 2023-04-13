const express = require("express");
const app = express();
const PORT = 6969;
const { graphqlHTTP } = require("express-graphql");
const schema = require("./Schemas/index");
const cors = require("cors");

var JL = require("jsnlog").JL;
var jsnlog_nodejs = require("jsnlog-nodejs").jsnlog_nodejs;

app.use(cors());
app.use(express.json());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

JL().info("info message!!!!!!!!!Asd!");
// jsnlog.js on the client by default sends log messages to jsnlog.logger, using POST.
// app.post('*.logger', function (req, res) {
app.post("/logger", (req, res) => {
  // Process incoming log messages, by handing to the server side jsnlog.
  // JL is the object that you got at
  // var JL = require('jsnlog').JL;
  jsnlog_nodejs(JL, req.body);

  // Send empty response. This is ok, because client side jsnlog does not use response from server.
  res.send("");
});

app.listen(PORT, () => {
  console.log("Server running");
});
