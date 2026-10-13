// Product Descriptions Database
const productDatabase = {
    'Klassischer Blazer': {
        description: 'Die Neuerfindung des Tailorings für den modernen Alltag. Dieser Blazer verzichtet auf steife Schulterpolster und starre Einlagen, um der natürlichen Schulterlinie zu folgen. Das Ergebnis ist ein Sakko, das sich so bequem trägt wie ein Cardigan, aber die Autorität eines klassischen Massanzugs ausstrahlt. Gefertigt aus 100 % reiner Merinowolle, ist er das perfekte Fundament für den nahtlosen Übergang vom Büro zum Dinner.',
        features: [
            'Leichter Merino-Wollflanell, ganzjährig tragbar',
            'Unkonstruiert, ohne steife Schulterpolster',
            'Aufgesetzte Taschen',
            'Halbes Innenfutter'
        ],
        materials: [
            'Oberstoff: 100 % leichter Merino-Wollflanell (ganzjährig tragbar)',
            'Konstruktion: Unkonstruiert (ohne steife Schulterpolster) für eine natürliche Silhouette',
            'Details: Aufgesetzte Taschen für einen entspannteren Look, halbes Innenfutter'
        ],
        care: [
            'Chemische Reinigung empfohlen',
            'Nicht waschen und nicht im Tumbler trocknen',
            'Nach dem Tragen auslüften und auf einem Kleiderbügel aufhängen',
            'Bei Bedarf sanft ausbürsten',
            'Mit Dampf auf Abstand glätten, nicht direkt bügeln'
        ]
    },
    'Polo Hemd': {
        description: 'Der Klassiker, befreit von lauten Logos. Unser Polo Hemd fokussiert sich rein auf Schnitt und Materialqualität. Der speziell konstruierte Kragen behält den ganzen Tag über seine Form und klappt nicht unschön zusammen. Eine makellose Passform an Schultern und Armen macht dieses Polo zur ersten Wahl für ein smartes, müheloses Auftreten.',
        features: [
            'Dicht gewebte Piqué-Baumwolle oder feiner Merino-Strick',
            'Nahtloser One-Piece-Kragen',
            'Kein gesticktes Logo',
            'Makellose Passform an Schultern und Armen'
        ],
        materials: [
            'Oberstoff: Dicht gewebte Piqué-Baumwolle oder feiner Merino-Strick',
            'Kragen: Nahtloser Kragen (One-Piece Collar) für einen eleganten Stand',
            'Branding: Unsichtbarer Luxus, kein gesticktes Logo auf der Brust'
        ],
        care: [
            'Piqué-Baumwolle: Maschinenwäsche bei 30°C, auf links waschen',
            'Merino-Strick: Wollwaschgang und flach trocknen',
            'Nicht im Tumbler trocknen',
            'Bei niedriger bis mittlerer Temperatur bügeln'
        ]
    },
    'Knit Zip-Polo': {
        description: 'Die moderne Interpretation der "Old Money"-Ästhetik. Das Knit Zip-Polo schlägt die perfekte Brücke zwischen der Formalität eines Hemdes und dem Komfort eines Pullovers. Gefertigt aus extrafeiner Merinowolle, bietet es eine cleane, strukturierte Silhouette, die sich der Körpertemperatur anpasst. Der markante Metall-Reissverschluss setzt einen kühlen, architektonischen Akzent. Das ideale Piece für das Office, den Abend und alles dazwischen.',
        features: [
            'Extrafeine Merinowolle',
            'YKK 1/4 Metall-Reissverschluss',
            'Strukturierter Polokragen in Feinstrick',
            'Ton-in-Ton Joumonde-Stickerei'
        ],
        materials: [
            'Oberstoff: 100 % extrafeine Merinowolle (atmungsaktiv und temperaturregulierend)',
            'Hardware: YKK 1/4 Metall-Reissverschluss in mattem Silber/Gunmetal-Finish',
            'Kragen: Strukturierter, formstabiler Polokragen in Feinstrick',
            'Branding: Ton-in-Ton Joumonde-Stickerei, 3 cm über dem linken Ärmelbündchen'
        ],
        care: [
            'Wollwaschgang bei 30°C mit Wollwaschmittel',
            'Reissverschluss schliessen und auf links waschen',
            'Flach liegend trocknen',
            'Nicht im Tumbler trocknen',
            'Nicht bleichen',
            'Bei niedriger Temperatur bügeln'
        ]
    },
    'Bundfalthose': {
        description: 'Die Brücke zwischen traditioneller Schneiderkunst und modernem Casual-Chic. Die doppelte Bundfalte verleiht dieser Hose nicht nur einen markanten, klassischen Charakter, sondern sorgt auch für aussergewöhnlichen Bewegungsfreiraum. Durch die seitlichen Adjusters aus Metall sitzt der Bund immer perfekt, ganz ohne Gürtel. Ein Hosen-Design, das Haltung beweist.',
        features: [
            'Doppelte Bundfalte',
            'Side-Adjusters statt Gürtel',
            'Elegant zulaufender Tapered Schnitt',
            'Schwerer Baumwoll-Twill oder feine Schurwolle'
        ],
        materials: [
            'Oberstoff: Schwerer, dicht gewebter Baumwoll-Twill oder feine Schurwolle',
            'Bund: Side-Adjusters (seitliche Schnallen zur Weitenregulierung), kein Gürtel nötig',
            'Schnitt: Doppelte Bundfalte (Double Pleat) für mehr Volumen am Oberschenkel, nach unten hin elegant zulaufend (Tapered)'
        ],
        care: [
            'Schurwolle: chemische Reinigung',
            'Baumwoll-Twill: Maschinenwäsche bei 30°C, auf links waschen',
            'Nicht im Tumbler trocknen, hängend trocknen',
            'Mit Dampf oder bei mittlerer Temperatur bügeln, Bundfalten nachformen'
        ]
    },
    'Elegante Weste': {
        description: 'Das ultimative Layering-Piece. Diese Weste bringt architektonische Struktur in jedes Outfit. Unter dem passenden Blazer getragen, komplettiert sie den sartorialen Look; über einem schlichten Oxford-Hemd oder T-Shirt wird sie zum eigenständigen Stil-Statement. Der verstellbare Riegel am Rücken aus fliessendem Cupro garantiert eine messerscharfe, massgeschneiderte Passform.',
        features: [
            'Merino-Wollflanell, passend zum Blazer',
            'Rückenteil aus Cupro mit verstellbarem Riegel',
            'Massive Metallschnalle',
            'Farblich abgestimmte Hornknöpfe'
        ],
        materials: [
            'Oberstoff Front: 100 % Merino-Wollflanell (exakt passend zum Blazer)',
            'Rückenteil: 100 % Cupro mit verstellbarem Riegel und massiver Metallschnalle',
            'Knöpfe: Farblich abgestimmte Hornknöpfe'
        ],
        care: [
            'Chemische Reinigung empfohlen',
            'Nicht waschen und nicht im Tumbler trocknen',
            'Auf einem Kleiderbügel aufhängen',
            'Nicht bleichen',
            'Bei niedriger Temperatur mit Tuch dazwischen bügeln'
        ]
    },
    'Quarter Zipper': {
        description: 'Die sportliche Seite des "Old Money"-Lifestyles. Der Quarter Zipper verbindet den Komfort von schwerem French Terry mit einem scharfen, architektonischen Kragen. Der markante Metall-Reissverschluss und der edle Leder-Puller setzen haptische Akzente, die dieses Piece von herkömmlicher Loungewear abheben. Perfekt über einem T-Shirt oder Hemd zu tragen.',
        features: [
            '450 g/m² Heavyweight French Terry',
            'YKK 1/4 Metall-Reissverschluss',
            'Echtleder-Puller',
            'Formstabiler Stehkragen'
        ],
        materials: [
            'Oberstoff: 450 g/m² Heavyweight French Terry Baumwolle',
            'Hardware: YKK 1/4 Metall-Reissverschluss mit Echtleder-Puller',
            'Kragen: Formstabiler Stehkragen mit glatter Innenseite'
        ],
        care: [
            'Maschinenwäsche bei 30°C, auf links waschen',
            'Reissverschluss schliessen und Leder-Puller von Nässe fernhalten',
            'Hängend oder flach trocknen, nicht im Tumbler',
            'Bei niedriger Temperatur bügeln'
        ]
    },
    'Strickpullover': {
        description: 'Schwer, strukturiert und kompromisslos hochwertig. Dieser Strickpullover ist für die kälteren Tage konzipiert und bietet einen festen, maskulinen Fall. Die voluminöse Rippstrick-Textur verleiht dem Piece eine unglaubliche Tiefe und Haptik, während die schwere Garnmischung die Körperwärme perfekt isoliert. Ein Pullover, der sich beim Tragen wie eine schützende Rüstung aus purem Komfort anfühlt.',
        features: [
            'Heavyweight Baumwoll-Merino-Blend',
            'Markantes, grobes Strickmuster',
            'Verstärkte Rippstrick-Bündchen',
            'Kratzfrei und formstabil'
        ],
        materials: [
            'Oberstoff: Heavyweight Baumwoll-Merino-Blend (kratzfrei, schwer und formstabil)',
            'Textur: Markantes, grobes Strickmuster (z. B. Fisherman\'s Rib)',
            'Bündchen: Verstärkte Rippstrick-Bündchen, die nicht ausleiern'
        ],
        care: [
            'Wollwaschgang bei 30°C mit Wollwaschmittel, auf links waschen',
            'Nicht wringen',
            'Flach liegend trocknen, nicht aufhängen',
            'Nicht im Tumbler trocknen',
            'Nicht direkt bügeln, bei Bedarf mit Dampf auf Abstand glätten'
        ]
    },
    'Leinenhose': {
        description: 'Komfort ohne Kompromisse bei der Ästhetik. Gefertigt aus schwerem, atmungsaktivem Leinen, ist diese Hose die perfekte Antwort auf warme Temperaturen. Das Material wurde sanft vorgewaschen, um eine sofortige Weichheit und den charakteristischen, entspannten "Quiet Luxury"-Faltenwurf zu garantieren. Perfekt in Kombination mit Loafern und einem lockeren Hemd.',
        features: [
            'Schweres, vorgewaschenes Leinen',
            'Verdeckte Knopfleiste mit echten Hornknöpfen',
            'Relaxed Straight Leg',
            'Edler, entspannter Faltenwurf'
        ],
        materials: [
            'Oberstoff: 100 % schweres, vorgewaschenes Leinen (knittert edel, nicht unruhig)',
            'Verschluss: Verdeckte Knopfleiste mit echten Hornknöpfen',
            'Schnitt: Relaxed Straight Leg für maximale Luftzirkulation'
        ],
        care: [
            'Maschinenwäsche bei 30°C im Schonwaschgang',
            'Mit ähnlichen Farben waschen',
            'Hängend trocknen, nicht im Tumbler',
            'Leinen darf knittern, bei Bedarf feucht bei hoher Temperatur bügeln'
        ]
    },
    'Oversized Hoodie': {
        description: 'Der ultimative Heavyweight-Hoodie. Wir haben den klassischen Kapuzenpullover genommen und jedes Detail auf Premium-Niveau gehoben. Das 450-Gramm-Gewebe sorgt für einen perfekten, leicht kastigen Fall. Die doppellagige Kapuze liegt voluminös im Nacken, und das weiche Waffelstrick-Futter in der Kängurutasche ist ein Detail purer Handwerkskunst, das nur der Träger spürt.',
        features: [
            '450 g/m² Heavyweight French Terry',
            'Doppellagige Kapuze',
            'Kängurutasche mit Waffelstrick-Innenseite',
            'Leicht kastiger Fall'
        ],
        materials: [
            'Oberstoff: 450 g/m² Heavyweight French Terry Baumwolle',
            'Kapuze: Doppellagig verarbeitet für einen massiven, formschönen Stand im Nacken',
            'Details: Innenseite der Kängurutasche aus weichem Waffelstrick'
        ],
        care: [
            'Maschinenwäsche bei 30°C, auf links waschen',
            'Mit ähnlichen Farben waschen',
            'Im Tumbler bei niedriger Temperatur oder hängend trocknen',
            'Bei niedriger Temperatur bügeln'
        ]
    },
    'T-Shirt': {
        description: 'Das perfekte T-Shirt existiert. Wir haben die Jagd nach dem idealen Basic beendet. Mit einem Gewicht von 250 g/m² fällt dieses T-Shirt schwer und strukturiert, zeichnet nichts ab und behält auch nach unzähligen Wäschen seine exakte Form. Der eng anliegende, robuste Kragen rahmt das Gesicht perfekt ein. Kein Unterhemd, sondern ein eigenständiges Statement-Piece.',
        features: [
            '250 g/m² Heavyweight Jersey',
            'Absolut blickdicht',
            'Enger Rippstrick-Kragen, der nicht ausleiert',
            'Schlauchware ohne störende Seitennähte'
        ],
        materials: [
            'Oberstoff: 250 g/m² Heavyweight Jersey-Baumwolle (absolut blickdicht)',
            'Kragen: Dicht gewebter, enger Rippstrick-Kragen, der nicht ausleiert',
            'Konstruktion: Schlauchware (Tubular Knit) ohne störende Seitennähte'
        ],
        care: [
            'Maschinenwäsche bei 30°C, auf links waschen',
            'Mit ähnlichen Farben waschen',
            'Im Tumbler bei niedriger Temperatur oder hängend trocknen',
            'Bei mittlerer Temperatur bügeln'
        ]
    },
    'Cargo Pants': {
        description: 'Utility-Design trifft auf massgeschneiderte Eleganz. Diese Cargo Pants befreien den klassischen Workwear-Look von unnötigem Volumen. Der schwere Baumwoll-Twill sorgt für einen perfekten, geraden Fall, während die flach anliegenden, verdeckten Taschen maximale Funktionalität bei einer rasiermesserscharfen Silhouette bieten. Eine Hose, die nicht nach Aufmerksamkeit schreit, aber sofort zeigt, dass Wert auf absolute Struktur und Premium-Verarbeitung gelegt wurde.',
        features: [
            'Heavyweight Baumwoll-Twill',
            'Verdeckte YKK-Reissverschlüsse an den Taschen',
            'Flache, nahtintegrierte Cargo-Taschen',
            'Straight Leg mit leicht verjüngtem Beinabschluss'
        ],
        materials: [
            'Oberstoff: Schwerer 100 % Baumwoll-Twill (Heavyweight Cotton Twill, ca. 350 g/m²)',
            'Hardware: Verdeckte YKK-Reissverschlüsse an den Taschen, robuster Metallknopf am Bund',
            'Taschen: Nahtintegrierte, flache Cargo-Taschen ohne voluminöse Klappen für eine reduzierte Silhouette',
            'Schnitt: Straight Leg mit leicht verjüngtem Beinabschluss'
        ],
        care: [
            'Maschinenwäsche bei 30°C, auf links waschen',
            'Reissverschlüsse und Knopf vor dem Waschen schliessen',
            'Mit ähnlichen Farben waschen',
            'Im Tumbler bei niedriger Temperatur oder hängend trocknen',
            'Bei mittlerer Temperatur bügeln'
        ]
    },
    'Trainerhose': {
        description: 'Loungewear, die den Raum dominiert. Diese Trainerhose wird aus demselben schweren Stoff gefertigt wie unser Signature Hoodie. Sie fällt durch das Gewicht der Baumwolle extrem gerade und sauber, ohne an den Knien auszubeulen. Die dicken Kordeln mit schweren Messingkappen werten das Design auf, sodass die Hose nicht nur auf der Couch, sondern auch auf der Strasse eine perfekte Figur macht.',
        features: [
            '450 g/m² Heavyweight French Terry',
            'Dicke Baumwollkordeln mit Messing-Enden',
            'Breite, elastische Rippstrick-Bündchen',
            'Gerader, sauberer Fall'
        ],
        materials: [
            'Oberstoff: 450 g/m² Heavyweight French Terry (passend zum Hoodie)',
            'Kordeln: Gedrehte, dicke Baumwollkordeln mit massiven Messing-Enden',
            'Bündchen: Breite, elastische Rippstrick-Bündchen am Beinabschluss'
        ],
        care: [
            'Maschinenwäsche bei 30°C, auf links waschen',
            'Mit ähnlichen Farben waschen',
            'Im Tumbler bei niedriger Temperatur oder hängend trocknen',
            'Bei niedriger Temperatur bügeln'
        ],
    'Jeans': {
        description: 'Authentisches Denim-Handwerk in seiner reinsten Form. Diese Jeans verzichtet bewusst auf künstliches Elasthan und setzt stattdessen auf echten, schweren Selvedge-Denim, der sich mit der Zeit perfekt an deinen Körper und deine Bewegungen anpasst. Ein gerader, kompromissloser Schnitt, der eine extrem cleane Silhouette formt. Eine Jeans, die man eintragen muss, um sie danach nie wieder ausziehen zu wollen.',
        features: [
            '12.5 oz Rigid Selvedge Denim',
            'Ohne künstlichen Stretch',
            'Massive Kupfernieten',
            'Gerader, cleaner Schnitt'
        ],
        materials: [
            'Oberstoff: 12.5 oz Rigid Selvedge Denim (100 % Baumwolle, kein künstlicher Stretch)',
            'Waschung: Sanfter Rinse-Wash (weichgemacht, aber farblich tief)',
            'Hardware: Massive Kupfernieten und gravierter Metall-Knopf'
        ],
        care: [
            'Maschinenwäsche bei 30°C, auf links waschen',
            'Die ersten Wäschen separat waschen, da Selvedge-Denim abfärben kann',
            'Möglichst selten waschen, um Farbe und Passform zu erhalten',
            'Nicht im Tumbler trocknen, hängend trocknen',
            'Bei mittlerer Temperatur bügeln'
        ]
    },
    'Kaschmirpullover': {
        description: 'Ein Meisterwerk des Understatements. Dieser Pullover wird aus feinstem, zweifädigem Kaschmir gestrickt, das unvergleichliche Weichheit mit robuster Langlebigkeit kombiniert. Der Schnitt ist entspannt, aber präzise und entworfen, um elegant über einem Oxford-Hemd oder komfortabel zur Bundfaltenhose zu fallen. Ein kompromissloses Investitionsstück, das mit den Jahren nur noch charaktervoller wird. Keine sichtbaren Logos, nur fühlbarer Luxus.',
        features: [
            'Zweifädiges mongolisches Kaschmir',
            'Entspannter, präziser Schnitt',
            'Formstabile, fein gerippte Abschlüsse',
            'Keine sichtbaren Aussenlogos'
        ],
        materials: [
            'Oberstoff: 100 % reines, zweifädiges mongolisches Kaschmir (2-ply Garn für maximale Langlebigkeit und minimales Pilling)',
            'Bündchen: Formstabile, fein gerippte Abschlüsse an Ärmeln und Saum',
            'Branding: Kratzfreier Joumonde-Softprint im Nacken, keine sichtbaren Aussenlogos'
        ],
        care: [
            'Handwäsche bei 20°C oder Wollwaschgang mit mildem Wollwaschmittel',
            'Nicht wringen, Wasser nur sanft ausdrücken',
            'Flach liegend auf einem Handtuch trocknen',
            'Nicht im Tumbler trocknen',
            'Nicht bleichen',
            'Bei niedriger Temperatur und ohne Dampf bügeln'
        ]
    },
    'Ledergürtel': {
        description: 'Ein Accessoire, das nicht für eine Saison, sondern für ein ganzes Leben gemacht ist. Gefertigt aus kompromisslosem, pflanzlich gegerbtem Vollnarbenleder, entwickelt dieser Gürtel mit jedem Tragen eine einzigartige, persönliche Patina. Die schwere, gebürstete Messingschliesse unterstreicht den puristischen "Quiet Luxury"-Ansatz. Kein abblätterndes Kunstleder, keine billigen Beschläge, nur ehrliches, massives Handwerk, das jedes Outfit sofort aufwertet.',
        features: [
            'Pflanzlich gegerbtes Vollnarbenleder',
            'Massive, gebürstete Messingschliesse',
            'Handpolierte und gewachste Kanten',
            'Keine geklebten Schichten'
        ],
        materials: [
            'Hauptmaterial: 100 % pflanzlich gegerbtes Vollnarbenleder (Full-Grain Leather)',
            'Schliesse: Massive, gebürstete Messingschliesse (Solid Brass)',
            'Verarbeitung: Handpolierte und gewachste Kanten, keine geklebten Schichten'
        ],
        care: [
            'Nicht waschen',
            'Mit einem trockenen, weichen Tuch abwischen',
            'Gelegentlich mit farblosem Lederpflegebalsam pflegen',
            'Vor Nässe, Hitze und direkter Sonne schützen',
            'Messingschliesse mit einem trockenen Tuch polieren'
        ]
    },
    'Wollmantel': {
        description: 'Ein Mantel, der Generationen überdauert. Durch den hohen Kaschmiranteil bietet dieser Wollmantel eine unvergleichliche Wärmeisolierung bei gleichzeitig weichem, elegantem Fall. Der Schnitt ist zeitlos und strukturiert, mit einem klassischen Revers, das formelle Outfits unterstreicht und Casual-Looks sofort aufwertet. Wahre Handwerkskunst zeigt sich in den Details: von den echten Hornknöpfen bis zum fliessenden Cupro-Futter. Ein absolutes Statement der unaufgeregten Eleganz.',
        features: [
            'Schwere Schurwolle mit Kaschmir',
            'Fliessendes Cupro-Futter',
            'Echte dunkle Hornknöpfe',
            'Klassisches Revers'
        ],
        materials: [
            'Oberstoff: 80 % schwere Schurwolle, 20 % Kaschmir für einen fliessenden, weichen Fall',
            'Futter: 100 % atmungsaktives Cupro (seidige Haptik, verhindert elektrostatisches Aufladen)',
            'Hardware: Echte, dunkle Hornknöpfe mit dezenter Maserung'
        ],
        care: [
            'Nur chemische Reinigung',
            'Nicht waschen und nicht im Tumbler trocknen',
            'Nach dem Tragen auslüften und auf einem breiten Bügel aufhängen',
            'Bei Bedarf sanft ausbürsten',
            'Falten mit Dampf auf Abstand glätten, nicht direkt bügeln'
        ]
    },
    'Oxford Hemd': {
        description: 'Das unerschütterliche Fundament jeder Garderobe. Unser Oxford-Hemd wird aus dicker Supima-Baumwolle gefertigt, die blickdicht ist und mit jeder Wäsche weicher wird, ohne ihre Form zu verlieren. Der charakteristische Button-Down-Kragen legt sich in einem perfekten Bogen um den Hals, während die echten Perlmuttknöpfe einen dezenten, aber unübersehbaren Hauch von Luxus versprühen.',
        features: [
            'Supima-Oxford-Gewebe',
            'Button-Down-Kragen mit perfektem Roll',
            'Perlmuttknöpfe',
            'Blickdicht und formstabil'
        ],
        materials: [
            'Oberstoff: Schweres, strukturvolles Supima-Oxford-Gewebe (100 % Baumwolle)',
            'Kragen: Klassischer Button-Down-Kragen mit perfektem "Roll" (Bogen)',
            'Knöpfe: Dicke, schimmernde Perlmuttknöpfe (Mother of Pearl)'
        ],
        care: [
            'Maschinenwäsche bei 40°C',
            'Knöpfe vor dem Waschen schliessen',
            'Im Tumbler bei niedriger Temperatur oder hängend trocknen',
            'Nicht bleichen',
            'Leicht feucht bei hoher Temperatur bügeln'
        ]
    }
};

window.updateProductDetailContent = function updateProductDetailContent(productData, localeData = {}) {
    if (!productData) return;

    const productName = typeof translateProductName === 'function'
        ? translateProductName(productData.name)
        : productData.name;
    const streetwearNames = new Set(['Oversized Hoodie', 'T-Shirt', 'Cargo Pants', 'Jeans', 'Trainerhose']);
    const accessoryNames = new Set(['Ledergürtel']);
    const collectionKey = productData.collection || (streetwearNames.has(productData.name) ? 'streetwear' : accessoryNames.has(productData.name) ? 'collectionAccessories' : 'oldMoney');
    const productInfo = localeData.productDescriptions?.[productData.name] || productDatabase[productData.name];

    document.title = `${productName} - Joumonde`;
    const title = document.querySelector('.product-detail-title');
    const subtitle = document.querySelector('.product-detail-subtitle');
    if (title) title.textContent = productName;
    if (subtitle) subtitle.textContent = productInfo?.description || productData.description || '';

    const breadcrumb = document.querySelector('.breadcrumb');
    const breadcrumbLinks = breadcrumb?.querySelectorAll('a');
    if (breadcrumbLinks?.[0]) breadcrumbLinks[0].textContent = t('productHome');
    if (breadcrumbLinks?.[1]) {
        breadcrumbLinks[1].textContent = t(collectionKey);
        const collectionAnchor = collectionKey === 'streetwear' ? 'streetwear' : collectionKey === 'collectionAccessories' ? 'accessories' : 'old-money';
        breadcrumbLinks[1].href = `shop.html#${collectionAnchor}`;
    }
    const breadcrumbProduct = breadcrumb?.querySelector('span:last-child');
    if (breadcrumbProduct) breadcrumbProduct.textContent = productName;

    const priceNote = document.querySelector('.price-vat');
    if (priceNote) priceNote.textContent = t('productPriceVat');
    const sizeLabel = document.querySelector('.product-detail-size label');
    if (sizeLabel?.firstChild?.nodeType === Node.TEXT_NODE) sizeLabel.firstChild.textContent = `${t('productSizeLabel')} `;
    const sizeGuideLink = document.querySelector('.size-guide-link-detail');
    if (sizeGuideLink) sizeGuideLink.textContent = t('productSizeGuide');
    const colorLabel = document.querySelector('.product-detail-color label');
    if (colorLabel?.firstChild?.nodeType === Node.TEXT_NODE) colorLabel.firstChild.textContent = `${t('productColorLabel')} `;
    const quantityLabel = document.querySelector('.product-detail-quantity label');
    if (quantityLabel) quantityLabel.textContent = t('productQuantityLabel');
    document.querySelector('.zoom-btn')?.setAttribute('aria-label', t('productZoom'));
    const quantityButtons = document.querySelectorAll('.quantity-selector button');
    if (quantityButtons[0]) quantityButtons[0].setAttribute('aria-label', t('productDecreaseQuantity'));
    if (quantityButtons[1]) quantityButtons[1].setAttribute('aria-label', t('productIncreaseQuantity'));
    const addToCartButton = document.querySelector('.btn-add-to-cart');
    const addToCartLabel = addToCartButton?.querySelector('[data-add-to-cart-label]');
    if (addToCartLabel) addToCartLabel.textContent = t('addToCart');
    window.updateSelectedVariantStock?.();
    document.querySelector('.btn-add-to-wishlist')?.setAttribute('aria-label', t('wishlistAria'));

    const mainImage = document.querySelector('#mainImage img');
    if (mainImage) mainImage.alt = productName;
    const firstThumbnailImage = document.querySelector('.thumbnail.active img');
    if (firstThumbnailImage) firstThumbnailImage.alt = productName;
    document.querySelectorAll('.thumbnail .product-placeholder').forEach((placeholder, index) => {
        placeholder.textContent = t('productImageLabel').replace('{number}', String(index + 1));
    });
    const mainImagePlaceholder = document.querySelector('#mainImage .product-placeholder');
    if (mainImagePlaceholder) mainImagePlaceholder.textContent = t('productMainImagePlaceholder');

    const selectedColor = document.getElementById('selectedColor');
    if (selectedColor && typeof translateColorName === 'function') selectedColor.textContent = translateColorName(selectedColor.textContent);
    document.querySelectorAll('.color-option').forEach(option => {
        const color = option.getAttribute('title');
        if (color && typeof translateColorName === 'function') {
            const translatedColor = translateColorName(color);
            option.title = translatedColor;
            option.setAttribute('aria-label', `${t('productColorLabel')} ${translatedColor}`);
        }
    });

    const featureKeys = ['productFeatureShipping', 'productFeatureReturns', 'productFeaturePayment'];
    document.querySelectorAll('.product-features .feature-item span').forEach((feature, index) => {
        if (featureKeys[index]) feature.textContent = t(featureKeys[index]);
    });
    const accordionKeys = ['productDescriptionTitle', 'productMaterialsCareTitle', 'productShippingReturnsTitle'];
    document.querySelectorAll('.product-details-accordion .accordion-header span').forEach((heading, index) => {
        if (accordionKeys[index]) heading.textContent = t(accordionKeys[index]);
    });
    const materialLabel = document.querySelector('#product-material-list')?.previousElementSibling?.querySelector('strong');
    const careLabel = document.querySelector('#product-care-list')?.previousElementSibling?.querySelector('strong');
    if (materialLabel) materialLabel.textContent = t('productMaterialLabel');
    if (careLabel) careLabel.textContent = t('productCareLabel');
    const shippingPolicyText = document.getElementById('shippingPolicyText');
    const shippingPolicyLink = document.getElementById('shippingPolicyLink');
    if (shippingPolicyText) shippingPolicyText.textContent = t('productShippingPolicyText');
    if (shippingPolicyLink) shippingPolicyLink.textContent = t('productShippingPolicyLink');

    if (productInfo) {
        const renderList = (selector, items) => {
            const list = document.querySelector(selector);
            if (!list || !Array.isArray(items)) return;
            list.replaceChildren(...items.map(text => {
                const item = document.createElement('li');
                item.textContent = text;
                return item;
            }));
        };
        const description = document.getElementById('product-main-description');
        if (description) description.textContent = productInfo.description;
        renderList('#product-features-list', productInfo.features);
        renderList('#product-material-list', productInfo.materials);
        renderList('#product-care-list', productInfo.care);
    }

    const reviewsTitle = document.querySelector('#reviews .section-title');
    const reviewsEmpty = document.getElementById('reviewsEmpty');
    const reviewEligibility = document.getElementById('reviewEligibility');
    const writeReviewButton = document.getElementById('writeReviewButton');
    if (reviewsTitle) reviewsTitle.textContent = t('reviewsTitle');
    if (reviewsEmpty) reviewsEmpty.textContent = t('reviewsEmpty');
    if (reviewEligibility) reviewEligibility.textContent = t('reviewAfterVerifiedDelivery');
    if (writeReviewButton) writeReviewButton.textContent = t('reviewButton');
    updateReviewControlsLanguage();
    const reviewModal = document.getElementById('review-modal');
    if (reviewModal) {
        const modalTitle = reviewModal.querySelector('h2');
        const ratingLabel = reviewModal.querySelector('.review-form .form-group > label');
        const titleInput = reviewModal.querySelector('input[name="title"]');
        const reviewInput = reviewModal.querySelector('textarea[name="reviewText"]');
        const submitButton = reviewModal.querySelector('button[type="submit"]');
        if (modalTitle) modalTitle.textContent = t('reviewFormTitle');
        if (ratingLabel) ratingLabel.textContent = t('reviewRatingLabel');
        if (titleInput) titleInput.placeholder = t('reviewTitlePlaceholder');
        if (reviewInput) reviewInput.placeholder = t('reviewTextPlaceholder');
        if (submitButton) submitButton.textContent = t('reviewSubmit');
    }

};

// Product Detail Page JavaScript

// Gallery Images
const galleryImages = [
    { background: 'linear-gradient(135deg, #f5f5dc 0%, #d3d3d3 100%)', alt: 'Bild 1' },
    { background: 'linear-gradient(135deg, #d3d3d3 0%, #a8a8a8 100%)', alt: 'Bild 2' },
    { background: 'linear-gradient(135deg, #c8c8c8 0%, #9c9c9c 100%)', alt: 'Bild 3' },
    { background: 'linear-gradient(135deg, #e0e0e0 0%, #b8b8b8 100%)', alt: 'Bild 4' }
];

let currentImageIndex = 0;

// Change Main Image
function changeMainImage(index) {
    currentImageIndex = index;
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    // Update main image
    mainImage.style.background = galleryImages[index].background;
    
    // Update active thumbnail
    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
        thumb.setAttribute('aria-pressed', String(i === index));
    });
}

