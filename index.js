const express = require("express");
const path = require('path');
const cors = require('cors');

//Initializations
const app = express();
const database = require('./database');
const Product = require('./models/products');
const csv = require('csvtojson');
require('dotenv').config();

(async () => {
  try {
    const products_list = await Product.find({});
    if (products_list.length === 0){
      const readcsv = await csv()
      .fromFile('./helpers/products.csv')
      .then((json) => {
        return json;
      });
      await Promise.all(readcsv.map(async (product) => {
          let imgPath = product.imageUrl;
          product.imageUrl = process.env.API_URL + process.env.PORT + '/assets/images' + imgPath;
          const newProduct = new Product(product);
          await newProduct.save();
        }));
    }
  } catch (error) {
    console.log(error);
  }
})();

//Settings
app.set('AppName', 'E-commerce project API');
app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.use(require('./routes/api/products'), (req, res, next) => {
  console.log('Time:', Date.now());
  next();
});
app.use(require('./routes/api/categories'), (req, res, next) => {
  console.log('Time:', Date.now());
  next();
});
app.use(require('./routes/api/users'), (req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
  console.log(app.get('AppName'));
  console.log('Server running on port', app.get('port'));
  console.log(app.get('host'));
});


