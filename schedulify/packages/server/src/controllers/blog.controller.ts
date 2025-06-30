
import { Request, Response } from 'express';
import Article from '../../models/article.model';

// --- Admin Controllers ---
export const createArticle = async (req: any, res: Response) => {
  try {
    const newArticle = new Article({ ...req.body, author: req.user._id });
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getArticles = async (req: Request, res: Response) => {
  try {
    const articles = await Article.find().populate('author', 'name');
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getArticleById = async (req: Request, res: Response) => {
  try {
    const article = await Article.findById(req.params.id).populate('author', 'name');
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const updateArticle = async (req: Request, res: Response) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// --- Public Controllers ---
export const getPublishedArticles = async (req: Request, res: Response) => {
  try {
    const articles = await Article.find({ status: 'published' }).populate('author', 'name').sort({ createdAt: -1 });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getArticleBySlug = async (req: Request, res: Response) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug, status: 'published' }).populate('author', 'name');
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
