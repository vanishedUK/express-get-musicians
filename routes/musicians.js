const express = require("express")
const router = express.Router()
const {check, validationResult} = require("express-validator")

// Importing Models
const {Musician} = require("../Musician")
const {sequelize} = require("../db");

// Get Request
router.get('/musicians/:id', async (req, res) => {
    const musician = await Musician.findByPk(req.params.id);
    res.json(musician);
});

// Create Request
router.post('/musicians/:id', check(["name", "instrument"]).not().isEmpty().trim(), async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.json({error: errors.array()});
    } else {
        const musician = await Musician.create(req.body);
        res.json(musician);
    }
});

// Update Request
router.put('/musicians/:id', async (req, res) => {
    const musician = await Musician.findByPk(req.params.id);
    await musician.update(req.body);
    res.json(musician);
});

// Delete Request
router.delete('/musicians/:id', async (req, res) => {
    const musician = await Musician.findByPk(req.params.id);
    await musician.destroy();
});

module.exports = router;