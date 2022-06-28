console.log(
  "This script populates some test items and categories to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/dummy_inventory?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var Item = require("./models/item");
var Category = require("./models/category");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var categories = [];
var items = [];

function categoryCreate(name, description, cb) {
  categorydetail = {
    name: name,
    description: description,
  };

  var category = new Category(categorydetail);

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Category: " + category);
    categories.push(category);
    cb(null, category);
  });
}

function itemCreate(name, description, category, price, stock, cb) {
  itemdetail = {
    name: name,
    description: description,
    category: category,
    price: price,
    stock: stock,
  };

  var item = new Item(itemdetail);
  item.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Item: " + item);
    items.push(item);
    cb(null, item);
  });
}

function createCategories(cb) {
  async.series(
    [
      function (callback) {
        categoryCreate(
          "Bedroom", 
          "Sheets, Pillows, Matresses", 
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Bathroom",
          "Mirrors, Luffas, Shag Carpet Toilet Accessories",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Other",
          "Useless crap your aunt buys as high school graduation gifts.",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createItems(cb) {
  async.parallel(
    [
      function (callback) {
        itemCreate(
          "Mattress",
          "A sack of springs and foam.",
          categories[0],
          49999,
          20,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Pillow",
          "A sack of feathers.",
          categories[0],
          499,
          300,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Sheets",
          "That T-shirt material, but big and flat.",
          categories[0],
          1999,
          100,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Toothbrush Stand",
          "So they don't lay on your dirty sink.",
          categories[1],
          700,
          48,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Shag Carpet Toilet Seat (Pink)",
          "Eww. No.",
          categories[1],
          2699,
          15,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Egg-o-Matic",
          "A pan, but it can only make one sunnyside-up egg at a time.",
          categories[2],
          2999,
          20,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Tacky BBQ Apron",
          "IT SAYS 'SUNS OUT BUNS OUT' AND HAS LITTLE BURGERS ALL OVER IT, BUT IT SOUNDS LIKE IT MEANS BUTTS!!! ISN'T THAT SOOOO FUNNY?!? XD",
          categories[2],
          499,
          300,
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createCategories, createItems],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("items: " + items);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
