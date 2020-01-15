import Rent from '../models/Rent';

class RentController {
  async store(req, res) {
    const rent = await Rent.create(req.body);

    return res.json(rent);
  }
}

export default new RentController();
