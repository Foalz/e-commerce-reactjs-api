const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  title: { type: String, required: true, },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true, },
  date: { type: Date, default: Date.now },
  rating: { rate: { type: Number, }, count: { type: Number }, default: {
    rate: 0,
    count: 0,
  }},
  price: { type: Number, required: true, },
  category: { type: [String], default: [], },
  stock: { type: Number, required: true, },
  brand: { type: String, },
});

module.exports = mongoose.model('Product', ProductSchema);
