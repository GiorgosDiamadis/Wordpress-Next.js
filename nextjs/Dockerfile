FROM ubuntu
WORKDIR /usr/app/nextjs
RUN chmod -R 777 /usr/app/nextjs
COPY . .
RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_16.x  | bash -
RUN apt-get -y install nodejs
RUN npm install npm --global

CMD [ "tail","-f","/dev/null" ]