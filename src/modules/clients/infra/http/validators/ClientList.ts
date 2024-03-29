import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
  [Segments.QUERY]: Joi.object().keys({
    deleted: Joi.boolean().default(false),
    page: Joi.number().default(1),
    name: Joi.string().default(''),
  }),
});
