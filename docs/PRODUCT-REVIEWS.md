# Product Reviews

## Setup

1. Run `supabase/product-reviews-migration.sql` in the Supabase SQL Editor.
2. Deploy the Edge Function with `supabase functions deploy product-reviews`.
3. Keep the service-role key server-side only. The function uses it to verify purchases and insert pending reviews; clients have no review write policy.
4. Assign `app_metadata.role = "admin"` to trusted staff accounts in Supabase Auth. The backend order-status endpoint now requires this role before it can mark an order delivered.

## Review eligibility

A review is accepted only for the signed-in account that owns an order containing that exact product, where the order has `payment_status = 'paid'`, a non-null `provider_payment_id`, and a delivered status. The buyer cannot self-certify a purchase or select another user's order.

The current checkout does not integrate a payment provider, so it now stores orders as `pending` and cannot unlock reviews yet. A trusted payment webhook must set the payment status and provider transaction ID; an admin can then set the delivered status. Do not mark test or unpaid orders as paid.

## Moderation

The function rejects short or oversized content, links, email addresses, repeated-character spam, and configured blocked terms. `REVIEW_BLOCKED_TERMS` may be set as a pipe-separated Edge Function secret to extend the default profanity filter.

Accepted reviews are saved with `status = 'pending'` and are not public. Review the `product_reviews` table in Supabase and change only appropriate entries to `approved`; reject unsuitable entries by setting `status = 'rejected'`. The public review list can read approved entries only.
