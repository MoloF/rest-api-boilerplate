import express from 'express';

import apiRoutes from './api';
import helloWorldRoutes from './hello_world';

const router = express.Router();

router.use('/api', apiRoutes);
router.use(helloWorldRoutes);

export default router;
