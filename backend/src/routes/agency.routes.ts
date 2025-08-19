import bcrypt from 'bcryptjs';
import express, { Request, Response, Router } from 'express';
import { AppDataSource } from '../config/data-source';
import { Agency } from '../entities/agency.entity';
import { Report } from '../entities/report.entity';
import { Reservation } from '../entities/reservation.entity';
import { User } from '../entities/user.entity';
import { generateToken } from '../utils/jwt.utils';
  
const router: Router = express.Router();
const agencyRepository = AppDataSource.getRepository(Agency);
const agencyRepo = AppDataSource.getRepository(Agency);


type RequestHandler = (req: Request, res: Response) => Promise<void>;

// Register a new agency
router.post('/register', (async (req: Request, res: Response) => {
  try {
    const { password, ...agencyData } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const agency = agencyRepository.create({
      ...agencyData,
      password: hashedPassword
    });
    
    await agencyRepository.save(agency);
    res.status(201).json({ message: 'Agency registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed' });
  }
}) as RequestHandler);

// Login agency
router.post('/login', (async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const agency = await agencyRepository.findOne({ where: { email } });
    
    if (!agency) {
      res.status(404).json({ error: 'Agency not found' });
      return;
    }
    
    const isPasswordValid = await bcrypt.compare(password, agency.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid password' });
      return;
    }
    
    const token = generateToken({ id: agency.id, role: 'agency' });
    res.json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(400).json({ error: 'Login failed' });
  }
}) as RequestHandler);

// Get agency profile
router.get('/profile/:id', (async (req: Request<{ id: string }>, res: Response) => {
  try {
    const agency = await agencyRepository.findOne({ 
      where: { id: req.params.id },
      select: ['id', 'name', 'email', 'city', 'address', 'phone', 'status']
    });
    
    if (!agency) {
      res.status(404).json({ error: 'Agency not found' });
      return;
    }
    res.json(agency);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch agency profile' });
  }
}) as RequestHandler);

// Update agency profile
router.put('/profile/:id', (async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { password, ...updateData } = req.body;
    const agency = await agencyRepository.findOne({ where: { id: req.params.id } });
    
    if (!agency) {
      res.status(404).json({ error: 'Agency not found' });
      return;
    }
    
    Object.assign(agency, updateData);
    await agencyRepository.save(agency);
    
    const { password: _, ...agencyWithoutPassword } = agency;
    res.json(agencyWithoutPassword);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update profile' });
  }
}) as RequestHandler);

// Create a new agency
router.post('/', (async (req: Request, res: Response) => {
    try {
        const agency = agencyRepository.create(req.body);
        await agencyRepository.save(agency);
        res.status(201).json(agency);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create agency' });
    }
}) as RequestHandler);

// Get all agencies
router.get('/', (async (req: Request, res: Response) => {
    try {
        const agencies = await agencyRepository.find();
        res.json(agencies);
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch agencies' });
    }
}) as RequestHandler);

// Get agency by ID
router.get('/:id', (async (req: Request<{ id: string }>, res: Response) => {
    try {
        const agency = await agencyRepository.findOne({ 
            where: { id: req.params.id }
        });
        
        if (!agency) {
            res.status(404).json({ error: 'Agency not found' });
            return;
        }
        res.json(agency);
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch agency' });
    }
}) as RequestHandler);

// Update agency
router.put('/:id', (async (req: Request<{ id: string }>, res: Response) => {
    try {
        const agency = await agencyRepository.findOne({ 
            where: { id: req.params.id }
        });
        
        if (!agency) {
            res.status(404).json({ error: 'Agency not found' });
            return;
        }
        
        Object.assign(agency, req.body);
        await agencyRepository.save(agency);
        res.json(agency);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update agency' });
    }
}) as RequestHandler);

// Delete agency
router.delete('/:id', (async (req: Request<{ id: string }>, res: Response) => {
    try {
        const agency = await agencyRepository.findOne({ 
            where: { id: req.params.id }
        });
        
        if (!agency) {
            res.status(404).json({ error: 'Agency not found' });
            return;
        }
        
        await agencyRepository.remove(agency);
        res.json({ message: 'Agency deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete agency' });
    }
}) as RequestHandler);

// Get agency stats
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const agencyId = req.query.agencyId as string;
    if (!agencyId) {
      return res.status(400).json({ error: "agencyId is required" });
    }

    const agency = await agencyRepo.findOne({ where: { id: agencyId } });
    if (!agency) {
      return res.status(404).json({ error: "Agency not found" });
    }

    const clients = await AppDataSource.getRepository(User).count({ where: { city: agency.city } });
    const reservations = await AppDataSource.getRepository(Reservation).count({ where: { agencyId } });
    const reports = await AppDataSource.getRepository(Report).count({ where: { agencyId } });

    res.json({ clients, reservations, reports });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch agency stats" });
  }
});

export const agencyRoutes = router; 