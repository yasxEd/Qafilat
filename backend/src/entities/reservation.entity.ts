import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("reservations")
export class Reservation {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    userId!: string;

    @Column()
    agencyId!: string;

    @Column({
        type: "enum",
        enum: ["hajj", "umrah", "leisure", "hotel", "vol"]
    })
    packageType!: "hajj" | "umrah" | "leisure" | "hotel" | "vol";

    @Column()
    departureCity!: string;

    @Column({ nullable: true })
    destination?: string;

    @Column({ nullable: true })
    tripType?: string;

    @Column({ nullable: true })
    duration?: string;

    @Column()
    dateFrom!: string;

    @Column({ nullable: true })
    dateTo?: string;

    @Column({
        type: "enum",
        enum: ["round", "oneway"],
        nullable: true
    })
    tripDirection?: "round" | "oneway";

    @Column({ nullable: true })
    flightClass?: string;

    @Column()
    adults!: string;

    @Column()
    children!: string;

    @Column({ nullable: true })
    rooms?: string;

    @Column({
        type: "enum",
        enum: ["confirmed", "pending", "cancelled"],
        default: "pending"
    })
    status!: "confirmed" | "pending" | "cancelled";

    @Column()
    travelerName!: string;

    @Column()
    travelerPhone!: string;

    @Column()
    birthDate!: string;

    @Column()
    passportNumber!: string;

    @Column()
    passportExpiry!: string;

    @Column()
    address!: string;

    @Column()
    emergencyContact!: string;

    @Column({ nullable: true })
    medicalConditions?: string;

    @Column("jsonb")
    documents!: {
        passport: {
            exists: boolean;
            filePath?: string;
            uploadedAt?: string;
            filename?: string;
            url?: string;
        };
        photo: {
            exists: boolean;
            filePath?: string;
            uploadedAt?: string;
            filename?: string;
            url?: string;
        };
        identity: {
            exists: boolean;
            filePath?: string;
            uploadedAt?: string;
            filename?: string;
            url?: string;
        };
        vaccination: {
            exists: boolean;
            filePath?: string;
            uploadedAt?: string;
            filename?: string;
            url?: string;
        };
    };

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
} 