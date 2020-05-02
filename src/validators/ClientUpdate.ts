import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    cpf: Joi.string().length(14).required(),
    phone_number: Joi.string().min(11).max(16).required(),
    address: Joi.string().required(),
  }),
});
