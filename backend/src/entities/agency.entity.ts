import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("agencies")
export class Agency {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column()
    city!: string;

    @Column()
    address!: string;

    @Column()
    phone!: string;

    @Column({
        type: "enum",
        enum: ["active", "inactive"],
        default: "active"
    })
    status!: "active" | "inactive";

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
} 