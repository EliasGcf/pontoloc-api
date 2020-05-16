import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Material from '@modules/materials/infra/typeorm/entities/Material';
import Contract from '@modules/contracts/infra/typeorm/entities/Contract';

@Entity('contract_items')
class ContractItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  contract_id: string;

  @ManyToOne(() => Contract, contract => contract.contract_items)
  @JoinColumn({ name: 'contract_id' })
  contract: Contract;

  @Column()
  material_id: string;

  @ManyToOne(() => Material)
  @JoinColumn({ name: 'material_id' })
  material: Material;

  @Column({ type: 'int' })
  quantity: number;

  @Column()
  price_quantity_daily: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ContractItem;
