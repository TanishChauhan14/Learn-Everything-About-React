import {Client,ID,Databases, Query,} from "appwrite"
import config from "../config/Config";


class Services{
    client = new Client()
    database;
    constructor(){
        this.client
        .setEndpoint(config.aapwrite)
        .setProject(config.aapwriteProjectID)
        this.database = new Databases(this.client)
    }

    async createPost({title,content,featuredimage,status,userID}){
        try {
        const result = await this.database.createDocument(config.aapwriteDATABASEID,
            config.aapwriteCOLLECTIONID,
            ID.unique(),
            {title,
            content,
            featuredimage,
            status,
            userID})
            console.log(result);    
            
        } catch (error) {
            throw error
        }
        
    }

    async updatePost(documentId,{title,content,featuredimage,status}){
        try {
           const result = await this.database.updateDocument(
        config.aapwriteDATABASEID,
         config.aapwriteCOLLECTIONID,
        documentId, 
        {
          title,
          content,
          featuredimage,
          status,
        }
      );
      console.log("Post updated:", result);
      return result;
            
        } catch (error) {
            throw error
        }
        
    }

    async deletePost(documentId){
        try {
            
        const result = await this.database.deleteDocument(config.aapwriteDATABASEID, config.aapwriteCOLLECTIONID,documentId)
        return result
            
        } catch (error) {
            throw error
        }
    }

    async getPost(documentId){
        try {
            return await this.database.getDocument(config.aapwriteDATABASEID,config.aapwriteCOLLECTIONID,documentId)
            
        } catch (error) {
            throw error
        }
        
    }
    async getallPost(){
        try {
            return await this.database.listDocuments(config.aapwriteDATABASEID,config.aapwriteCOLLECTIONID)
        } catch (error) {
            throw error
        }
    }

    // Get all Post of user who are active
    async getallactivePost(queries = [Query.equal("status","active")]){
        try {
            return await this.database.listDocuments(config.aapwriteDATABASEID,config.aapwriteCOLLECTIONID,queries)
        } catch (error) {
            throw error
        }
    }
}

const service = new Services();

export default service;