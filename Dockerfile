# Kingdom Hearts Savefile Converter
# Static site served with nginx-alpine
# Compatible with Docker and Podman

FROM docker.io/library/nginx:alpine

# Copy static files to nginx's default web root
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY *.js /usr/share/nginx/html/
COPY favicon.png /usr/share/nginx/html/
COPY LICENSE /usr/share/nginx/html/

# Optional: custom nginx config for SPA-like behavior
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1
