interface Material {
  id: string;
  name: string;
  daily_price: number;
  created_at: Date;
  updated_at: Date;
}

declare namespace Express {
  export interface Request {
    client: {
      id: string;
    };
    user: {
      id: string;
    };
    material: Material;
  }
}
