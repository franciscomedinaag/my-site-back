const express = require("express");
require('dotenv').config()

const cors = require("cors");
const mongoose = require("mongoose")
const app = express();

const PORT = process.env.PORT || 5001;

app.listen(PORT, ()=>{
    console.log(`Server started on PORT ${PORT}`)
}); 

mongoose.set('strictQuery', true);
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mycluster.sujwxmo.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("DB Mongo Connection Successful")
})
.catch((err)=>{
    console.log(err.message)
})

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true
    })
)

app.use(express.json());