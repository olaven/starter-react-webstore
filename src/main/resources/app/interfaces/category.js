export default class Item {
    constructor(data){
        this.title = data.title; 
        this.id = data.id || new Date().valueOf(); 
        this.visible = data.visible || false; 
        this.filter = data.filter; 
    }
}