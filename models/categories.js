const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
  category_id: { type: String, required: true, unique: true, index: true},
  title: { type: String, required: true, },
  color: { type: String, },
});

module.exports = mongoose.model('Category', CategorySchema);
