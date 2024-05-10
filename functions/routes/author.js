const express = require ('express');
const AuthorModel = require('../models/author');

const router = express.Router();


// GET all authors
router.get('/', async (req, res) => {
    try {
        const authors = await AuthorModel.find();
        return res.json(authors);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// GET a single recipe
router.get('/:id', async (req, res) => {
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


// Get recipes by cuisine
router.get('/:cuisine', async (req, res) => {
    try {
        const { cuisine } = req.params;
        const recipes = await recipe.find({ cuisine });
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a Recipe

router.post('/', async (req, res) => {
    try {
        const { name, ingredients, steps } = req.body;
        if (!name || !ingredients || !steps) {
            return res.status(400).json({ message: 'Name, ingredients and steps are required' });
        }
        const existingAuthor = await AuthorModel.findOne({ name });
        if (existingAuthor) {
            return res.status(400).json({ message: 'Recipe already exists' });
        }
        const newAuthor = await AuthorModel.create({ name, ingredients, steps });
        return res.status(201).json({ message: 'Recipe created successfully', author: newAuthor });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

// UPDATE an Recipe
router.patch('/:id', async (req, res) => {
    try {
        if(req.body.name != null){
            res.author.name = req.body.name;
        }
        const updatedAuthor = await res.author.save();
        res.json(updatedAuthor);
    }
    catch (err){
        res.status(400).json({message: err.message});
    }
});

router.put('/:id', getAuthor, async (req, res) =>{
    try{
        const updatedAuthor = await AuthorModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.json(updatedAuthor);
    }
    catch (err){
        res.status(400).json({message: err.message});
    }
});

// DELETE an recipe
router.delete('/:id', getAuthor,async (req, res) => {
    try {
        await AuthorModel.findByIdAndDelete(req.params.id);
        res.json({message: 'Recipe  Deleted'});
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

async function getAuthor(req, res, next) {
    try {
        const author = await AuthorModel.findById(req.params.id);
        if (!author) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.author = author;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


module.exports = router;
