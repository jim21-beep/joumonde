# Product inventory

## Setup

Run `supabase/migrations/20261008100000_product_catalog_inventory.sql` in the Supabase SQL Editor. It creates:

- `products`: the catalog entry and collection for each product currently shown in the shop.
- `product_variants`: each size/color combination, with `stock_quantity` for its available units.

The migration seeds the current shop products and their selectable variants. Stock starts as `NULL` intentionally; it means no exact quantity is being tracked, and the storefront labels the item as `Vorverkauf`. Do not replace it with an estimated quantity. If quantities are tracked later, enter the actual count for each variant in the Supabase Table Editor.

The `product_reviews` table is separate. If it is not present yet, run `supabase/product-reviews-migration.sql` as well; it is also defined in `supabase/schema.sql`.

Run `supabase/migrations/20261008113000_order_item_preorders.sql` too, to add the `is_preorder` flag to saved order items.
Redeploy the updated existing Edge Function with `supabase functions deploy send-newsletter-confirmation`.

The storefront displays inventory only on the product detail page after a customer opens a product. It shows the exact size/color count when known. A `NULL` count enables an unlimited pre-order and shows `Vorverkauf` with a `Vorbestellen` button. A known zero count is displayed as sold out and disables ordering for that variant.

## Important

Pre-orders are saved and identified on their order items, and the confirmation email identifies them as pre-orders. The current checkout does not integrate a payment provider, so no payment is collected. The delivery date must be confirmed separately. Orders do not decrement `product_variants.stock_quantity` automatically.
