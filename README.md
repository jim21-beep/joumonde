# Joumonde Fashion Shop - Deployment Guide

## Lokales Testen mit Docker

### Voraussetzungen
- Docker Desktop installiert (https://www.docker.com/products/docker-desktop/)

### Container bauen und starten
```bash
# Container bauen
docker build -t joumonde-shop .

# Container starten
docker run -d -p 8080:80 --name joumonde joumonde-shop

# Oder mit Docker Compose
docker-compose up -d
```

Website ist dann verfügbar unter: http://localhost:8080

### Container verwalten
```bash
# Container stoppen
docker stop joumonde

# Container starten
docker start joumonde

# Logs anzeigen
docker logs joumonde

# Container entfernen
docker rm -f joumonde
```

## Deployment Optionen

### 1. VPS/Server (DigitalOcean, Hetzner, etc.)
1. Docker auf Server installieren
2. Repository clonen oder Dateien hochladen
3. `docker-compose up -d` ausführen
4. Nginx Reverse Proxy mit SSL (Let's Encrypt) konfigurieren

### 2. Container Registry & Cloud
```bash
# Image taggen
docker tag joumonde-shop your-registry.com/joumonde-shop:latest

# Image pushen
docker push your-registry.com/joumonde-shop:latest
```

Dann auf Server:
```bash
docker pull your-registry.com/joumonde-shop:latest
docker run -d -p 80:80 your-registry.com/joumonde-shop:latest
```

### 3. Schweizer Hosting
- **Hostpoint**: Docker Support mit Container Hosting
- **Cyon**: Unterstützt Docker Deployment
- **Infomaniak**: Cloud Server mit Docker

### 4. Einfachere Alternativen (ohne Docker)
- **Netlify**: Kostenloses Static Hosting, einfaches Drag & Drop
- **Vercel**: Automatisches Deployment via Git
- **GitHub Pages**: Gratis Hosting für statische Sites

## SSL/HTTPS einrichten (auf eigenem Server)

### Mit Let's Encrypt (kostenlos)
```bash
# Certbot installieren
apt-get update
apt-get install certbot python3-certbot-nginx

# Zertifikat generieren
certbot --nginx -d joumonde.ch -d www.joumonde.ch
```

## Domain-Konfiguration
1. Domain (z.B. joumonde.ch) kaufen
2. DNS A-Record auf Server-IP zeigen lassen
3. Warten bis DNS propagiert ist (5-30 Minuten)
4. SSL-Zertifikat installieren

## Performance-Tipps
- Bilder optimieren (WebP Format)
- CDN verwenden (Cloudflare kostenlos)
- Gzip Kompression (bereits in nginx.conf aktiviert)
- Browser-Caching nutzen (bereits konfiguriert)
