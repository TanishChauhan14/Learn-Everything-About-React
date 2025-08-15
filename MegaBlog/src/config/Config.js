const config = {
    aapwrite : String(import.meta.env.VITE_APPWRITE_URL),
    aapwriteProjectID : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    aapwriteDATABASEID : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    aapwriteCOLLECTIONID : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    aapwriteBUCKETID : String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}

export default config