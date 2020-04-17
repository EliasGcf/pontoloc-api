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

declare namespace Express {
  export interface Request {
    client: Client;
    user: {
      id: string;
    };
  }
}
