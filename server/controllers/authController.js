import User from '../models/User.js';
import Shop from '../models/Shop.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, shopName, shopDescription } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'customer',
    });

    if (user) {
      let shop = null;
      if (user.role === 'shopkeeper') {
        shop = await Shop.create({
          name: shopName || `${name}'s Premium Boutique`,
          ownerId: user.id,
          description: shopDescription || 'A premium retail store on DRIPZO.',
          logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80',
          banner: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1000&q=80',
          location: { type: 'Point', coordinates: [77.5946, 12.9716], address: 'Bengaluru' },
          status: 'active',
          isVerified: false
        });
      }

      const token = generateToken(user.id);
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000
      });

      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: token,
        shop: shop ? { id: shop.id, name: shop.name } : null
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user && (await user.matchPassword(password))) {
      let shop = null;
      if (user.role === 'shopkeeper' || user.role === 'admin') {
        shop = await Shop.findOne({ where: { ownerId: user.id } });
      }

      const token = generateToken(user.id);
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000
      });

      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: token,
        shop: shop ? { id: shop.id, name: shop.name } : null
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const setCookieToken = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000
  });
};

export const googleAuth = async (req, res) => {
  try {
    const { credential, accessToken } = req.body;
    let userData = null;

    if (credential) {
      const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
      const data = await response.json();
      if (data.error) {
        return res.status(400).json({ message: 'Invalid Google ID Token' });
      }
      userData = {
        id: data.sub,
        name: data.name,
        email: data.email,
        avatar: data.picture,
      };
    } else if (accessToken) {
      const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`);
      const data = await response.json();
      if (data.error) {
        return res.status(400).json({ message: 'Invalid Google Access Token' });
      }
      userData = {
        id: data.sub,
        name: data.name,
        email: data.email,
        avatar: data.picture,
      };
    } else {
      return res.status(400).json({ message: 'No credentials provided' });
    }

    let user = await User.findOne({ 
      where: { 
        email: userData.email 
      } 
    });

    if (user) {
      await user.update({
        avatar: user.avatar || userData.avatar,
        provider: user.provider === 'local' ? 'google' : user.provider,
        providerId: user.providerId || userData.id,
      });
    } else {
      user = await User.create({
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar,
        provider: 'google',
        providerId: userData.id,
        role: 'customer',
      });
    }

    const token = generateToken(user.id);
    setCookieToken(res, token);

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        provider: user.provider,
        tier: 'Google Member',
      },
      token,
    });
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const facebookAuth = async (req, res) => {
  try {
    const { accessToken } = req.body;
    if (!accessToken) {
      return res.status(400).json({ message: 'No Facebook access token provided' });
    }

    const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${accessToken}`);
    const data = await response.json();
    if (data.error) {
      return res.status(400).json({ message: 'Invalid Facebook Access Token' });
    }

    const email = data.email || `${data.id}@facebook.com`;
    const avatar = data.picture?.data?.url || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=random`;

    let user = await User.findOne({ 
      where: { 
        email 
      } 
    });

    if (user) {
      await user.update({
        avatar: user.avatar || avatar,
        provider: user.provider === 'local' ? 'facebook' : user.provider,
        providerId: user.providerId || data.id,
      });
    } else {
      user = await User.create({
        name: data.name,
        email,
        avatar,
        provider: 'facebook',
        providerId: data.id,
        role: 'customer',
      });
    }

    const token = generateToken(user.id);
    setCookieToken(res, token);

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        provider: user.provider,
        tier: 'Facebook Member',
      },
      token,
    });
  } catch (error) {
    console.error('Facebook Auth Error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const logoutUser = async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
    sameSite: 'lax',
  });
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

export const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }
    
    let shop = null;
    if (req.user.role === 'shopkeeper' || req.user.role === 'admin') {
      shop = await Shop.findOne({ where: { ownerId: req.user.id } });
    }

    res.status(200).json({
      success: true,
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        avatar: req.user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(req.user.name)}&background=random`,
        provider: req.user.provider || 'local',
        tier: req.user.provider === 'google' ? 'Google Member' : req.user.provider === 'facebook' ? 'Facebook Member' : 'DRIPZO Member',
        shop: shop ? { id: shop.id, name: shop.name } : null
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
