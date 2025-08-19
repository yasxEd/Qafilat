import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("reports")
export class Report {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column()
  agencyId!: string;

  // Optional: relation to Agency
  // @ManyToOne(() => Agency, agency => agency.reports)
  // agency!: Agency;
} 