// Open Image Zoom (full screen)
function openImageZoom() {
    const zoomOverlay = document.createElement('div');
    zoomOverlay.className = 'image-zoom-overlay';
    zoomOverlay.innerHTML = `
        <button class="zoom-close" onclick="this.parentElement.remove()">&times;</button>
        <div class="zoom-image" style="background: ${galleryImages[currentImageIndex].background};">
            <span class="product-placeholder">${galleryImages[currentImageIndex].alt}</span>
        </div>
        <div class="zoom-nav">
            <button onclick="zoomPrevImage()" ${currentImageIndex === 0 ? 'disabled' : ''}>‹</button>
            <span>${currentImageIndex + 1} / ${galleryImages.length}</span>
            <button onclick="zoomNextImage()" ${currentImageIndex === galleryImages.length - 1 ? 'disabled' : ''}>›</button>
        </div>
    `;
    document.body.appendChild(zoomOverlay);
    document.body.style.overflow = 'hidden';
}

// Zoom Navigation
function zoomPrevImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updateZoomImage();
    }
}

function zoomNextImage() {
    if (currentImageIndex < galleryImages.length - 1) {
        currentImageIndex++;
        updateZoomImage();
    }
}

function updateZoomImage() {
    const zoomImage = document.querySelector('.zoom-image');
    const zoomCounter = document.querySelector('.zoom-nav span');
    const prevBtn = document.querySelector('.zoom-nav button:first-of-type');
    const nextBtn = document.querySelector('.zoom-nav button:last-of-type');
    
    zoomImage.style.background = galleryImages[currentImageIndex].background;
    zoomImage.querySelector('.product-placeholder').textContent = galleryImages[currentImageIndex].alt;
    zoomCounter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
    
    prevBtn.disabled = currentImageIndex === 0;
    nextBtn.disabled = currentImageIndex === galleryImages.length - 1;
}

