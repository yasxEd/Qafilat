import express, { Request, Response, Router } from 'express';
import { AppDataSource } from '../config/data-source';
import { Reservation } from '../entities/reservation.entity';
import { authMiddleware } from '../middleware/auth.middleware';

const router: Router = express.Router();
const reservationRepository = AppDataSource.getRepository(Reservation);

type RequestHandler = (req: Request, res: Response) => Promise<void>;

// Create a new reservation
router.post('/', authMiddleware('user'), async (req: Request, res: Response) => {
  try {
    // Always use the authenticated user's ID
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Create the reservation, forcing the userId
    const reservation = reservationRepository.create({
      ...req.body,
      userId,
    });
    await reservationRepository.save(reservation);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create reservation' });
  }
});

// Get all reservations
router.get('/', (async (req: Request, res: Response) => {
  try {
    const reservations = await reservationRepository.find();
    res.json(reservations);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch reservations' });
  }
}) as RequestHandler);

// Get reservation by ID
router.get('/:id', (async (req: Request<{ id: string }>, res: Response) => {
  try {
    const reservation = await reservationRepository.findOne({ 
      where: { id: req.params.id }
    });
    
    if (!reservation) {
      res.status(404).json({ error: 'Reservation not found' });
      return;
    }
    res.json(reservation);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch reservation' });
  }
}) as RequestHandler);

// Update reservation
router.put('/:id', (async (req: Request<{ id: string }>, res: Response) => {
  try {
    const reservation = await reservationRepository.findOne({ 
      where: { id: req.params.id }
    });
    
    if (!reservation) {
      res.status(404).json({ error: 'Reservation not found' });
      return;
    }
    
    Object.assign(reservation, req.body);
    await reservationRepository.save(reservation);
    res.json(reservation);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update reservation' });
  }
}) as RequestHandler);

// Delete reservation
router.delete('/:id', (async (req: Request<{ id: string }>, res: Response) => {
  try {
    const reservation = await reservationRepository.findOne({ 
      where: { id: req.params.id }
    });
    
    if (!reservation) {
      res.status(404).json({ error: 'Reservation not found' });
      return;
    }
    
    await reservationRepository.remove(reservation);
    res.json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete reservation' });
  }
}) as RequestHandler);

// Get reservations by user ID
router.get('/user/:userId', async (req, res) => {
  const reservations = await reservationRepository.find({ where: { userId: req.params.userId } });
  res.json(reservations);
});

// Get reservations by agency ID
router.get('/agency/:agencyId', (async (req: Request<{ agencyId: string }>, res: Response) => {
  try {
    const reservations = await reservationRepository.find({ 
      where: { agencyId: req.params.agencyId }
    });
    res.json(reservations);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch agency reservations' });
  }
}) as RequestHandler);

export const reservationRoutes = router; 