const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
var dburi = "mongodb://localhost/reactreadinglist";

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI)
    .catch(function (err){
        console.log(err)
    });
} else {
    mongoose.connect(dburi);
};

// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist",
//   {
//     useMongoClient: true
//   }
// );

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
