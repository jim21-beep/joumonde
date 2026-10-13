update public.products p
set price = v.price
from (values
  ('wollmantel', 890.00),
  ('klassischer-blazer', 490.00),
  ('strickpullover', 249.00),
  ('jeans', 199.00),
  ('bundfalthose', 219.00),
  ('leinenhose', 179.00),
  ('elegante-weste', 189.00),
  ('oxford-hemd', 159.00),
  ('quarter-zipper', 169.00),
  ('oversized-hoodie', 169.00),
  ('trainerhose', 139.00),
  ('polo-hemd', 109.00),
  ('t-shirt', 79.00)
) as v(slug, price)
where p.slug = v.slug;

update public.products p set price = v.price from (values ('kaschmirpullover', 439.00), ('cargo-pants', 209.00), ('knit-zip-polo', 179.00), ('lederguertel', 129.00)) as v(slug, price) where p.slug = v.slug;
