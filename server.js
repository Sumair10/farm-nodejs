const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path : './config.env'})

const app = require('./app');

mongoose.connect(process.env.MONGODB_URI , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(con =>{
  console.log("Connected to MongoDB")
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Example app listening on port 3000!');
});