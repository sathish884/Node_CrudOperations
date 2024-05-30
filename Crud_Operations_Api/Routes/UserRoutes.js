const express = require("express");
const User = require("../Modules/User");

const router = express.Router();

// Create user
router.post("/saveUsers", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error)
    }
});

// Get all users
router.get("/getAllUsers", async (req, res) => {
    try {
        const getUsers = await User.find({});
        res.status(200).send(getUsers);
    } catch (error) {
        res.status(500).send(error)
    }
});

// Get single user
router.get("/getSingleUsers/:id", async (req, res) => {
    try {
        const singleUser = await User.findById(req.params.id);
        if(!singleUser){
            res.status(404).send();
        }
        res.status(200).send(singleUser);
    } catch (error) {
        res.status(500).send(error)
    }
});

// Update user
router.put("/updateUsers/:id", async (req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators:true
        }) 
        if(!updateUser){
            res.status(404).send();
        }
        res.status(200).send(updateUser);
    } catch (error) {
        res.status(500).send(error)
    }
});

// Delete user
router.delete("/deleteUsers/:id", async (req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        if(!deleteUser){
            res.status(404).send();
        }
        res.status(200).send(deleteUser);
    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = router;