FROM nginx:1.18

COPY nginx.conf /etc/nginx/nginx.conf
COPY public /etc/nginx/html
