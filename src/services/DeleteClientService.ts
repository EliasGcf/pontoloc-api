import Client from '@models/Client';
import { getRepository } from 'typeorm';

interface Request {
  id: string;
}

class DeleteClientService {
  public async execute({ id }: Request): Promise<void> {
    const clientsRepository = getRepository(Client);

    await clientsRepository.softDelete(id);
  }
}

export default DeleteClientService;
