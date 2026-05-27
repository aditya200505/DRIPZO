import express from 'express';
import { 
  getAllProducts, 
  getProductById, 
  getProductsByShop, 
  createVendorProduct, 
  updateVendorProduct, 
  deleteVendorProduct 
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/shop/:shopId', getProductsByShop);
router.post('/vendor', createVendorProduct);
router.put('/vendor/:id', updateVendorProduct);
router.delete('/vendor/:id', deleteVendorProduct);
router.get('/:id', getProductById);

export default router;
