FROM alpine:latest

CMD ["/usr/sbin/nginx", "-c", "/etc/nginx/nginx.conf"]

RUN apk add --no-cache nodejs nginx nginx-mod-http-echo git gcc musl-dev make openssh-client wget gettext; mkdir -p /tmp/nginx/cache /tmp/nginx/tmp


RUN git clone https://github.com/google/zopfli; cd zopfli; make -j4; cp zopfli /usr/sbin/

ENV GIT_SSH /tmp/git-env.sh

COPY nginx/nginx.conf /etc/nginx/
RUN /usr/sbin/nginx -c /etc/nginx/nginx.conf -t

ARG DEBUG=developent
WORKDIR /var/www/operator
RUN git clone git@bitbucket.org:everychat/web.git ./; npm install; npm run postinstall:development; cp -R build/* assets/; sh -c 'for i in `find assets build -type f`; do zopfli $i; done'
