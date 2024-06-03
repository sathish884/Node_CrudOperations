const express = require("express");
const User = require("../Modules/User");
const bcrypt = require("bcrypt");

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
        if (!singleUser) {
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
            new: true,
            runValidators: true
        })
        if (!updateUser) {
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
        if (!deleteUser) {
            res.status(404).send();
        }
        res.status(200).send(deleteUser);
    } catch (error) {
        res.status(500).send(error)
    }
});

// User registerations 
router.post("/registerUser", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exisitingUser = await User.findOne({ email });
        if (exisitingUser) {
            return res.status(401).json({ message: "User already exist" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: `Error ${error}` });
    }
})

// User registerations 
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Email" });
        }
        const isMatchPassword = await bcrypt.compare(password, user.password);
        if (!isMatchPassword) {
            res.status(400).json({ message: "Invalid password" });
        }
        res.status(200).json({ message: "User Logged in successfully" })
    } catch (error) {
        res.status(500).json({ message: `Error ${error}` });
    }
})

module.exports = router;