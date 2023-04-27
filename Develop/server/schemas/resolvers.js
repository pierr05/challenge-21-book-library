const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth'); 
const {User}= require('../models')

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id);
                return user;
            }
        }
    },
    Mutation: {
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email})

            if(!user) {
                throw new AuthenticationError('Incorrect credentials'); 
            }

            const correctPassword = await User.isCorrectPassword(password)

            if(!correctPassword) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return {token, user}
        },

        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user); 

            return {token, user}
        },

    saveBook: async ({user, body}, res) => {
         console.log(user);
        try {
            const updatedUser = await User.findOneAndUpdate(
                {_id: user._id},
                {$addToSet: {savedBooks: body} },
                {new: true, runValidators: true}
            );
            return res.json(updatedUser);
        } catch(err) {
            console.log(err);
            return res.status(400).json(err);
        }
        
    },

    removeBook: async ({user, params}, res) => {
        const updateUser = await User.findOneAndUpdate(
            {_id: user._id},
            {$pull: {savedBooks: {bookId: params.bookId} } },
            {new: true}
        ); 
        if (!updateUser) {
            return res.status(404).json({message: "Couldn't find user with this id"})
        }
        return res.json(updateUser);
    }

    }
}; 

module.exports = resolvers; 