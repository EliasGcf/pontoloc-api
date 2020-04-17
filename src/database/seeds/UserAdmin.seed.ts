import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import bcrypt from 'bcryptjs';

const UserAdminValue = {
  name: 'Admin',
  email: 'admin@pontoloc.com.br',
  password_hash: bcrypt.hashSync('123456', 8),
  created_at: new Date(),
  updated_at: new Date(),
};

export default class UserAdmin implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('users')
      .values(UserAdminValue)
      .execute();
  }
}
