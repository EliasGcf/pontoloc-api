import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
  [Segments.BODY]: Joi.object().keys({
    daily_price: Joi.number().min(0).required(),
  }),
});
