# Use an official Node.js runtime as a parent image
FROM node:23

# Set the working directory in the container
#WORKDIR C:\\Users\\Vida.Owusu\\Desktop\\leave-management-system-Vidash
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["node", "index.js"]
