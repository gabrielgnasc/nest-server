import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hashSync, compareSync } from 'bcrypt';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  newPasswordIsValid(newPassword: string) {
    return !compareSync(newPassword, this.password);
  }

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}
