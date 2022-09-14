const mongoose = require('mongoose')

// Creating the schema to be followed by our database (i.e. columns)
const FoodSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true,
  },
  daysSinceIAte: {
    type: Number,
    required: true,
  },
});``

const Food = mongoose.model("Food", FoodSchema);
module.exports = Food;