const mongoose = require("mongoose");
const URL = 'mongodb://localhost:27017/e_commerce_api';

mongoose.set('strictQuery', true);
mongoose.connect(URL, {
  useNewUrlParser: true,
})
  .then((db) => {
    console.log('MongoDB is connected via Mongoose'); 
  }).catch((err) => {
    console.log(err); 
  });
