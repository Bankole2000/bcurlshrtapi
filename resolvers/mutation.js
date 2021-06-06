module.exports = {
  deleteURL: async(parent, {id}, {dataSources}, info) => {
    console.log({id});
    try {
      const deletedUrl = await dataSources.urlAPI.deleteURL(id)
      if(deletedUrl){
        return deletedUrl
      }
    } catch (err) {
      console.log({err});
    }
  }
}