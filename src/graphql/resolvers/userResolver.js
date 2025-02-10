const User = require("../../models/User");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const userResolver = {
  Query: {
    user: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        if (!user) throw new Error("User not found.");
        return user;
      } catch (error) {
        throw new Error("Failed to fetch user.");
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

        const newUser = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword,
        });
        await newUser.save();

        return {
          success: true,
          message: "User registered successfully!",
        };
      } catch (err) {
        return {
          success: false,
          message: "Internal server error. Please try again.",
        };
      }
    },

    async login(_, { email, password }) {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return {
            success: false,
            message: "Invalid credentials.",
          };
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return {
            success: false,
            message: "Invalid credentials.",
          };
        }

        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );

        return {
          success: true,
          message: "Login successful!",
          token,
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
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
