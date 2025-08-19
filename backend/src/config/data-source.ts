import 'dotenv/config';
import { DataSource } from "typeorm";
import { Admin } from "../entities/admin.entity";
import { Agency } from "../entities/agency.entity";
import { Notification } from "../entities/notification.entity";
import { Report } from "../entities/report.entity";
import { Reservation } from "../entities/reservation.entity";
import { User } from "../entities/user.entity";
console.log('DB_HOST:', process.env.DB_HOST);

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [User, Agency, Admin, Reservation, Notification, Report],
    subscribers: [],
    migrations: [],
    ssl: {
        rejectUnauthorized: false
    }
}); 