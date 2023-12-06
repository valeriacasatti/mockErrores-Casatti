import { ProductsService } from "../services/products.service.js";
import { generateProduct } from "../helpers/mock.js";

export class ProductsController {
  //get products
  static getProducts = async (req, res) => {
    try {
      const products = await ProductsService.getProducts();
      res.json({ status: "success", data: products });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  };

  //add product
  static addProduct = async (req, res) => {
    try {
      const productInfo = req.body;
      const product = await ProductsService.addProduct(productInfo);

      if (product) {
        res.json({
          status: "success",
          message: `${productInfo.title} added successfully`,
        });
      } else {
        res.json({ status: "error", message: "error adding product..." });
      }
    } catch (error) {
      console.log(error.message);
      res.json({ status: "error", message: error.message });
    }
  };

  //get product by id
  static getProductById = async (req, res) => {
    try {
      const pid = req.params.pid;
      const product = await ProductsService.getProductById(pid);
      if (product) {
        res.json({
          status: "success",
          data: product,
        });
      } else {
        res.json({ status: "error", message: "error getting product..." });
      }
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  };

  //update product
  static updateProduct = async (req, res) => {
    try {
      const pid = req.params.pid;
      const updatedContent = req.body;
      const product = await ProductsService.updateProductStock(
        pid,
        updatedContent
      );
      if (product) {
        res.json({
          status: "success",
          message: "product updated successfully",
          data: product,
        });
      } else {
        res.json({ status: "error", message: "error updating product..." });
      }
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  };

  //delete product
  static deleteProduct = async (req, res) => {
    try {
      const pid = req.params.pid;
      const product = await ProductsService.deleteProduct(pid);
      if (product) {
        res.json({
          status: "success",
          message: "product deleted successfully",
        });
      } else {
        res.json({ status: "error", message: "error deleting product..." });
      }
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  };

  //GET MOCKING PRODUCTS
  static getMockingProducts = async (req, res) => {
    try {
      let products = [];
      for (let i = 0; i < 100; i++) {
        const newProducts = generateProduct();
        products.push(newProducts);
      }
      res.json({ status: "succes", data: products });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  };
}
