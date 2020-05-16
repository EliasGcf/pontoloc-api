import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import Client from '@modules/clients/infra/typeorm/entities/Client';
import ContractItem from '@modules/contracts/infra/typeorm/entities/ContractItem';

@Entity('contracts')
class Contract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  client_id: string;

  @ManyToOne(() => Client, client => client.contracts)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @OneToMany(() => ContractItem, contractItem => contractItem.contract, {
    cascade: true,
  })
  contract_items: ContractItem[];

  @Column()
  daily_total_price: number;

  @Column()
  delivery_price: number;

  @Column()
  collect_price: number;

  @Column()
  final_price: number;

  @Column()
  collect_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Contract;
