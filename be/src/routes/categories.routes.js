const router = require('express').Router();
const CategoriesController = require('../controllers/categories.controller');

router.get('/:id', CategoriesController.findCategory);
router.get('/', CategoriesController.findCategories);
router.post('/', CategoriesController.createCategory);
router.put('/:id', CategoriesController.updateCategory);
router.delete('/:id', CategoriesController.deleteCategory);

module.exports = router;
