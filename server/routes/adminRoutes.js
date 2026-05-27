import express from 'express';
import { 
  getDashboardStats, 
  getAllUsers, 
  getAllShops, 
  getAllOrders,
  createProduct,
  updateOrderStatus,
  createShop,
  updateShopStatus,
  deleteProduct,
  updateProduct,
  getShopByOwner,
  deleteUser,
  suspendUser
} from '../controllers/adminController.js';
// import { protect, admin } from '../middleware/authMiddleware.js'; // Assuming these exist or will be needed

const router = express.Router();

// For now, these are public for testing, but should be protected in production
router.get('/stats', getDashboardStats);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/suspend', suspendUser);
router.get('/shops', getAllShops);
router.get('/shops/owner/:ownerId', getShopByOwner);
router.get('/orders', getAllOrders);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
router.put('/orders/:id', updateOrderStatus);
router.post('/shops', createShop);
router.put('/shops/:id', updateShopStatus);



export default router;
