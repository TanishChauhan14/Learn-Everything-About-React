import { Client , ID ,Account} from "appwrite"
import config from "../config/Config"
import { redirect } from "react-router-dom";

     class AuthService{
     Client = new Client();
     account;
     constructor(){
        this.Client
        .setEndpoint(config.aapwrite)
        .setProject(config.aapwriteProjectID);
        this.account = new Account(this.Client);
     }
     async createaccount({email,password,name}){

        try {
            const newaccount  = await this.account.create(ID.unique,email,password,name)
            if(newaccount){
                return newaccount
            }else{
                console.log("createee");   
            }
            
        } catch (error) {
            throw error
        }
     }

     async login({email,password}){
        try {   
         const session = null;  
        session = await this.account.createEmailPasswordSession(email,password)
        if(session != null){
            return "Login successfully"
        }else{
            return "Login failed"
        }
            
        } catch (error) {
            throw error
        }
     }

     async getcurrentuser(){
        try {
            const user = await this.account.get();
            
        } catch (error) {
            throw redirect ('/login')
        }
     }

     async logout(){
        try {
          const dlt =  await this.account.deleteSessions()
          // if .deleteSession => this.account.deleterSession('current')
          return dlt
        } catch (error) {
            throw error
        }
     }
} 

const authServices = new AuthService();

export default authServices

