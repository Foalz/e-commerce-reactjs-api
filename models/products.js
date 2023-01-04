const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  title: { type: String, required: true, },
  description: { type: String, },
  imageUrl: { type: String, required: true, },
  sku: { type: String, required: true, index: true, unique: true, },
  date: { type: Date, default: Date.now },
  rating: { 
    rate: { type: Number, default: 0, },
    count: { type: Number, default: 0, },
  },
  price: { type: Number, required: true, },
  category: [{ type: String, }],
  stock: { type: Number, default: 0, },
  brand: { type: String, },
});

module.exports = mongoose.model('Product', ProductSchema);
