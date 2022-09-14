const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const app = express();

const FoodModel = require("./models/Food");
const FoodDetails = require("./models/FoodDetails");

// Set up middlewares
// Receiving info from front end in json format
app.use(express.json());
app.use(cors());

mongoose.connect(
  'mongodb+srv://mauricio1234:mauricio1234@crud.hdbvhmr.mongodb.net/food?retryWrites=true&w=majority', 
  {
    useNewUrlParser: true,
  }
);


// Create a new route for posting - for inserting into the database
app.post('/insert', async (req, res) => {

  // Store data sent from front end into these variables (from input boxes)
  const foodName = req.body.foodName;
  const days = req.body.days;

  // Store data in a variable to send to the database
  const food = new FoodModel({foodName: foodName, daysSinceIAte: days});

  try {
    // if no errors
    await food.save();
    res.send("inserted data")
    // Catch errors
  } catch(err) {
    console.log(err);
  }
});

// Create another route to GET and display information
app.get('/read', async (req, res) => {
  // Call mongoose syntax to read data from our database
  // FoodModel.find({ $where: {foodName: "Apple"}}) ->this would read everything in the database called "apple"
  FoodModel.find({}, (err, result) => { // {} gets everything
    // Check if there was an error
    if (err) {
      res.send(err)
    }
    // else send result. Note: res.send(err) above closes everything that is why you dont need an else statement here
    res.send(result)
  })
}
);

// TEST: Second Get request - Test
app.get('/test', (req, res) => {
  // Declare food for query
  let foodQuery = 'apple'
  // Request data from USDA website for a particular food
  fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodQuery}&pageSize=2&api_key=yMPI2Jye3h1spUbejNCPNG7duqUwEv6Ls0cC7ZPl`)
    .then(res => res.json())
    .then(data => res.send(data))
    .catch(error => console.log("Error in get request"))

}
);

// Update / Put request
app.put('/update', async (req, res) => {

  // Store data sent from front end into these variables (from input boxes)
  const newFoodName = req.body.newFoodName;
  const id = req.body.id;

  try {
    // if no errors
    await FoodModel.findById(id, (err, updatedFood) => {
      updatedFood.foodName = newFoodName
      updatedFood.save()
      res.send("update")
    })
    // Catch errors
  } catch(err) {
    console.log(err);
  }
});

// Delete functionality
app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;

  await FoodModel.findByIdAndRemove(id).exec();
  res.send('deleted')
})

// Backend will be in port 3001
app.listen(3001, () => {
  console.log('Server running on port 3001...')
});