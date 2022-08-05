const app = require("./app");
const mongoose = require("mongoose");

// create the connection to DB
mongoose
  .connect(process.env.DB_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // use MongoDB sriver's new connection management engine
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

const port = 4500 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server is up and running on http://127.0.0.1:${port}`);
});
