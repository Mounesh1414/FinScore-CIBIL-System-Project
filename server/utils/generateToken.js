import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

// Mock user database (replace with actual DB queries in production)
const users = new Map();

export async function registerUser(email, password, name) {
  if (users.has(email)) {
    throw new Error('User already exists');
  }

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const user = {
    id: Date.now().toString(),
    email,
    name,
    password: hashedPassword,
    createdAt: new Date(),
  };

  users.set(email, user);
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
  };
}

export async function authenticateUser(email, password) {
  const user = users.get(email);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isValidPassword = await bcryptjs.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid credentials');
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}

export function generateToken(userId) {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'your_secret_key',
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
  return token;
}

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your_secret_key'
    );
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}
