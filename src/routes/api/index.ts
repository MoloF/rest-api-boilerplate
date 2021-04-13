import express from 'express';

import helloWorldRoutes from './hello_world';

const router = express.Router();

router.use(helloWorldRoutes);

export default router;
