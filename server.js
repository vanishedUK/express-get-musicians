const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const {Musician} = require("./Musician")
const {sequelize} = require("./db")

const port = 3000;

// Get Request
app.get('/musicians/:id', async (req, res) => {
    const musician = await Musician.findByPk(req.params.id);
    res.json(musician);
});

// Create Request
app.post('/musicians', async (req, res) => {
    const musician = await Musician.create(req.body);
    res.json(musician);
});

// Update Request
app.put('/musicians/:id', async (req, res) => {
    const musician = await Musician.findByPk(req.params.id);
    await musician.update(req.body);
    res.json(musician);
});

// Delete Request
app.delete('/musicians/:id', async (req, res) => {
    const musician = await Musician.findByPk(req.params.id);
    await musician.destroy();
});

app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})