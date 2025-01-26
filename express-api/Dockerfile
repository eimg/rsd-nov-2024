FROM ubuntu:latest

ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Yangon

RUN apt-get update && apt-get install -y nginx git curl ca-certificates gnupg

RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | \
	gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | \
	tee /etc/apt/sources.list.d/nodesource.list

RUN apt-get update
RUN apt-get install nodejs -y
RUN npm install -g nodemon

WORKDIR /app
COPY . /app
RUN npm install

EXPOSE 80
COPY nginx.conf /etc/nginx/sites-available/default

CMD ["/bin/bash", "./start.sh"]