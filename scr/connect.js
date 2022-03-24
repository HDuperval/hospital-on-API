import { getApps, cert, initializeApp, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore"

import credentials from "../credentials.js"

const connect = () => {
    if(getApps().length === 0){
        initializeApp({
            credential: cert(credentials)
        })
    }
    return getFirestore()
}

export default connect;
