/**
 * remote_product_id	string			
store_id	int			
event_type	enum			
product_name	string			
price	double			
price_origin	double			
product_image	text			
start_date,end_date	dateTime			
is_display	enum	공개, 비공개 외 다른 상태 값의 추가를 생각하여 enum처리		
 */
export class Product {
  remote_product_id;
  store_id;
  event_type;
  product_name;
  price;
  price_origin;
  product_image;
  // start_date
  // end_date
  is_display = "y";
  view_count = 0;
  constructor(
    store_id,
    remote_product_id,
    product_name,
    product_image,
    price,
    event_type
  ) {
    this.store_id = store_id;
    this.remote_product_id = remote_product_id;
    this.event_type = event_type;
    this.product_name = product_name;
    this.price = price;
    this.price_origin = price;
    this.product_image = product_image;
  }
}
