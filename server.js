const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose")

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 8000;
const db = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);


// Database connection
  mongoose.connect(db).then(()=>console.log('Connection successful!'))


// app listen on server
const server = app.listen(port, () => {
  console.log(`Server is runnig on http://localhost:${port}`);
});


process.on('unhandledRejection',err=>{
  console.log(err.name, err.message)
  server.close(()=>{
    process.exit(1 )
  })
})