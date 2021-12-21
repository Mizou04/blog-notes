import {collection, addDoc, setDoc, updateDoc, deleteDoc, doc, getFirestore, getDoc, getDocs, arrayUnion, arrayRemove, query, where} from "firebase/firestore"
import {fireApp, db} from "./firebase.model"

class IdbModel {
    constructor(firestore, collection, path){
        this.fireStore = firestore;
        this.path = path;
        this.collection = collection;
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

    async getCollectionRef(){
        return await this.collection(db, this.collectionPath);
    }

    _docRef = async(docPath) =>{
        return await doc(await this.fireStore, docPath);
    }
    /**
     * 
     * @param {string} docPath - doc pathname in the collection
     */
    // async getDocs(path){
    //     return await getDocs(this.path)
    // }

    get collectionPath(){
        // return this.path[this.path.length-1] === "/" ? this.path : this.path+"/";
        return this.path
    }

    async getDoc(docPath){
        return await getDoc(await this._docRef(docPath));
    }
    /**
     * 
     * @param {string} docPath - doc pathname in the collection
     * @param {{}} data - object containing data to add (or field to add)
     */
    async addDoc(data){
        return await addDoc(await this.getCollectionRef(), data);
    }
    
    /**
     * 
     * @param {string} docPath - doc pathname in the collection
     * @param {{}} data - object containing data to add (or field to add)
     */
    setDoc = async(docPath, data) =>{
        return await setDoc(await this._docRef(docPath), data);
    }
    
    /**
     * @param {string} docPath
     * @param {doc} doc
     * @param {{}} data - object containing data to add (or field to add)
     */
    async updateDoc(docPath ,data){
        return await updateDoc(await this._docRef(docPath), data)
    }
    
    /**
     * @param {string} docPath
     * @param {doc} doc
     */
    async removeDoc(docPath){
        return await deleteDoc(this._docRef(docPath))
    }
    /**
     * @param {{condition : string , operator : string, value : string}} options 
     * @returns 
     */
    getCollectionDocs = async (QUERY) =>{
        let q = query(this.collection(db, QUERY));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => doc.data())
    }
    /**
     * 
     * @param {any[]} elements - elements to add to the doc array field
     */
    docArrayUnion(...elements){
        if(arguments.length === 0) throw Error("I see no arguments, pass at least 1")
        else{
            return arrayUnion(...elements)
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

export const userDBref = new DBRef(db, collection, "users/");
export const articlesDBref = new DBRef(db, collection, "articles/");