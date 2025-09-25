FROM node:18.20.5
WORKDIR /backend
COPY package*.json ./
RUN npm install --loglevel verbose
COPY ./ ./
ENTRYPOINT [ "npm", "run" ]
CMD ["start"]

