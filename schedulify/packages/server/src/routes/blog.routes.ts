
import { Router } from 'express';
import { 
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  getPublishedArticles,
  getArticleBySlug
} from '../controllers/blog.controller';
import { auth, admin } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/', getPublishedArticles);
router.get('/:slug', getArticleBySlug);

// Admin routes
router.post('/admin', auth, admin, createArticle);
router.get('/admin', auth, admin, getArticles);
router.get('/admin/:id', auth, admin, getArticleById);
router.put('/admin/:id', auth, admin, updateArticle);
router.delete('/admin/:id', auth, admin, deleteArticle);

export default router;
