import { Request, Response, Router } from "express";
import { AppDataSource } from "../config/data-source";
import { Agency } from "../entities/agency.entity";
import { Report } from "../entities/report.entity";
import { Reservation } from "../entities/reservation.entity";
import { User } from "../entities/user.entity";

const router = Router();
const reportRepo = AppDataSource.getRepository(Report);
const agencyRepo = AppDataSource.getRepository(Agency);

// Create a new report
router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, content, agencyId } = req.body;
    const report = reportRepo.create({ title, content, agencyId });
    await reportRepo.save(report);
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ error: "Failed to create report" });
  }
});

// Get all reports
router.get("/", async (req: Request, res: Response) => {
  try {
    const reports = await reportRepo.find();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

// Get report by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const report = await reportRepo.findOne({ where: { id: req.params.id } });
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch report" });
  }
});

// Update report
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const report = await reportRepo.findOne({ where: { id: req.params.id } });
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    Object.assign(report, req.body);
    await reportRepo.save(report);
    res.json(report);
  } catch (error) {
    res.status(400).json({ error: "Failed to update report" });
  }
});

// Delete report
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const report = await reportRepo.findOne({ where: { id: req.params.id } });
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    await reportRepo.remove(report);
    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete report" });
  }
});

// Get reports stats
router.get("/stats", async (req: Request, res: Response) => {
  try {
    const agencyId = req.query.agencyId as string | undefined;
    let count: number;
    if (agencyId) {
      count = await reportRepo.count({ where: { agencyId } });
      res.json({ reports: count, agencyId });
    } else {
      count = await reportRepo.count();
      res.json({ reports: count });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch report stats" });
  }
});

// Get agency stats
router.get('/stats', async (req: Request, res: Response) => {
  try {
    // You may want to get the agencyId from the token or query
    const agencyId = req.query.agencyId as string;
    if (!agencyId) {
      return res.status(400).json({ error: "agencyId is required" });
    }

    // Count users with the same city as the agency
    const agency = await agencyRepo.findOne({ where: { id: agencyId } });
    if (!agency) {
      return res.status(404).json({ error: "Agency not found" });
    }

    const clients = await AppDataSource.getRepository(User).count({ where: { city: agency.city } });
    const reservations = await AppDataSource.getRepository(Reservation).count({ where: { city: agency.city } });
    const reports = await AppDataSource.getRepository(Report).count({ where: { agencyId } });

    res.json({ clients, reservations, reports });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch agency stats" });
  }
});

export default router; 