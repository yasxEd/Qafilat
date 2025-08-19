import bcrypt from 'bcryptjs';
import express, { Request, Response, Router } from 'express';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/user.entity';
import { authMiddleware } from '../middleware/auth.middleware';
import { asyncHandler } from '../utils/async-handler';
import { generateToken } from '../utils/jwt.utils';

const router: Router = express.Router();
const userRepository = AppDataSource.getRepository(User);

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: 'user' | 'agency' | 'admin';
      };
    }
  }
}

type RequestHandler = (req: Request, res: Response) => Promise<void>;

// Create a new user
router.post('/', (async (req: Request, res: Response) => {
    try {
        const user = userRepository.create(req.body);
        await userRepository.save(user);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create user' });
    }
}) as RequestHandler);

// Get all users
router.get('/', (async (req: Request, res: Response) => {
    try {
        const users = await userRepository.find();
        res.json(users);
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch users' });
    }
}) as RequestHandler);

// Get user by ID
router.get('/:id', authMiddleware('user', 'agency', 'admin'), asyncHandler(async (req: Request, res: Response) => {
  if (req.user?.id !== req.params.id) {
    res.status(403).json({ error: 'Forbidden' });
  } else {
    try {
      const user = await userRepository.findOne({ where: { id: req.params.id } });
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json(user);
      }
    } catch (error) {
      res.status(400).json({ error: 'Failed to fetch user' });
    }
  }
}));

// Update user
router.put('/:id', (async (req: Request<{ id: string }>, res: Response) => {
    try {
        const user = await userRepository.findOne({ 
            where: { id: req.params.id }
        });
        
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        
        Object.assign(user, req.body);
        await userRepository.save(user);
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update user' });
    }
}) as RequestHandler);

// Delete user
router.delete('/:id', (async (req: Request<{ id: string }>, res: Response) => {
    try {
        const user = await userRepository.findOne({ 
            where: { id: req.params.id }
        });
        
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        
        await userRepository.remove(user);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete user' });
    }
}) as RequestHandler);

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { password, ...userData } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = userRepository.create({
      ...userData,
      password: hashedPassword,
      registrationDate: new Date().toISOString()
    });
    
    await userRepository.save(user);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed' });
  }
});

// Login user
router.post('/login', (async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userRepository.findOne({ where: { email } });
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid password' });
      return;
    }
    
    const token = generateToken({ id: user.id, role: 'user' });
    res.json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(400).json({ error: 'Login failed' });
  }
}) as RequestHandler);

// Get user profile
router.get('/profile/:id', (async (req: Request<{ id: string }>, res: Response) => {
  try {
    const user = await userRepository.findOne({ 
      where: { id: req.params.id },
      select: ['id', 'fullName', 'email', 'city', 'registrationDate', 'phoneNumber', 'agencyId']
    });
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch user profile' });
  }
}) as RequestHandler);

// Update user profile
router.put('/profile/:id', (async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { password, ...updateData } = req.body;
    const user = await userRepository.findOne({ where: { id: req.params.id } });
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    Object.assign(user, updateData);
    await userRepository.save(user);
    
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update profile' });
  }
}) as RequestHandler);


export const userRoutes = router; 