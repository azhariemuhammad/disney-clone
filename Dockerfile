# Use the official Node.js image as a base image
FROM node:18-alpine

# Set the working directory
WORKDIR /var/www/awesome-anime

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Use a lightweight web server to serve the React application
FROM nginx:alpine
COPY --from=0 /var/www/awesome-anime/dist/index.html /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
