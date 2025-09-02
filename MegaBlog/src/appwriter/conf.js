import { Client, ID, Databases, Query, Account } from "appwrite";
import config from "../config/Config";

class Services {
  client = new Client();
  database;
  account;

  constructor() {
    this.client
      .setEndpoint(config.aapwrite)
      .setProject(config.aapwriteProjectID);

    this.database = new Databases(this.client);
    this.account = new Account(this.client);
  }

  // ---- Posts ----
  // No changes here, but featuredimage is lowercase
  async createPost({ title, content, featuredimage, status, userID }) {
    return await this.database.createDocument(
      config.aapwriteDATABASEID,
      config.aapwriteCOLLECTIONID,
      ID.unique(),
      { title, content, featuredimage, status, userID }
    );
  }

  // `featuredImage` parameter and object key changed to lowercase `featuredimage`
  // Corrected updatePost function
  async updatePost(slug, { title, content, featuredimage, status, userID }) {
    try {
      return await this.database.updateDocument(
        config.aapwriteDATABASEID,
        config.aapwriteCOLLECTIONID,
        slug,
        {
          title,
          content,
          featuredimage,
          status,
          userID, // <-- Fixed: Added userID
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: updatePost :: error", error);
    }
  }
  async deletePost(slug) {
    try {
      await this.database.deleteDocument(
        config.aapwriteDATABASEID,
        config.aapwriteCOLLECTIONID,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
      return false;
    }
  }

  async getallPost() {
    return await this.database.listDocuments(
      config.aapwriteDATABASEID,
      config.aapwriteCOLLECTIONID
    );
  }

  // Fixed the query logic to filter by `status`
  async getallPost() {
    try {
      return await this.database.listDocuments(
        config.aapwriteDATABASEID,
        config.aapwriteCOLLECTIONID,
        [
          Query.select([
            "title",
            "content",
            "featuredimage",
            "status",
            "userID",
            "$id",
          ]),
        ]
      );
    } catch (error) {
      console.log("Appwrite serive :: getallPost :: error", error);
      return false;
    }
  }
  // The rest of the code remains the same as it seems correct.
  async getPost(userID) {
    try {
      const response = await this.database.listDocuments(
        config.aapwriteDATABASEID,
        config.aapwriteCOLLECTIONID,
        [Query.equal("userID", userID)]
      );

      if (response.documents.length > 0) {
        return response.documents;
      } else {
        return [];
      }
    } catch (error) {
      console.log("Get Post Error:", error);
      throw error;
    }
  }

  async getPostById(documentId) {
    try {
      return await this.database.getDocument(
        config.aapwriteDATABASEID,
        config.aapwriteCOLLECTIONID,
        documentId
      );
    } catch (error) {
      console.log("Get Post By ID Error:", error);
      throw error;
    }
  }

  async getPostsByUserId(userID) {
    try {
      const response = await this.database.listDocuments(
        config.aapwriteDATABASEID,
        config.aapwriteCOLLECTIONID,
        [Query.equal("userID", userID)]
      );

      return response.documents || [];
    } catch (error) {
      console.log("Get Posts By UserID Error:", error);
      throw error;
    }
  }
}
const service = new Services();
export default service;
