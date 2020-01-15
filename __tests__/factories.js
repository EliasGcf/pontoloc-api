import faker from 'faker';
import factory from 'factory-girl';

import Client from '../src/app/models/Client';
import Item from '../src/app/models/Item';
import Rent from '../src/app/models/Rent';

factory.define('Client', Client, {
  name: faker.name.findName(),
  telefone: faker.phone.phoneNumber(),
  endereco: faker.address.streetAddress(),
});

factory.define('Item', Item, {
  name: faker.commerce.product(),
  price: faker.commerce.price(),
});

factory.define('Rent', Rent, {
  // informar o client_id, e item_it na hora de usar
  amount: faker.random.number(),
  rent_price: faker.commerce.price(),
  returned_at: null,
});

export default factory;
