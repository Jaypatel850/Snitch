require("dotenv").config();
const app = require("./app/app");
const PORT = process.env.PORT || 3000;
const connectDB = require("./db/DB");

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
