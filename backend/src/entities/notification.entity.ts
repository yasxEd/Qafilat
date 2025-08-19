import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("notifications")
export class Notification {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column({ default: "all" })
  recipientType!: string; // "all" or "specific"

  @Column("simple-array", { nullable: true })
  recipientUserIds?: string[]; // user IDs if specific

  @CreateDateColumn()
  sentAt!: Date;
}
