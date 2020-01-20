import Material from '../models/Material';

class ItemController {
  async store(req, res) {
    const { name, price_day } = req.body;

    const itemExists = await Material.findOne({ where: { name } });

    if (itemExists) {
      return res.status(400).json({ error: 'This item already exists' });
    }

    const { id } = await Material.create({ name, price_day });

    return res.json({ id, name, price_day });
  }

  async update(req, res) {
    const { id } = req.params;

    if (req.body.name) {
      const itemNameExists = await Material.findOne({
        where: { name: req.body.name },
      });

      if (itemNameExists && itemNameExists.id !== Number(id)) {
        return res.status(400).json({ error: 'This name already used' });
      }
    }

    await Material.update(req.body, { where: { id } });

    const { name, price } = await Material.findByPk(id);

    return res.status(200).json({ name, price });
  }

  async index(req, res) {
    const items = await Material.findAll();

    return res.json(items);
  }
}

export default new ItemController();
