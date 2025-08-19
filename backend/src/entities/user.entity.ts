import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    fullName!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column()
    city!: string;

    @Column({ nullable: true })
    registrationDate!: string;

    @Column({ nullable: true })
    phoneNumber?: string;

    @Column({ nullable: true })
    agencyId!: string;

    @CreateDateColumn({ nullable: true })
    createdAt!: Date;

    @UpdateDateColumn({ nullable: true })
    updatedAt!: Date;
} 