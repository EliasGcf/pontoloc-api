import Item from '../models/Item';

class ItemController {
  async store(req, res) {
    const { name, price } = req.body;

    const itemExists = await Item.findOne({ where: { name } });

    if (itemExists) {
      return res.status(400).json({ error: 'This item already exists' });
    }

    const { id } = await Item.create({ name, price });

    return res.json({ id, name, price });
  }

  async update(req, res) {
    const { id } = req.params;

    if (req.body.name) {
      const itemNameExists = await Item.findOne({
        where: { name: req.body.name },
      });

      if (itemNameExists && itemNameExists.id !== Number(id)) {
        return res.status(400).json({ error: 'This name already used' });
      }
    }

    await Item.update(req.body, { where: { id } });

    const { name, price } = await Item.findByPk(id);

    return res.status(200).json({ name, price });
  }

  async index(req, res) {
    const items = await Item.findAll();

    return res.json(items);
  }
}

export default new ItemController();
