import { Client , ID ,Account} from "appwrite"
import config from "../config/Config"
import { redirect } from "react-router-dom";

// This class encapsulates all Appwrite authentication logic
class AuthService {
    client = new Client();
    account;

    // The constructor initializes the Appwrite client and account services
    constructor() {
        this.client
            .setEndpoint(config.aapwrite)
            .setProject(config.aapwriteProjectID);
        this.account = new Account(this.client);
    }

    // Creates a new user account with a unique ID
    async createaccount({ email, password, name }) {
        try {
            const newaccount = await this.account.create(ID.unique(), email, password, name);
            // It's better to return the created account object or null
            return newaccount || null;
        } catch (error) {
            throw error;
        }
    }

    // Creates an email/password session to log the user in
    async login({ email, password }) {
        try {
            // This function returns the session object on success
            const session = await this.account.createEmailPasswordSession(email, password);
            console.log("Session created:", session);
            // Return the session object, which is more useful than a string
            return session;
        } catch (error) {
            // Throw the error so the calling function can handle it
            throw error;
        }
    }

    // Gets the currently logged-in user
    async getcurrentuser() {
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
            // Log the "no active session" error and return null, which is correct
            console.log("Appwrite service :: getcurrentuser :: error", error);
            return null;
        }
    }

    // Deletes all active sessions for the user (logs them out)
    async logout() {
        try {
            // This returns a promise that resolves on success
            return await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

const authServices = new AuthService();

export default authServices;
