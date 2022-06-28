let Category = require("../models/category");
let Item = require("../models/item");

let async = require("async");
// const category = require("../models/category");

// Home page
exports.index = function(req, res) {
  async.parallel(
    {
      category_count: function(callback) {
        // Pass an empty obj as a match condition to get all documents in a collection.
        Category.countDocuments({}, callback);
      },
      item_count: function(callback) {
        Item.countDocuments({}, callback);
      },
    },
    function (err, results) {
      res.render("index", {
        title: "Inventory Home",
        error: err,
        data: results,
      });
    }
  );
};

// List all items
exports.item_list = function (req, res, next) {
  Item.find({}, "name category price")
    .sort({ name: 1 })
    .populate("category")
    .exec(function (err, list_items) {
      if (err) {return next(err);}
      // Successful, so render
      res.render("item_list", { title: "Item List", item_list: list_items});
    })
};

// Display Item details
exports.item_detail = function (req, res, next) {
  Item.findById(req.params.id)
    .populate("category")
    .exec(function (err, item) {
      if (err) {return next(err)}
      // No results
      if (item === null) {
        let err = new Error("Item not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("item_detail", {
        title: "Item: " + item.name,
        item: item,
      });
    });
};