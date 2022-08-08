const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken }  = require('../utils/auth');

const resolvers = {
    Query: {
        dashboard: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({})
                    .select('-__v -password')
                    .populate('books')
                    return userData;
            }

            throw new AuthenticationError('You must login or sign up!')
        },
    },
    Mutation: {

        addUser: async (parent, args) => {
            
        },

        login: async (parent, {email, password}) => {

        },

        saveBook: async (parents, args, context) => {

        },

        deleteBook: async (parent, args, context) => {
            
        },
    
        viewReviews: async (parents, args, context) => {

        }

    }
};

module.exports = resolvers;