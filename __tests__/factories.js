import { generate } from 'cpf';
import factory from 'factory-girl';
import faker from 'faker/locale/pt_BR';

import Client from '../src/app/models/Client';
import ContractItem from '../src/app/models/ContractItem';
import Material from '../src/app/models/Material';

factory.define('Client', Client, {
  name: () => faker.name.findName(),
  telefone: () => faker.phone.phoneNumber(),
  endereco: () => faker.address.streetAddress(),
  cpf: () => generate(),
});

factory.define('Material', Material, {
  name: () => faker.commerce.product(),
  price_day: () => faker.commerce.price(),
});

factory.define('ContractItem', ContractItem, {
  quantity: () => faker.random.number(),
});

export default factory;
