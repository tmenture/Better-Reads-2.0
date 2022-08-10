// imports user model and sign token from file location
const { User } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
    // finds single user for dashboard page
    async singleUser({ user = null, params }, res) {
        const foundMe = await User.findOne({
            $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
        });

        if (!foundMe) {
            return res.status(400).json({ message: 'Can not find a user with that id!' });
        }

        res.json(foundMe);
    },

    // creating an user, sign token, and sending it to the client signup form
    async createUser({ body }, res) {
        const user = await USer.create(body);

        if (!user) {
            return res.status(400).json({ message: 'Something went wrong!' });
        }

        const token = signToken(user);
        res.json({ token, user });
    },

    // logs in a user using sign token and sends info back to client login form
    async login({ body }, res) {
        const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });

        if (!user) {
            return res.status(400).json({ message: 'Can not find that user. Check credentials and try again!' });
        }

        const correctPass = await user.isCorrectPassword(body.password);

        if (!correctPass) {
            return res.status(400).json({ message: 'Wrong password. Check credentials and try again!' });
        }

        const token = signToken(user);
        res.json({ token, user });
    },

    // saves a book to the users book list field on their dashboard
    async saveBook({ user, body }, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $addToSet: { savedBooks: body } },
                { new: true, runValidators: true }
            );
            return res.json(updatedUser);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },

    // deletes a book from the users list field on their dashboard
    async deleteBook({ user, params }, res) {
        const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $pull: { savedBooks: { bookId: params.bookId } } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(400).json({ message: 'Couldnt find any book with that id!' });
        }

        return res.json(updatedUser);
    }
};