// const Product = require('../models/productModel'); // Import the Product model

// // Controller function to fetch all products
// const getProduct = async (req, res) => {
//     try {
//         const products = await Product.find(); // Fetch all products from the database
//         res.status(200).json(products); // Send products as JSON response
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Server Error' });
//     }
// };

// module.exports = getProduct;
// const express = require('express');
// const router = express.Router();
// const Product = require('../models/productModel'); // Import the Product model

// // Controller function to fetch all products
// const getProduct = async (req, res) => {
//     try {
//         const products = await Product.find(); // Fetch all products from the database
//         res.status(200).json(products); // Send products as JSON response
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Server Error' });
//     }
// };

// router.get('/getproducts', getProduct); // Configure route to fetch products

// module.exports = router;



const Products_name = require("../models/productModel");

const getProduct = async (req, res) => {
    try {
        const Products = await Products_name.find();
        res.status(200).json(Products);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
}

module.exports = getProduct;

