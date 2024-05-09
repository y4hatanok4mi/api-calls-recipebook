const express = require('express');
const AuthorModel = require('../models/author');

const router = express.Router();

// GET all recipe
router.get('/', async (req, res) => {
    try {
        const authors = await AuthorModel.find();
        return res.json(authors);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// GET a recipe
router.get('/:name', async (req, res) => {
    try {
        const author = await AuthorModel.findById(req.params.id);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        return res.json(author);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Create an author
router.post('/', async (req, res) => {
    try {
        const { name, ingredients, steps } = req.body;
        if (!name || !ingredients || !steps) {
            return res.status(400).json({ message: 'Name, ingredients and steps are required' });
        }
        const existingAuthor = await AuthorModel.findOne({ name });
        if (existingAuthor) {
            return res.status(400).json({ message: 'Author already exists' });
        }
        const newAuthor = await AuthorModel.create({ name, ingredients, steps });
        return res.status(201).json({ message: 'Author created successfully', author: newAuthor });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

// UPDATE an author
router.patch('/:name', async (req, res) => {
    try {
        const { name } = req.body;
        const author = await AuthorModel.findByIdAndUpdate(req.params.id, { name }, { new: true });
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        return res.json(author);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

// DELETE an author
router.delete('/:name', async (req, res) => {
    try {
        const author = await AuthorModel.findByIdAndDelete(req.params.id);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        return res.json({ message: 'Author deleted' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

module.exports = router;
