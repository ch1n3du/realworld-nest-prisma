FROM node:alpine

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# generated prisma files
COPY prisma ./prisma

# COPY ENV variable
COPY .env ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Creates a 'dist' folder with the production build
RUN npm run build

# Expose port 8080 for the server
EXPOSE 8080

RUN cat .env

# Start the server using the production build
CMD [ "node", "dist/main.js" ]