import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id!: number

    @Column('varchar')
    ipAddress!: string

    @Column('varchar')
    bookId!: string

    @Column('varchar', { length: 500 })
    text!: string

    @Column({ type: "timestamptz", default: "now()" })
    createdAt: Date = new Date();
}
