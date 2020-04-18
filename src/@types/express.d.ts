interface Client {
  id: string;
  name: string;
  cpf: string;
  phone_number: string;
  address: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

interface Material {
  id: string;
  name: string;
  daily_price: number;
  created_at: Date;
  updated_at: Date;
}

interface User {
  id: string;
}

declare namespace Express {
  export interface Request {
    client: Client;
    user: User;
    material: Material;
  }
}
