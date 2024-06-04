const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const UserRouter = require("./Routes/UserRoutes");

const app = express();

require("dotenv").config();

const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use("/apiUser", UserRouter)


mongoose.connect(process.env.MONGODB).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.log("Connection error", error.message);
})

// app.get("/userName", (req, resp) => {
//     resp.json(displayName("Sathish", "Madhaiyan"));
// });

// const displayName = (firstName, lastName) => {
//     console.log(`My name is ${firstName} ${lastName}`);
//     return `My name is ${firstName} ${lastName}`;
// };

