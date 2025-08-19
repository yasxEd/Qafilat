import bcrypt from 'bcryptjs';
import express, { Request, Response, Router } from 'express';
import { AppDataSource } from '../config/data-source';
import { Admin } from '../entities/admin.entity';
import { generateToken } from '../utils/jwt.utils';

const router: Router = express.Router();
const adminRepository = AppDataSource.getRepository(Admin);

type RequestHandler = (req: Request, res: Response) => Promise<void>;

// Register a new admin
router.post('/register', (async (req: Request, res: Response) => {
  try {
    const { password, ...adminData } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const admin = adminRepository.create({
      ...adminData,
      password: hashedPassword
    });
    
    await adminRepository.save(admin);
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed' });
  }
}) as RequestHandler);

// Login admin
router.post('/login', (async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const admin = await adminRepository.findOne({ where: { email } });
    
    if (!admin) {
      res.status(404).json({ error: 'Admin not found' });
      return;
    }
    
    const isPasswordValid = await bcrypt.compare(password, admin.password as string);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid password' });
      return;
    }
    
    const token = generateToken({ id: admin.id as string, role: 'admin' });
    res.json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(400).json({ error: 'Login failed' });
  }
}) as RequestHandler);

// Get admin profile
router.get('/profile/:id', (async (req: Request<{ id: string }>, res: Response) => {
  try {
    const admin = await adminRepository.findOne({ 
      where: { id: req.params.id },
      select: ['id', 'name', 'email']
    });
    
    if (!admin) {
      res.status(404).json({ error: 'Admin not found' });
      return;
    }
    res.json(admin);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch admin profile' });
  }
}) as RequestHandler);

// Update admin profile
router.put('/profile/:id', (async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { password, ...updateData } = req.body;
    const admin = await adminRepository.findOne({ where: { id: req.params.id } });
    
    if (!admin) {
      res.status(404).json({ error: 'Admin not found' });
      return;
    }
    
    Object.assign(admin, updateData);
    await adminRepository.save(admin);
    
    const { password: _, ...adminWithoutPassword } = admin;
    res.json(adminWithoutPassword);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update profile' });
  }
}) as RequestHandler);

export const adminRoutes = router; 