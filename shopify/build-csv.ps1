$root = Split-Path $PSScriptRoot -Parent
$de = Get-Content (Join-Path $root 'public\assets\locales\de.json') -Raw -Encoding UTF8 | ConvertFrom-Json
$base = 'https://joumonde.com/assets/images/'

# Name, handle, Typ, Preis, Bild, Farben, Groessen
$products = @(
  @('Klassischer Blazer','klassischer-blazer','Old Money',490,'klassischer Blazer.jpg',@('Navy','Schwarz','Grau','Beige','Burgundy','Camel'),@('S','M','L','XL')),
  @('Polo Hemd','polo-hemd','Old Money',109,'PoloCasual.jpg',@('Weiß','Navy','Schwarz','Grau','Camel'),@('S','M','L','XL')),
  @('Knit Zip-Polo','knit-zip-polo','Old Money',179,'ripped knit zip-polo.jpg',@('Beige','Weiß','Schwarz'),@('S','M','L','XL')),
  @('Bundfalthose','bundfalthose','Old Money',219,'Bundfalthose.jpg',@('Beige','Camel','Navy','Grau','Olive'),@('30','32','34','36')),
  @('Elegante Weste','elegante-weste','Old Money',189,'Weste.jpg',@('Creme','Navy','Grau','Schwarz'),@('S','M','L','XL')),
  @('Quarter Zipper','quarter-zipper','Old Money',169,'Quarter Zipper.jpg',@('Creme','Navy','Grau','Schwarz'),@('S','M','L','XL')),
  @('Strickpullover','strickpullover','Old Money',249,'Strickpullover.jpg',@('Dunkelblau','Weiß','Grau','Beige'),@('S','M','L','XL')),
  @('Leinenhose','leinenhose','Old Money',179,'Leinenhose.jpg',@('Beige','Weiß','Hellgrau','Navy'),@('30','32','34','36')),
  @('Kaschmirpullover','kaschmirpullover','Old Money',439,'Kaschmirpullover.jpg',@('Creme','Dunkelblau','Grau'),@('S','M','L','XL')),
  @('Oxford Hemd','oxford-hemd','Old Money',159,'oxfordhemd.jpg',@('Weiß','Hellblau'),@('S','M','L','XL')),
  @('Wollmantel','wollmantel','Old Money',890,'Wollmantel.jpg',@('Camel','Navy','Grau'),@('S','M','L','XL')),
  @('Oversized Hoodie','oversized-hoodie','Casual',169,'Hoodie.jpg',@('Schwarz','Weiß','Grau','Navy','Olive','Beige'),@('S','M','L','XL')),
  @('T-Shirt','t-shirt','Casual',79,'T-Shirt.jpg',@('Schwarz','Weiß','Grau','Navy','Olive','Beige'),@('S','M','L','XL')),
  @('Cargo Pants','cargo-pants','Casual',209,'',@('Schwarz','Weiß','Grau','Navy','Olive','Beige'),@('30','32','34','36')),
  @('Jeans','jeans','Casual',199,'Jeans.jpg',@('Dunkelblau','Hellblau','Schwarz'),@('30','32','34','36')),
  @('Trainerhose','trainerhose','Casual',139,'Trainerhose.jpg',@('Schwarz','Weiß','Grau','Navy','Olive','Beige'),@('S','M','L','XL')),
  @('Ledergürtel','lederguertel','Accessoires',129,'Ledergürtel.jpg',@('Dunkelbraun'),@('One Size'))
)

function Enc($s) { [System.Net.WebUtility]::HtmlEncode($s) }
function Ul($items) { '<ul>' + (($items | ForEach-Object { '<li>' + (Enc $_) + '</li>' }) -join '') + '</ul>' }

$rows = New-Object System.Collections.Generic.List[object]
foreach ($p in $products) {
  $name, $handle, $type, $price, $img, $colors, $sizes = $p
  $d = $de.productDescriptions.$name
  $body = '<p>' + (Enc $d.description) + '</p>'
  if ($d.features) { $body += '<h4>Details</h4>' + (Ul $d.features) }
  if ($d.materials) { $body += '<h4>Material</h4>' + (Ul $d.materials) }
  if ($d.care) { $body += '<h4>Pflege</h4>' + (Ul $d.care) }
  $imgUrl = ''
  if ($img) { $imgUrl = $base + [uri]::EscapeDataString($img) }
  $first = $true
  foreach ($c in $colors) {
    foreach ($s in $sizes) {
      $sku = ($handle + '-' + $c + '-' + $s).ToUpper() -replace '[^A-Z0-9]+', '-'
      $rows.Add([pscustomobject][ordered]@{
        'Handle' = $handle
        'Title' = $(if ($first) { $name } else { '' })
        'Body (HTML)' = $(if ($first) { $body } else { '' })
        'Vendor' = $(if ($first) { 'Joumonde' } else { '' })
        'Product Category' = ''
        'Type' = $(if ($first) { $type } else { '' })
        'Tags' = $(if ($first) { "$type, Premium" } else { '' })
        'Published' = $(if ($first) { 'TRUE' } else { '' })
        'Option1 Name' = 'Farbe'
        'Option1 Value' = $c
        'Option2 Name' = 'Größe'
        'Option2 Value' = $s
        'Variant SKU' = $sku
        'Variant Grams' = 0
        'Variant Inventory Tracker' = 'shopify'
        'Variant Inventory Qty' = 10
        'Variant Inventory Policy' = 'deny'
        'Variant Fulfillment Service' = 'manual'
        'Variant Price' = ('{0:0.00}' -f $price)
        'Variant Requires Shipping' = 'TRUE'
        'Variant Taxable' = 'TRUE'
        'Image Src' = $(if ($first) { $imgUrl } else { '' })
        'Image Position' = $(if ($first -and $imgUrl) { 1 } else { '' })
        'Image Alt Text' = $(if ($first -and $imgUrl) { $name } else { '' })
        'Gift Card' = $(if ($first) { 'FALSE' } else { '' })
        'SEO Title' = $(if ($first) { "$name | Joumonde" } else { '' })
        'SEO Description' = $(if ($first) { $d.description.Substring(0, [Math]::Min(155, $d.description.Length)) } else { '' })
        'Status' = $(if ($first) { 'active' } else { '' })
      })
      $first = $false
    }
  }
}

$out = Join-Path $PSScriptRoot 'shopify-products.csv'
$rows | Export-Csv -Path $out -NoTypeInformation -Encoding UTF8
"Zeilen: $($rows.Count)  Produkte: $($products.Count)  Datei: $out"
