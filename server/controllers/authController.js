import logger from '../utils/logger.js';
import { registerUser, authenticateUser, generateToken } from '../utils/generateToken.js';

export async function register(req, res) {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = await registerUser(email, password, name);
    logger.info('User registered', { email });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user,
    });
  } catch (error) {
    logger.error('Registration error', error.message);
    res.status(400).json({ error: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = await authenticateUser(email, password);
    const token = generateToken(user.id);

    logger.info('User logged in', { email });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user,
    });
  } catch (error) {
    logger.error('Login error', error.message);
    res.status(401).json({ error: error.message });
  }
}

export function logout(req, res) {
  try {
    logger.info('User logged out', { userId: req.userId });
    res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    logger.error('Logout error', error.message);
    res.status(500).json({ error: 'Logout failed' });
  }
}

export function refreshToken(req, res) {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ error: 'Token required' });
    }

    // TODO: Validate old token and generate new one
    const newToken = generateToken(req.userId);

    res.status(200).json({
      success: true,
      token: newToken,
    });
  } catch (error) {
    logger.error('Token refresh error', error.message);
    res.status(401).json({ error: 'Token refresh failed' });
  }
}
