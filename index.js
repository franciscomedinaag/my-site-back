const express = require("express");
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 5001;

app.listen(PORT, ()=>{
    console.log(`Server started on PORT ${PORT}`)
}); 