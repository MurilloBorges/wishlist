import { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import FavoriteProductController from '../controllers/FavoriteProductController';
import ProductController from '../controllers/ProductController';

const Product = Router();

// Products
Product.get('/', authMiddleware, ProductController.index);
Product.get('/:id', authMiddleware, ProductController.show);

// Favorites Products
Product.post('/:id/favorites', authMiddleware, FavoriteProductController.store);
Product.get('/favorites', authMiddleware, FavoriteProductController.index);
Product.get('/favorites/:id', authMiddleware, FavoriteProductController.show);
Product.get('/:id/favorites', authMiddleware, FavoriteProductController.showByProduct);
Product.delete('/favorites/:id', authMiddleware, FavoriteProductController.delete);

export default Product;
