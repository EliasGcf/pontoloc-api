import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid({ version: 'uuidv4' }).required(),
  }),
});
