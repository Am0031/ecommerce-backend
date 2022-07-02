const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
    const categories = await Category.findAll({
      include: [
        { model: Product, attributes: ["product_name", "price", "stock"] },
      ],
    });
    if (!categories) {
      return res.status(500).json({ message: "Categories not found" });
    }
    return res.json(categories);
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id, {
      include: [
        { model: Product, attributes: ["product_name", "price", "stock"] },
      ],
    });
    if (!category) {
      return res.status(500).json({ message: "Categories not found" });
    }
    return res.json(category);
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const { category_name } = req.body;
    if (!category_name) {
      return res.status(500).json({ message: "Unable to create category" });
    }
    const category = await Category.create(req.body);
    return res
      .status(200)
      .json({ message: "Category created", newCategory: category });
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
