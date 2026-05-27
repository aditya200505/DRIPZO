import express from 'express';
import { 
  createOrder, 
  getOrdersByUser, 
  getOrdersByShop, 
  updateVendorOrderStatus 
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/user/:userId', getOrdersByUser);
router.get('/shop/:shopId', getOrdersByShop);
router.put('/:id/status', updateVendorOrderStatus);

export default router;
