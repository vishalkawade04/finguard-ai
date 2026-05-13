# Base Image
FROM node:18

# App Directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Expose Port
EXPOSE 5000

# Start App
CMD ["npm", "start"]
