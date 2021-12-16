import {collection, addDoc, setDoc, updateDoc, deleteDoc, doc, getFirestore, getDoc, getDocs, arrayUnion, arrayRemove} from "firebase/firestore"
import {fireApp} from "./firebase.model"
class IdbModel {
    constructor(firestore, collection, path){
        this.fireStore = firestore;
        this.path = path;
        this.collection = collection(this.fireStore ,this.path);
    }
    _docRef(){}
    get collectionPath(){}
    getDoc(){}
    addDoc(){}
    setDoc(){}
    updateDoc(){}
    removeDoc(){}
    getCollectionDocs(){}
    docArrayRemove(){}
    docArrayUnion(){}
}

class DBRef extends IdbModel {
    constructor(firestore ,collection, path){
        super(firestore, collection, path);
    }

    _docRef(docPath){
        return doc(this.fireStore, docPath);
    }
    /**
     * 
     * @param {string} docPath - doc pathname in the collection
     */
    // async getDocs(path){
    //     return await getDocs(this.path)
    // }

    get collectionPath(){
        return this.path[this.path.length-1] === "/" ? this.path : this.path+"/";
    }

    async getDoc(docPath){
        return await getDoc(this._docRef(docPath));
    }
    /**
     * 
     * @param {string} docPath - doc pathname in the collection
     * @param {{}} data - object containing data to add (or field to add)
     */
    async addDoc(data){
        console.log( await addDoc(this.collection, data))
    }
    
    /**
     * 
     * @param {string} docPath - doc pathname in the collection
     * @param {{}} data - object containing data to add (or field to add)
     */
    async setDoc(docPath, data){
        await setDoc(this._docRef(docPath), data)
    }
    
    /**
     * @param {string} docPath
     * @param {doc} doc
     * @param {{}} data - object containing data to add (or field to add)
     */
    async updateDoc(docPath ,data){
        await updateDoc(this._docRef(docPath), data)
    }
    
    /**
     * @param {string} docPath
     * @param {doc} doc
     */
    async removeDoc(docPath){
        await deleteDoc(this._docRef(docPath))
    }

    async getCollectionDocs(query){
        let DOCS_ARRAY = [];
        return await (await getDocs(query)).forEach(doc=>{
            if(doc && doc.exists()){
                return [...DOCS_ARRAY , ...doc.data()];
            }
        })
    }
    /**
     * 
     * @param {any[]} elements - elements to add to the doc array field
     */
    docArrayUnion(elements){
        if(arguments.length === 0) throw Error("I see no arguments, pass at least 1") 
        if(arguments.length > 1){
            return arrayUnion(...elements)
        } else {
            return arrayUnion(elements)
        }
    }
    /**
     * 
     * @param {any[]} elements - elements to remove to the doc array field
     */
    docArrayRemove(elements){
        if(arguments.length === 0) throw Error("I see no arguments, pass at least 1") 
        if(arguments.length > 1){
            return arrayRemove(...elements)
        } else {
            return arrayRemove(elements)
        }
    }

}

export const userDBref = new DBRef(getFirestore(fireApp), collection, "users/");
export const articlesDBref = new DBRef(getFirestore(fireApp), collection, "articles/");