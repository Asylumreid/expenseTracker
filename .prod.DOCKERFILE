FROM node:latest

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

#Create Work Directory
WORKDIR /usr/src/project

#Copy package.json files
#To install app dependencies 
COPY package*.json ./

#Install the dependencies
RUN npm install

#Copy files
COPY . .

#Expose port
EXPOSE 80

CMD [ "npm", "start" ]