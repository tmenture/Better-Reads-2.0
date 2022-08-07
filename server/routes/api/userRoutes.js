const router = require('express').Router();

// imports the controllers for the routes 
const {
    createUser,
    saveBook,
    deleteBook,
    singleUser,
    login
} = require('../../controllers/userController');

// imports the middleware
const { authMiddleware } = require('../../utils/auth');

// put middleware before routes so we can validate the users token
router.route('/').post(createUser).put(authMiddleware, saveBook);

// routes
router.route('/login').post(login);
router.route('/dashboard').get(authMiddleware, singleUser);
router.route('/books/:bookId').delete(authMiddleware, deleteBook);

module.exports = router;