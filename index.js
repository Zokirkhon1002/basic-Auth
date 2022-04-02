const express = require("express");

// Initialize
const app = express();

// Body parser
app.use(express.json())

// All Routes
app.use("/",require("./routes/auth"))

// Listener
const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> {
    console.log(`Server running on port: ${PORT}`)
})