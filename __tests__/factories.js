import faker from 'faker';
import factory from 'factory-girl';

import Client from '../src/app/models/Client';

factory.define('Client', Client, {
  name: faker.name.findName(),
  telefone: faker.phone.phoneNumber(),
  endereco: faker.address.streetAddress(),
});

export default factory;
