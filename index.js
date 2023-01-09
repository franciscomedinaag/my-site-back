const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/AuthRoutes");
const app = express();
const cookieParser = require("cookie-parser");

require('dotenv').config()
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
        origin: [process.env.ALLOWED_ORIGIN_ONE],
        methods: ["GET", "POST"],
        credentials: true
    })
)

app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoutes)