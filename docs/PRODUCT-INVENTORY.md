# Product inventory

## Setup

Run `supabase/migrations/20261008100000_product_catalog_inventory.sql` in the Supabase SQL Editor. It creates:

- `products`: the catalog entry and collection for each product currently shown in the shop.
- `product_variants`: each size/color combination, with `stock_quantity` for its available units.

The migration seeds the current shop products and their selectable variants. Stock starts as `NULL` intentionally; it means no exact quantity is being tracked. The storefront labels this as `Bestand nicht erfasst`, but the variant can still be ordered. Do not replace it with an estimated quantity. If quantities are tracked later, enter the actual count for each variant in the Supabase Table Editor.

The `product_reviews` table is separate. If it is not present yet, run `supabase/product-reviews-migration.sql` as well; it is also defined in `supabase/schema.sql`.

Redeploy the updated existing Edge Function with `supabase functions deploy send-newsletter-confirmation`.

The storefront displays inventory only on the product detail page after a customer opens a product. It shows the exact size/color count when known. A `NULL` count permits a normal order without a quantity limit beyond the storefront's standard per-order cap. A known zero count is displayed as sold out and disables ordering for that variant.

## Important

The current checkout does not integrate a payment provider, so no payment is collected. Orders do not decrement `product_variants.stock_quantity` automatically.
