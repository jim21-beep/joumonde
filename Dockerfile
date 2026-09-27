FROM node:20-alpine AS config
ARG SUPABASE_URL
ARG SUPABASE_ANON_KEY
WORKDIR /app
COPY scripts/generate-config.js scripts/generate-config.js
COPY public public
RUN SUPABASE_URL=$SUPABASE_URL SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY node scripts/generate-config.js

FROM nginx:alpine

COPY --from=config /app/public/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
