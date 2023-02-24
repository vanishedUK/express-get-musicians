const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// loading musician route
const musicianRouter = require('./routes/musicians');

// express routes
app.use("/musicians", musicianRouter);

// loading server
app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})