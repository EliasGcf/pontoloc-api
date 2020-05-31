import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

import Contract from '@modules/contracts/infra/typeorm/entities/Contract';

@Entity('clients')
class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Contract, contract => contract.client)
  contracts: Contract[];

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  phone_number: string;

  @Column()
  address: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

export default Client;
