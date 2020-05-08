const app = require("./server"); //importo app desde server.js
require("./database");

app.listen(app.get("PORT"), () => {
  console.log("Server on PORT", app.get("PORT"));
});
