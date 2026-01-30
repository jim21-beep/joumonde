# Verwende nginx als Basis-Image
FROM nginx:alpine

# Kopiere alle Website-Dateien in das nginx HTML-Verzeichnis
COPY *.html /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/

# Erstelle eine einfache nginx-Konfiguration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponiere Port 80
EXPOSE 80

# Starte nginx
CMD ["nginx", "-g", "daemon off;"]
