import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Tree from './Tree';

@Entity('harvests')
class Harvest {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  informations: string;

  @Column()
  weight: number;

  @Column()
  harvest_date: Date;

  @Column()
  tree_id: number;

  @ManyToOne(() => Tree, { eager: true })
  @JoinColumn({ name: 'tree_id' })
  tree: Tree;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Harvest;
