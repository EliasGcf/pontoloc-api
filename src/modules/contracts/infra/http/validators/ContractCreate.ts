import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
  [Segments.BODY]: Joi.object().keys({
    client_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
    delivery_price: Joi.number().min(0),
    materials: Joi.array()
      .items(
        Joi.object().keys({
          id: Joi.string().uuid({ version: 'uuidv4' }).required(),
          quantity: Joi.number().min(1).required(),
        }),
      )
      .required(),
  }),
});
