const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let CategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

// Virtual for category's URL
CategorySchema.virtual("url").get(function () {
  return "/catalog/category/" + this._id;
});

module.exports = mongoose.model("Category", CategorySchema);
