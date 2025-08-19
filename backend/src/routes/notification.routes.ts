import { Request, Response, Router } from "express";
import { AppDataSource } from "../config/data-source";
import { Notification } from "../entities/notification.entity";

const router = Router();
const notificationRepo = AppDataSource.getRepository(Notification);

// Get all notifications
router.get("/", async (req: Request, res: Response) => {
  try {
    const notifications = await notificationRepo.find({ order: { sentAt: "DESC" } });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

// Create a new notification
router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, content, recipientType, recipientUserIds } = req.body;
    const notification = notificationRepo.create({
      title,
      content,
      recipientType,
      recipientUserIds: recipientType === "specific" ? recipientUserIds : [],
    });
    await notificationRepo.save(notification);
    res.status(201).json(notification);
  } catch (error) {
    res.status(400).json({ error: "Failed to create notification" });
  }
});

// Get notifications by user ID
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const notifications = await notificationRepo.createQueryBuilder('notification')
      .where('notification.recipientUserIds = :userId', { userId })
      .orWhere('notification.recipientUserIds LIKE :start', { start: `${userId},%` })
      .orWhere('notification.recipientUserIds LIKE :end', { end: `%,${userId}` })
      .orWhere('notification.recipientUserIds LIKE :middle', { middle: `%,${userId},%` })
      .orderBy('notification.sentAt', 'DESC')
      .getMany();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des notifications.' });
  }
});

export default router;
