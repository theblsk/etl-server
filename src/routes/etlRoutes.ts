import { Router } from 'express';
import { uploadAndRunETL } from '../controllers/ETLController';
import express from 'express';

const router = Router();

// Use a large body size limit for big JSON uploads
router.post('/', express.json({ limit: '100mb' }), uploadAndRunETL);

export default router; 