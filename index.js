require ('dotenv').config()

const express = require('express')
const app = express ()
const port = process.env.PORT || 4000
const mongoose = require('mongoose')
const goalRouter = require('./routes/goalRouter')
const cors = require("cors")

// middleware
app.use(express.json());
app.use(cors());


// route
app.use('/api/goals', goalRouter)



// db connection
const start = async () => {
   try {
    mongoose.connect(process.env.MONGO_URI)
    app.listen(port, () => {
        console.log(`your server listening on port ${port}`);
        });
   } catch (error) {
    console.log(error);
   }
};
start()

app.use((req, res) => {
    res.status(404).send("Resource Not Found")
});

