const express = require("express");
let router = express.Router();

// require controller modules.
let category_controller = require("../controllers/categoryController");
let item_controller = require("../controllers/itemController");

// === ITEM ROUTES ===

// GET home page.
router.get("/", item_controller.index);

// GET req for list of all Categories.
router.get("/items", item_controller.item_list);
// GET req for one Item.
router.get("/item/:id", item_controller.item_detail);
/*
// GET req for creating a Item.
router.get("/item/create", item_controller.item_create_get);
// POST req for creating a Item.
router.post("/item/create", item_controller.item_create_post);
// GET req for deleting a Item.
router.get("/item/:id/delete", item_controller.item_delete_get);
// POST req for deleting a Item.
router.post("/item/:id/delete", item_controller.item_delete_post);
// GET req for updating a Item.
router.get("/item/:id/update", item_controller.item_update_get);
// POST req for updating a Item.
router.post("/item/:id/update", item_controller.item_update_post);
*/

// === CATEGORY ROUTES ===

// GET req for list of all Categories.
router.get("/categories", category_controller.category_list);
// GET req for one Category.
router.get("/category/:id", category_controller.category_detail);
/*
// GET req for creating a Category.
router.get("/category/create", category_controller.category_create_get);
// POST req for creating a Category.
router.post("/category/create", category_controller.category_create_post);
// GET req for deleting a Category.
router.get("/category/:id/delete", category_controller.category_delete_get);
// POST req for deleting a Category.
router.post("/category/:id/delete", category_controller.category_delete_post);
// GET req for updating a Category.
router.get("/category/:id/update", category_controller.category_update_get);
// POST req for updating a Category.
router.post("/category/:id/update", category_controller.category_update_post);
*/

module.exports = router;
