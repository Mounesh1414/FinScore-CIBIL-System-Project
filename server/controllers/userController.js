import logger from '../utils/logger.js';

export async function getUserProfile(req, res) {
  try {
    // TODO: Fetch user from database using req.userId
    const mockUser = {
      id: req.userId,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91-9876543210',
      createdAt: new Date(),
      isActive: true,
    };

    res.status(200).json({
      success: true,
      user: mockUser,
    });
  } catch (error) {
    logger.error('Get profile error', error.message);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
}

export async function updateUserProfile(req, res) {
  try {
    const { name, phone } = req.body;
    
    // TODO: Update user in database
    const updatedUser = {
      id: req.userId,
      name: name || 'John Doe',
      email: 'john@example.com',
      phone: phone || '+91-9876543210',
    };

    logger.info('User profile updated', { userId: req.userId });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    logger.error('Update profile error', error.message);
    res.status(500).json({ error: 'Failed to update profile' });
  }
}

export async function getDashboardData(req, res) {
  try {
    // TODO: Fetch actual data from database
    const dashboardData = {
      creditScore: 750,
      previousScore: 720,
      trend: 'up',
      loanSuggestions: [
        {
          type: 'Personal Loan',
          amount: 500000,
          interestRate: 8.5,
          tenure: 60,
          recommendation: 'Recommended',
          color: '#27ae60',
        },
        {
          type: 'Home Loan',
          amount: 2000000,
          interestRate: 6.5,
          tenure: 240,
          recommendation: 'Available',
          color: '#f39c12',
        },
      ],
    };

    res.status(200).json({
      success: true,
      data: dashboardData,
    });
  } catch (error) {
    logger.error('Get dashboard error', error.message);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
}
