import Material from '../models/Material';

class MaterialController {
  async store(req, res) {
    const { name, price_day } = req.body;

    const itemExists = await Material.findOne({ where: { name } });

    if (itemExists) {
      return res.status(400).json({ error: 'This material already exists' });
    }

    const { id } = await Material.create({ name, price_day });

    return res.json({ id, name, price_day });
  }

  async update(req, res) {
    const { id } = req.params;

    const material = await Material.findByPk(id);

    if (!material) {
      return res.status(400).json({ error: 'Material does not exists' });
    }

    const { price_day } = req.body;

    const { name } = await material.update({ price_day });

    return res.status(200).json({ name, price_day });
  }

  async index(req, res) {
    const items = await Material.findAll({
      attributes: ['id', 'name', 'price_day'],
    });

    return res.json(items);
  }
}

export default new MaterialController();
