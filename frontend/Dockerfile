# Defining what image to build from (LTS v18 Node)
FROM node:18-alpine

# Creating the working directory named `app`
WORKDIR /app

# Creating the working directory named `app`
COPY package*.json ./

# Installing all tools & dependencies
# If you are building your code for production RUN npm ci --omit=devRUN npm install
RUN npm install

#Copying all the application source code and files to the working directory `app`
COPY . .

#Exposing the container to run on this port 5173
EXPOSE 5173

#Command to start the Docker container for the frontend React.js application
CMD npm run dev