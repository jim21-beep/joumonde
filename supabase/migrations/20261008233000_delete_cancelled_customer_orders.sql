create or replace function public.cancel_customer_order(p_order_id text)
returns table (
    cancelled_order_id text,
    new_status text,
    new_payment_status text
)
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_order public.orders%rowtype;
begin
    if auth.uid() is null then
        raise exception 'Authentication required' using errcode = '28000';
    end if;

    select *
    into v_order
    from public.orders
    where id = p_order_id
      and user_id = auth.uid()
    for update;

    if not found then
        raise exception 'Order not found for this customer' using errcode = 'P0002';
    end if;

    if v_order.status in ('Storniert', 'cancelled') then
        if v_order.payment_status not in ('pending', 'failed') then
            raise exception 'A cancelled order with a recorded payment cannot be deleted' using errcode = '55000';
        end if;

        delete from public.order_items
        where order_id = v_order.id;

        delete from public.orders
        where id = v_order.id;

        return query select v_order.id, 'Storniert'::text, v_order.payment_status;
        return;
    end if;

    if v_order.status not in ('Bearbeitung', 'pending', 'processing')
       or v_order.payment_status not in ('pending', 'failed') then
        raise exception 'Order is not eligible for cancellation' using errcode = '55000';
    end if;

    delete from public.order_items
    where order_id = v_order.id;

    delete from public.orders
    where id = v_order.id;

    return query select v_order.id, 'Storniert'::text, v_order.payment_status;
end;
$$;

revoke all on function public.cancel_customer_order(text) from public, anon;
grant execute on function public.cancel_customer_order(text) to authenticated;