// Size Selection
let selectedSize = 'M';
function selectSize(size, button) {
    selectedSize = size;
    document.getElementById('selectedSize').textContent = size;
    
    // Update button states
    document.querySelectorAll('.size-option').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    window.updateSelectedVariantStock?.(selectedSize, selectedColor);
}

window.applyPreferredSizeToProductDetail = function applyPreferredSizeToProductDetail() {
    const sizeButtons = Array.from(document.querySelectorAll('.size-option'));
    if (sizeButtons.length === 0) return;

    const availableSizes = sizeButtons.map(button => button.textContent.trim());
    const usesPantsSizing = availableSizes.some(size => /^\d+$/.test(size));
    const preferredSize = usesPantsSizing
        ? localStorage.getItem('defaultPantsSize')
        : localStorage.getItem('defaultTopSize') || localStorage.getItem('defaultSize');
    const selectedButton = sizeButtons.find(button => button.textContent.trim() === preferredSize) || sizeButtons[0];
    selectSize(selectedButton.textContent.trim(), selectedButton);
};

// Color Selection
let selectedColor = 'Navy';
function selectColor(color, button) {
    selectedColor = color;
    document.getElementById('selectedColor').textContent = color;
    
    // Update button states
    document.querySelectorAll('.color-option').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    window.updateSelectedVariantStock?.(selectedSize, selectedColor);
}

