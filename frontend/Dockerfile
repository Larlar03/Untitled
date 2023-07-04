# Defining what image to build from (LTS v18 Node)
FROM --platform=linux/amd64 node:18-alpine

# Creating the working directory named `app`
WORKDIR /app

# Creating the working directory named `app`
COPY package.json .

# Installing all tools & dependencies
# If you are building your code for production RUN npm install --omit=devRUN npm install

#Copying all the application source code and files to the working directory `app`
COPY . .

#Exposing the container to run on this port 5173
EXPOSE 5173

#Command to start the Docker container for the frontend React.js application
CMD ["npm", "run", "dev"]