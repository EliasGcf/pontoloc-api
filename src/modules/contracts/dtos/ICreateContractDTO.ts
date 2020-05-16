import Client from '@modules/clients/infra/typeorm/entities/Client';

interface IMaterail {
  material_id: string;
  quantity: number;
  price_quantity_daily: number;
}

export default interface ICreateContractDTO {
  client: Client;
  delivery_price: number;
  daily_total_price: number;
  materials: IMaterail[];
}
