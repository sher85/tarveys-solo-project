const mongoose = require('mongoose')

//https://api.nal.usda.gov/fdc/v1/foods/search?query=apple&pageSize=2&api_key=yMPI2Jye3h1spUbejNCPNG7duqUwEv6Ls0cC7ZPl

// Creating the schema to be followed by our database (i.e. columns)
const FoodDetailsSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true,
  },
  daysSinceIAte: {
    type: Number,
    required: true,
  },
});

const FoodDetails = mongoose.model("Foods", FoodDetailsSchema);
module.exports = FoodDetails;