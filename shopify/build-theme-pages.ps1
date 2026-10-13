$root = Split-Path $PSScriptRoot -Parent
$pub = Join-Path $root 'public'
$snip = Join-Path $PSScriptRoot 'theme\snippets'
$utf8 = New-Object System.Text.UTF8Encoding($false)

$linkMap = [ordered]@{
  'versand.html' = '/pages/versand'
  'agb.html' = '/pages/agb'
  'faq.html' = '/pages/faq'
  'about.html' = '/pages/about'
  'impressum.html' = '/pages/impressum'
  'cookie-policy.html' = '/pages/cookie-policy'
  'shop.html' = '/collections/all'
}

foreach ($name in 'agb','faq','versand','impressum','cookie-policy') {
  $html = [IO.File]::ReadAllText((Join-Path $pub "$name.html"), $utf8)
  $m = [regex]::Match($html, '<main[^>]*>(.*?)</main>', 'Singleline')
  if (-not $m.Success) { Write-Warning "$name : kein main"; continue }
  $c = $m.Groups[1].Value
  $c = [regex]::Replace($c, '<script.*?</script>', '', 'Singleline')
  $c = [regex]::Replace($c, '<form.*?</form>', '<p>Für Retouren schreibe uns an <a href="mailto:support@joumonde.com">support@joumonde.com</a> mit deiner Bestellnummer.</p>', 'Singleline')
  foreach ($k in $linkMap.Keys) { $c = $c.Replace("href=""$k", "href=""$($linkMap[$k])") }
  $c = $c -replace '\sstyle="[^"]*"', ''
  $c = $c -replace '\sonclick="[^"]*"', ''
  $c = [regex]::Replace($c, '<details>\s*<summary>[^<]*Nexara.*?</details>', '', 'Singleline')
  $c = $c.Replace('href="account.html"', 'href="/account"')
  $c = $c.Replace('<a href="newsletter-unsubscribe.html">joumonde.com/newsletter-unsubscribe</a>', '<a href="mailto:support@joumonde.com">support@joumonde.com</a>')
  $c = $c.Replace('Supabase (Datenbankdienst, Server in der EU)', 'Shopify (Shop-System, Zahlungsabwicklung und Datenverwaltung)')
  [IO.File]::WriteAllText((Join-Path $snip "page-$name.liquid"), "{% raw %}`n$($c.Trim())`n{% endraw %}`n", $utf8)
}

$about = @'
{% raw %}
<header class="site-info-hero"><h1>Über Joumonde</h1><p>Wo Eleganz auf Komfort trifft</p></header>
<div class="site-info-content">
<h2>Wo Eleganz auf Komfort trifft</h2>
<h3>Unsere Geschichte</h3>
<p>Joumonde wurde 2025 mit der Vision gegründet, zeitlose Eleganz mit komfortabler Casual-Mode zu verbinden. Unser Name vereint das französische "Jour" (Tag) mit "Monde" (Welt): jeden Tag die Welt der Mode neu interpretieren.</p>
<p>Wir glauben an Qualität, Nachhaltigkeit und zeitloses Design. Jedes unserer Stücke wird sorgfältig ausgewählt und kombiniert Old Money Ästhetik mit komfortablem Casual-Stil.</p>
<h3>Unsere Mission</h3>
<p>Bei Joumonde geht es nicht nur um Mode, sondern um einen Lifestyle. Wir möchten Menschen dabei helfen, ihren individuellen Stil zu finden und sich selbstbewusst zu fühlen, ob im Business-Meeting oder beim Street-Festival.</p>
<p>Unsere Kollektionen werden von den besten Manufakturen produziert, mit Fokus auf faire Arbeitsbedingungen und nachhaltige Materialien. Premium-Qualität bedeutet für uns nicht nur erstklassige Stoffe, sondern auch Verantwortung gegenüber Mensch und Umwelt.</p>
<h3>Unsere Werte</h3>
<ul>
<li><strong>Premium Qualität:</strong> Hochwertige Materialien und erstklassige Verarbeitung für langlebige Fashion-Pieces.</li>
<li><strong>Nachhaltigkeit:</strong> Verantwortungsvolle Produktion, faire Arbeitsbedingungen und umweltbewusste Materialauswahl.</li>
<li><strong>Kundenservice:</strong> Persönliche Beratung, schneller Versand und erstklassiger Support.</li>
<li><strong>Zeitloses Design:</strong> Klassische Eleganz trifft moderne Trends, Mode die nicht mit der Saison verschwindet.</li>
</ul>
<h3>Folge uns auf Instagram</h3>
<p>Entdecke unsere neuesten Styles und werde Teil der Joumonde Community: <a href="https://instagram.com/joumonde" target="_blank" rel="noopener">@joumonde</a></p>
</div>
{% endraw %}
'@
[IO.File]::WriteAllText((Join-Path $snip 'page-about.liquid'), $about, $utf8)
Get-ChildItem $snip -Filter page-* | % { "$($_.Name) $($_.Length)" }
