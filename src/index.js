const app = require("./server"); //importo app desde server.js

app.listen(app.get("port"), () => {
  console.log("Server on PORT", app.get("port"));
});
