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
    console.error(`ERROR | ${message}`);
    return res.status(500).json(err);
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
    console.error(`ERROR | ${message}`);
    return res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  // create a new category
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
