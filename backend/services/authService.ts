import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

interface SignupData {
  name: string;
  email: string;
  password: string;
  role?: string;
}

interface UserInstance {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  toJSON(): UserInstance;
}

const authService = {
  async signup(data: SignupData) {
    const { name, email, password, role } = data;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Email already exists");
    }
    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role ?? "BUYER",
    });
    // Remove password from response
    const userData = user.toJSON() as UserInstance;
    const { password: _, ...userWithoutPassword } = userData;
    return userWithoutPassword;
  },

  async login(email: string, password: string) {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured in environment variables");
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Verify password
    const userData = user.toJSON() as UserInstance;
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign(
      {
        id: userData.id,
        role: userData.role,
        name: userData.name,
        email: userData.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = userData;
    return { token, user: userWithoutPassword };
  },
};

export default authService;
