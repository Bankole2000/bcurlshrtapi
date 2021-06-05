
require('dotenv').config({path: `${__dirname}/../.env`})

const generateUniqueId = require('generate-unique-id');
const baseURL = `${process.env.HOST}${process.env.IS_LOCAL == "true" ? ":"+ process.env.PORT || 4000 : ''}`;
const {isValidURl} = require('../utils/validator');

module.exports = {
    shortenURL: async (parent, {url}, {dataSources}, info) => {
      // Check if it's a valid URL
      if(!isValidURl(url)){
        throw new Error("Invalid URL");
      }
      // Check for the url in the database
      const urlExists = await dataSources.urlAPI.getURLByName(url)
      if(urlExists){
        return `${baseURL}/${urlExists.shortenedId}`
      }
      // Generate Uniqie Id for URL
      const uniqueID = generateUniqueId({
        length: 6,
        useLetters: true, 
        useNumbers: true, 
      })
      const newlyStoredURL = await dataSources.urlAPI.storeNewURLAndShortcode(url, uniqueID);
      if(newlyStoredURL){
        return `${baseURL}/${newlyStoredURL.shortenedId}`
      }
      return "Couldn't find or store URL"
    }
}