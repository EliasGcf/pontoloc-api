type Relations = 'client' | 'contract_items' | 'contract_items.material';

export default interface IFindAllAndCountWithOptionsDTO {
  page: number;
  order_element:
    | 'client_id'
    | 'daily_total_price'
    | 'delivery_price'
    | 'collect_price'
    | 'final_price'
    | 'collect_at'
    | 'created_at'
    | 'updated_at';
  order: 'ASC' | 'DESC';
  relations?: Relations[];
}
