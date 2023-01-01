const express = require("express");
const path = require('path');
const cors = require('cors');

//Initializations
const app = express();
const database = require('./database');
const Product = require('./models/products');

//Settings
app.set('AppName', 'E-commerce project API');
app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
//app.use(require('./routes/api'));
//
//GET
app.get('/api/products', async (req, res) => {
  try {
    const errors = [];
    const products = await Product.find({}).lean();
    res.status(200).send(products);
    
  } catch (e) {
    res.status(400).send({ msg: 'something went wrong.' }) 
  }
});

//POST
app.post('/api/products/new', async (req, res) => {
  try{
    const obj = JSON.parse(JSON.stringify(req.body));
    const { 
      title,
      description,
      imageUrl,
      price,
      stock,
      category,
      brand,
      rating,
    } = obj;
    const errors = [];

    if(!title){
      errors.push({ title: 'Please provide a title for this product' });
    }
    if(!description){
      errors.push({ description: 'Please provide a description for this product' });
    }
    if(!imageUrl){
      errors.push({ imageUrl: 'Please provide an url image for this product' });
    }
    if(!price){
      errors.push({ price: 'Please provide a price for this product' });
    }
    if(!stock){
      errors.push({ stock: 'Please provide stock amount for this product' });
    }
    if(errors.length > 0){
      res.status(400).send({
        errors,
        msg: 'Please correct all errors and try again.',
      });
    }else{
      const newProduct = new Product({ 
        title,
        description,
        imageUrl,
        price,
        stock,
        category,
        brand,
        rating,
      });
      await newProduct.save();
      res.status(200).send({ msg: 'Product added successfully!' });
    }
  }
  catch(e){
    res.status(400).send({ msg: 'Wrong request.' });
  }
});

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
  console.log(process.env.PORT);
  console.log(app.get('AppName'));
  console.log(path);
  console.log('Server running on port', app.get('port'));
});


