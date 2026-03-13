# Joumonde – Setup & Deployment Guide

Dieses Dokument erklärt, wie man das Joumonde-Projekt lokal testet und auf einem Server veröffentlicht. Es richtet sich an Personen mit grundlegenden Kenntnissen in Webentwicklung.

---

## 1. Schnellstart – Empfohlene Option

Wer das Projekt schnell und unkompliziert online stellen will, ohne eigenen Server, dem empfehle ich folgende Dienste:

- **Netlify** – Kostenloses Static Hosting, einfaches Drag & Drop
- **Vercel** – Automatisches Deployment via Git
- **GitHub Pages** – Gratis Hosting für statische Seiten

Diese Varianten benötigen kein Docker und sind in wenigen Minuten eingerichtet.

---

## 2. Lokale Entwicklung mit Docker

Für die lokale Entwicklung kann das Projekt mit Docker gestartet werden.

**Voraussetzungen:**
Docker Desktop muss installiert sein: https://www.docker.com/products/docker-desktop/

**Container starten:**
```bash
# Container bauen
docker build -t joumonde-shop .

# Container starten
docker run -d -p 8080:80 --name joumonde joumonde-shop

# Oder mit Docker Compose
docker-compose up -d
```

Die Website ist dann erreichbar unter: http://localhost:8080

**Container verwalten:**
```bash
docker stop joumonde      # stoppen
docker start joumonde     # starten
docker logs joumonde      # Logs anzeigen
docker rm -f joumonde     # entfernen
```

---

## 3. Deployment auf eigenem Server

Diese Option eignet sich für alle, die volle Kontrolle über ihren Server möchten (z.B. DigitalOcean, Hetzner).

### 3.1 Server einrichten
1. Docker auf dem Server installieren
2. Repository clonen oder Dateien hochladen
3. `docker-compose up -d` ausführen

### 3.2 SSL-Zertifikat einrichten (kostenlos)
```bash
apt-get install certbot python3-certbot-nginx
certbot --nginx -d joumonde.ch -d www.joumonde.ch
```

### 3.3 Domain konfigurieren
1. Domain kaufen (z.B. joumonde.ch)
2. DNS A-Record auf die Server-IP setzen
3. Ca. 5–30 Minuten warten bis die Änderung aktiv ist
4. SSL-Zertifikat installieren (siehe 3.2)

**Schweizer Hosting-Anbieter mit Server-Support:**
- **Hostpoint** – Docker Support mit Container Hosting
- **Cyon** – Unterstützt Docker Deployment
- **Infomaniak** – Cloud Server mit Docker

---

## 4. Performance-Optimierungen

Einige Massnahmen zur Verbesserung der Ladegeschwindigkeit – grösstenteils bereits konfiguriert:

- Bilder im WebP-Format verwenden
- Cloudflare als kostenloses CDN nutzen
- Gzip-Kompression (bereits in nginx.conf aktiv)
- Browser-Caching (bereits konfiguriert)
