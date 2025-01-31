FROM node:lts
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3214
CMD ["node", "app.js"]
