import Order from '../models/Order';
import OrderItem from '../models/OrderItem';

class RentController {
  async store(req, res) {
    const { client_id, materials } = req.body;

    const order = await Order.create({ client_id });

    materials.forEach(async material => {
      await OrderItem.create({
        order_id: order.id,
        material_id: material.id,
        quantity: material.quantity,
      });
    });

    return res.json(order);
  }
}

export default new RentController();
