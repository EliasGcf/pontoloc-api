import Item from '../models/Item';

class ItemController {
  async store(req, res) {
    const item = await Item.create(req.body);

    return res.json(item);
  }
}

export default new ItemController();
