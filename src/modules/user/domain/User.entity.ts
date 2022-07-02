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

  newPasswordIsValid(newPassword: string): boolean {
    return !compareSync(newPassword, this.password);
  }

  comparePasswords(password: string): boolean {
    return compareSync(password, this.password);
  }

  @BeforeInsert()
  hashPassword(): void {
    this.password = hashSync(this.password, 10);
  }
}
