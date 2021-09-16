import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Order } from './order.entity';
import { Product } from './product.entity';


@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order)
  order_id: number;

  @Column()
  product_id: number;

  @ManyToMany(() => Product)
  @JoinColumn({ name: 'product_id' })
  products: Product;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @CreateDateColumn()
  created_at: Date;
}
