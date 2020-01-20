import OrderItem from '../models/OrderItem';

class OrderItemController {
  async store(req, res) {
    const orderItem = await OrderItem.create(req.body);

    return res.json(orderItem);
  }
}

export default new OrderItemController();
