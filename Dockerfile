# Use an official Node.js runtime as a base image
FROM --platform=linux/amd64 node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# # Install Redis server
# RUN apt-get update && apt-get install -y redis-server

# COPY run.sh /usr/src/app/run.sh
# RUN chmod +x /usr/src/app/run.sh

# COPY redis.conf /etc/redis/redis.conf

# Copy the rest of the application code
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Define environment variables
ENV DB_DATABASE store
ENV DB_USER storeuser
ENV NODE_ENV production
# ENV REDIS_HOST localhost
# ENV REDIS_PORT 6380

# # Command to run the script
CMD [ "npm","run","start" ]
