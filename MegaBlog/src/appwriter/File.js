import { Client, ID, Storage } from "appwrite";
import config from "../config/Config";

class FileService {
    client = new Client();
    storage; 

    constructor() {
      this.client
        .setEndpoint(config.aapwrite)
        .setProject(config.aapwriteProjectID);
      
      this.storage = new Storage(this.client);
    }

    async uploadFile(file) {
      try {
        return await this.storage.createFile(
          config.aapwriteBUCKETID,
          ID.unique(),
          file
        );
      } catch (error) {
        throw error;
      }
    }

    async deleteFile(fileID) {
      try {
        return await this.storage.deleteFile(config.aapwriteBUCKETID, fileID);
      } catch (error) {
        throw error;
      }
    }

    // Corrected method to get a file preview URL
    getFilePreview(fileID){
        return this.storage.getFileDownload(
            config.aapwriteBUCKETID,
            fileID 
        );
    }
}

const fileService = new FileService();

export default fileService;