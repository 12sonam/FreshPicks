const express = require('express');
const router = express.Router();
const deleteCategoryController = require('../deleteControllers/deleteCategory'); 

router.delete('/deletecategory/:id', deleteCategoryController); 

module.exports = router;
