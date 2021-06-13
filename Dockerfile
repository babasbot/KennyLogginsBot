FROM node:14

WORKDIR /bot

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

CMD ["npm", "run", "bot"]
