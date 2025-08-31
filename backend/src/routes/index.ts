import { Router } from 'express';
import categoryRouter from './categoy.routes';
import sectionRouter from './section.routes';
import kitchenRouter from './kitchen.routes';
import productRouter from './product.routes';
import deviceRouter from './device.routes';

const router = Router();

router.use(categoryRouter);
router.use(sectionRouter);
router.use(kitchenRouter);
router.use(productRouter);
router.use(deviceRouter);

export default router;
