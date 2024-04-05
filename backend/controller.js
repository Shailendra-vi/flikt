const User = require('./User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const secretKey = 'SecretKey'
const controller = {
    register: async (req, res) => {
        const { name, email, password } = req.body;
        try {
            const existingUser = await User.findOne({ $or: [{ email }] });

            if (existingUser) {
                return res.status(400).json({
                    message: 'Email already exists',
                    success: false
                });
            }

            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
            });

            await newUser.save();

            res.status(201).json({
                message: 'Registration successful',
                success: true
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Internal server error',
                success: false
            });
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(201).json({ message: 'Invalid user' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(201).json({ message: 'Invalid password' });
            }

            let newtoken = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '7d' });
            res.json({ token: newtoken, message: 'Login successful', userId: user._id, name: user.name, email: user.email });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getUser: async (req, res) => {
        const { token } = req.body;
        try {
            let user
            let userId;
            if (token) {
                const decoded = jwt.verify(token, secretKey);
                req.userId = decoded.userId;
                userId = decoded.userId
            }
            if (userId)
                user = await User.findById(userId);
            if (!user) {
                res.status(404).json({ success: false, message: "User not found" });
            }
            res.json({ userId: user._id, name: user.name, email: user.email })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    deleteUser: async (req, res) => {
        const userId = req.params.id;

        try {
            const deletedUser = await User.findByIdAndDelete(userId);
            if (deletedUser) {
                res.json({ success: true, message: "User deleted successfully" });
            } else {
                res.status(404).json({ success: false, message: "User not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
    updateUser: async (req, res) => {
        const userId = req.params.id;
        let { name, email, password } = req.body;

        try {
            const current = await User.findById(userId);
            if (password) {
                password = await bcrypt.hash(password, saltRounds);
            }
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { name: name ? name : current.name, email: email ? email : current.email, password: password ? password : current.password },
                { new: true }
            );

            if (updatedUser) {
                res.json({
                    success: true,
                    message: "User details updated successfully",
                    user: updatedUser,
                });
            } else {
                res.status(404).json({ success: false, message: "User not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },

    addUpdateUserDataList: async (req, res) => {
        const userId = req.params.id;
        const dataList = req.body.dataList;
        try {
            const user = await User.findByIdAndUpdate(
                userId,
                { dataList },
                { new: true }
            );
            if (user) {
                res.json({ success: true, message: "UserList added successfully" });
            } else {
                res.status(404).json({ success: false, message: "User not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
    getList: async (req, res) => {
        const userId = req.params.id;
        try {
            const user = await User.findById(userId);
            if (user) {
                res.json({ success: true, message: "fetched user data successfully", dataList: user.dataList });
            } else {
                res.status(404).json({ success: false, message: "User not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
}

module.exports = controller;
