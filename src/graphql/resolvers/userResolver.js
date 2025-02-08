const User = require("../../models/User");
const bcrypt = require("bcryptjs");

const userResolver = {
  Query: {
    users: async () => {
      try {
        return await User.find();
      } catch (error) {
        throw new Error("Failed to fetch users.");
      }
    },
  },

  Mutation: {
    async register(_, { firstName, lastName, email, password }) {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return {
            success: false,
            message: "User with this email already exists.",
          };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ firstName, lastName, email, password: hashedPassword });
        await newUser.save();

        return {
          success: true,
          message: "User registered successfully!",
          user: {
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
          },
        };
      } catch (err) {
        return {
          success: false,
          message: "Internal server error. Please try again.",
        };
      }
    },
  },
};

module.exports = userResolver;
