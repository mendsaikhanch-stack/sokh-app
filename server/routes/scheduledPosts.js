import { Router } from 'express';
import ScheduledPost from '../models/ScheduledPost.js';
import { auth } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

const router = Router();

// GET /api/scheduled-posts
router.get('/', auth, admin, async (req, res) => {
  try {
    const posts = await ScheduledPost.find().populate('product').sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/scheduled-posts
router.post('/', auth, admin, async (req, res) => {
  try {
    const post = await ScheduledPost.create(req.body);
    const populated = await post.populate('product');
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/scheduled-posts/:id
router.put('/:id', auth, admin, async (req, res) => {
  try {
    const post = await ScheduledPost.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('product');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/scheduled-posts/:id
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const post = await ScheduledPost.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
