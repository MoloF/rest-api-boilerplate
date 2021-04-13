import express from 'express';

const router = express.Router();

router.get('/hello-world', async (req, res) => {
	return res.render('index');
});

export default router;
