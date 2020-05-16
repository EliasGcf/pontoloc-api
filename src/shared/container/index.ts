import { container } from 'tsyringe';

import '@modules/users/providers';
// import './providers';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import ClientsRepository from '@modules/clients/infra/typeorm/repositories/ClientsRepository';

// import IContractItemsRepository from '@modules/contractItems/repositories/IContractItemsRepository';
// import ContractItemsRepository from '@modules/contractItems/infra/typeorm/repositories/ContractItemsRepository';

import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';
import ContractsRepository from '@modules/contracts/infra/typeorm/repositories/ContractsRepository';

import IMaterialsRepository from '@modules/materials/repositories/IMaterialsRepository';
import MaterialsRepository from '@modules/materials/infra/typeorm/repositories/MaterialsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository,
);

// container.registerSingleton<IContractItemsRepository>(
//   'ContractItemsRepository',
//   ContractItemsRepository,
// );

container.registerSingleton<IContractsRepository>(
  'ContractsRepository',
  ContractsRepository,
);

container.registerSingleton<IMaterialsRepository>(
  'MaterialsRepository',
  MaterialsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
