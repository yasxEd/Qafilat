import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { AppDataSource } from './config/data-source';
import { adminRoutes } from './routes/admin.routes';
import { agencyRoutes } from './routes/agency.routes';
import notificationRoutes from "./routes/notification.routes";
import reportRoutes from './routes/report.routes';
import { reservationRoutes } from './routes/reservation.routes';
import { userRoutes } from './routes/user.routes';
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/agencies', agencyRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/reports', reportRoutes);


// Initialize TypeORM
AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((error) => {
        console.error('Error during Data Source initialization:', error);
    });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 