// Quantity Selection
function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    if (currentValue < parseInt(quantityInput.max)) {
        quantityInput.value = currentValue + 1;
    }
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > parseInt(quantityInput.min)) {
        quantityInput.value = currentValue - 1;
    }
}

// Add to Cart from Detail Page
function getCanonicalDetailProductName() {
    const productData = JSON.parse(sessionStorage.getItem('selectedProduct') || 'null');
    return productData?.name || document.querySelector('.product-detail-title')?.textContent || '';
}

function addToCartFromDetail() {
    const productName = getCanonicalDetailProductName();
    const price = parseFloat(document.querySelector('.current-price').getAttribute('data-price'));
    const quantity = parseInt(document.getElementById('quantity').value);
    
    // Add to cart with size and color
    for (let i = 0; i < quantity; i++) {
        addToCart(productName, price, selectedColor, selectedSize);
    }
    
    // Show feedback
    showAddToCartFeedback();
}

// Show feedback animation
function showAddToCartFeedback() {
    const button = document.querySelector('.btn-add-to-cart');
    const originalText = button.innerHTML;
    
    button.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        Hinzugefügt!
    `;
    button.classList.add('success');
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.remove('success');
    }, 2000);
}

// Wishlist from Detail Page
let isInWishlist = false;
function toggleWishlistFromDetail() {
    const button = document.querySelector('.btn-add-to-wishlist');
    const productName = getCanonicalDetailProductName();
    const price = parseFloat(document.querySelector('.current-price').getAttribute('data-price'));
    const gradient = galleryImages[0].background;
    
    isInWishlist = !isInWishlist;
    
    if (isInWishlist) {
        button.classList.add('active');
        toggleWishlistItem(productName, price, gradient, button);
        button.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
        `;
    } else {
        button.classList.remove('active');
        toggleWishlistItem(productName, price, gradient, button);
        button.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
        `;
    }
}

// Accordion Toggle
function toggleAccordion(button) {
    const item = button.parentElement;
    const content = item.querySelector('.accordion-content');
    const allItems = document.querySelectorAll('.accordion-item');
    
    // Close all other accordions
    allItems.forEach(otherItem => {
        if (otherItem !== item) {
            otherItem.querySelector('.accordion-content').classList.remove('active');
            otherItem.querySelector('.accordion-header').classList.remove('active');
        }
    });
    
    // Toggle current accordion
    content.classList.toggle('active');
    button.classList.toggle('active');
}

let eligibleReviewOrderId = null;
let productReviews = [];
let currentReviewPage = 1;
let currentReviewSortOrder = 'highest';
const REVIEWS_PER_PAGE = 5;

function getDetailProductName() {
    const selectedProduct = JSON.parse(sessionStorage.getItem('selectedProduct') || 'null');
    return selectedProduct?.name || document.querySelector('.product-detail-title')?.textContent.trim() || '';
}

function getReviewLocale() {
    return { de: 'de-CH', en: 'en-GB', fr: 'fr-CH' }[currentLanguage] || 'de-CH';
}

async function invokeProductReviews(body) {
    if (!window.supabaseClient?.functions) return { data: null, error: new Error('review_service_unavailable') };
    return window.supabaseClient.functions.invoke('product-reviews', { body });
}

function setReviewEligibilityMessage(key) {
    const message = document.getElementById('reviewEligibility');
    if (message) message.textContent = t(key);
}

async function loadReviewEligibility(productName) {
    const button = document.getElementById('writeReviewButton');
    eligibleReviewOrderId = null;
    if (button) {
        button.hidden = true;
        button.style.display = 'none';
    }

    const client = window.supabaseClient;
    if (!client?.auth) {
        setReviewEligibilityMessage('reviewEligibilityUnavailable');
        return;
    }

    const { data: sessionData } = await client.auth.getSession();
    if (!sessionData?.session) {
        setReviewEligibilityMessage('reviewSignInRequired');
        return;
    }

    const { data, error } = await invokeProductReviews({ action: 'eligibility', productName });
    if (error) {
        setReviewEligibilityMessage('reviewEligibilityUnavailable');
        return;
    }

    eligibleReviewOrderId = data?.eligibleOrderIds?.[0] || null;
    if (eligibleReviewOrderId && button) {
        button.hidden = false;
        button.style.display = '';
        setReviewEligibilityMessage('reviewEligible');
    } else {
        setReviewEligibilityMessage('reviewAfterVerifiedDelivery');
    }
}

async function loadReviews() {
    const reviewList = document.getElementById('reviewList');
    const summary = document.getElementById('reviewSummary');
    const emptyState = document.getElementById('reviewsEmpty');
    const productName = getDetailProductName();
    if (!reviewList || !productName) return;

    await loadLanguage(currentLanguage);
    updateReviewControlsLanguage();
    const { data, error } = await invokeProductReviews({ action: 'list', productName });
    productReviews = error ? [] : (Array.isArray(data?.reviews) ? data.reviews : []);
    currentReviewPage = 1;

    if (summary) {
        summary.replaceChildren();
        summary.hidden = false;
        summary.style.display = '';
        renderReviewSummary(summary, productReviews);
    }
    if (emptyState) {
        emptyState.hidden = productReviews.length > 0;
        emptyState.textContent = error ? t('reviewListUnavailable') : t('reviewsEmpty');
    }

    const toolbar = document.getElementById('reviewsToolbar');
    if (toolbar) toolbar.hidden = productReviews.length === 0;
    renderReviewList();
    await loadReviewEligibility(productName);
}

function updateReviewControlsLanguage() {
    const sortOrder = document.getElementById('reviewSortOrder');
    if (sortOrder) {
        const optionKeys = ['reviewSortHighest', 'reviewSortNewest', 'reviewSortOldest', 'reviewSortLowest'];
        optionKeys.forEach((key, index) => {
            if (sortOrder.options[index]) sortOrder.options[index].textContent = t(key);
        });
    }
    const sortLabel = document.querySelector('label[for="reviewSortOrder"]');
    if (sortLabel) sortLabel.textContent = t('reviewSortLabel');
    const pagination = document.getElementById('reviewPagination');
    if (pagination) pagination.setAttribute('aria-label', t('reviewPaginationLabel'));
}

function renderReviewSummary(summary, reviews) {
    const distribution = [5, 4, 3, 2, 1].map(rating => ({
        rating,
        count: reviews.filter(review => Number(review.rating) === rating).length
    }));
    const average = reviews.length
        ? reviews.reduce((total, review) => total + Number(review.rating), 0) / reviews.length
        : 0;

    const overall = document.createElement('div');
    overall.className = 'summary-rating';
    const score = document.createElement('div');
    score.className = 'average-rating';
    score.textContent = t('reviewAverage').replace('{average}', average.toFixed(2));
    const stars = document.createElement('div');
    stars.className = 'stars-large';
    stars.textContent = `${'★'.repeat(Math.round(average))}${'☆'.repeat(5 - Math.round(average))}`;
    stars.setAttribute('aria-label', t('reviewStarsOutOfFive').replace('{rating}', average.toFixed(2)));
    const count = document.createElement('p');
    count.textContent = t('reviewCount').replace('{count}', String(reviews.length));
    overall.append(score, stars, count);

    const bars = document.createElement('div');
    bars.className = 'rating-distribution';
    distribution.forEach(({ rating, count: ratingCount }) => {
        const row = document.createElement('div');
        row.className = 'rating-bar';
        const label = document.createElement('span');
        label.className = 'rating-bar-label';
        label.textContent = `${rating} ★`;
        const bar = document.createElement('div');
        bar.className = 'bar';
        const fill = document.createElement('div');
        fill.className = 'fill';
        fill.style.width = `${reviews.length ? (ratingCount / reviews.length) * 100 : 0}%`;
        bar.append(fill);
        const total = document.createElement('span');
        total.className = 'rating-bar-count';
        total.textContent = String(ratingCount);
        row.append(label, bar, total);
        bars.append(row);
    });

    summary.append(overall, bars);
}

function setReviewSortOrder(sortOrder) {
    currentReviewSortOrder = sortOrder;
    currentReviewPage = 1;
    renderReviewList();
}

function renderReviewList() {
    const reviewList = document.getElementById('reviewList');
    const pagination = document.getElementById('reviewPagination');
    if (!reviewList || !pagination) return;

    const sortedReviews = [...productReviews];
    const dateValue = review => new Date(review.created_at).getTime() || 0;
    switch (currentReviewSortOrder) {
        case 'newest':
            sortedReviews.sort((a, b) => dateValue(b) - dateValue(a));
            break;
        case 'oldest':
            sortedReviews.sort((a, b) => dateValue(a) - dateValue(b));
            break;
        case 'lowest':
            sortedReviews.sort((a, b) => Number(a.rating) - Number(b.rating));
            break;
        default:
            sortedReviews.sort((a, b) => Number(b.rating) - Number(a.rating));
    }

    const pageCount = Math.ceil(sortedReviews.length / REVIEWS_PER_PAGE);
    currentReviewPage = Math.min(Math.max(currentReviewPage, 1), Math.max(pageCount, 1));
    const pageStart = (currentReviewPage - 1) * REVIEWS_PER_PAGE;
    reviewList.replaceChildren(...sortedReviews
        .slice(pageStart, pageStart + REVIEWS_PER_PAGE)
        .map(createReviewElement));

    pagination.replaceChildren();
    pagination.hidden = pageCount <= 1;
    if (pageCount <= 1) return;

    const addPageButton = (label, page, isActive = false, ariaLabel = '') => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `review-page-button${isActive ? ' active' : ''}`;
        button.textContent = label;
        button.disabled = isActive;
        if (ariaLabel) button.setAttribute('aria-label', ariaLabel);
        button.addEventListener('click', () => {
            currentReviewPage = page;
            renderReviewList();
        });
        pagination.append(button);
    };

    if (currentReviewPage > 1) {
        addPageButton('‹', currentReviewPage - 1, false, t('reviewPreviousPage'));
    }
    const firstVisiblePage = Math.max(1, Math.min(currentReviewPage - 2, pageCount - 4));
    const lastVisiblePage = Math.min(pageCount, firstVisiblePage + 4);
    for (let page = firstVisiblePage; page <= lastVisiblePage; page += 1) {
        addPageButton(String(page), page, page === currentReviewPage, `${t('reviewPage')} ${page}`);
    }
    if (currentReviewPage < pageCount) {
        addPageButton('›', currentReviewPage + 1, false, t('reviewNextPage'));
    }
}

function createReviewElement(review) {
    const reviewDiv = document.createElement('article');
    reviewDiv.className = 'review-item verified';
    const safeName = escapeHtml(review.display_name || '');
    const stars = '★'.repeat(Number(review.rating)) + '☆'.repeat(5 - Number(review.rating));
    const dateStr = new Date(review.created_at).toLocaleDateString(getReviewLocale());
    reviewDiv.innerHTML = `
        <div class="review-header">
            <div class="reviewer-info">
                <div class="reviewer-avatar">${escapeHtml(safeName.split(' ').map(part => part[0] || '').join('').toUpperCase())}</div>
                <div>
                    <div class="reviewer-name">${safeName}</div>
                    <div class="review-verified">✓ ${escapeHtml(t('reviewVerifiedPurchase'))}</div>
                </div>
            </div>
            <div class="review-meta">
                <div class="review-stars">${stars}</div>
                <div class="review-date">${dateStr}</div>
            </div>
        </div>
        <h4 class="review-title">${escapeHtml(review.title || '')}</h4>
        <p class="review-text">${escapeHtml(review.review_text || '')}</p>
    `;
    return reviewDiv;
}

function openReviewForm() {
    if (!eligibleReviewOrderId) return;
    document.getElementById('review-modal').style.display = 'flex';
}

function closeReviewForm() {
    document.getElementById('review-modal').style.display = 'none';
}

async function submitReview(event) {
    event.preventDefault();
    if (!eligibleReviewOrderId) {
        setReviewEligibilityMessage('reviewAfterVerifiedDelivery');
        return;
    }

    const form = event.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) submitButton.disabled = true;

    const { data, error } = await invokeProductReviews({
        action: 'submit',
        orderId: eligibleReviewOrderId,
        productName: getDetailProductName(),
        rating: Number(formData.get('rating')),
        title: String(formData.get('title') || ''),
        reviewText: String(formData.get('reviewText') || '')
    });

    if (submitButton) submitButton.disabled = false;
    if (error) {
        let errorCode = data?.error;
        try {
            errorCode ||= (await error.context?.clone?.().json())?.error;
        } catch {}
        const messageKey = errorCode === 'content_rejected'
            ? 'reviewContentRejected'
            : errorCode === 'review_already_submitted'
            ? 'reviewAlreadySubmitted'
            : errorCode === 'purchase_not_eligible'
            ? 'reviewAfterVerifiedDelivery'
            : 'reviewSubmitError';
        showNotification(t(messageKey), 'error');
        return;
    }

    showNotification(t('reviewPendingModeration'), 'success');
    form.reset();
    closeReviewForm();
    await loadReviews();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadReviews();
    
    // Open first accordion by default
    const firstAccordion = document.querySelector('.accordion-header');
    if (firstAccordion) {
        firstAccordion.parentElement.querySelector('.accordion-content').classList.add('active');
    }
});

// Close modals on outside click
window.onclick = function(event) {
    const reviewModal = document.getElementById('review-modal');
    if (event.target === reviewModal) {
        closeReviewForm();
    }
    
    const zoomOverlay = document.querySelector('.image-zoom-overlay');
    if (event.target === zoomOverlay) {
        zoomOverlay.remove();
        document.body.style.overflow = 'auto';
    }
}
