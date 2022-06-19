export  class List<T> extends Array<T> {
	public constructor() {
		super();
	}
 
	add(value:T):void{
		this.push(value);
	}
 
	insert(index:number, value:T):void{
		this.splice(index, 0, value);
	}
 
	remove(value:T):void{
		var index:number = this.indexOf(value);
		this.removeAt(index);
	}
 
	removeAt(index:number):void{
		this.splice(index, 1);
	}
 
	contains(value:T):boolean{
		return this.indexOf(value)>=0;
	}
 
	public get count():number{
		return this.length;
	}
 
	clear():void{
		this.splice(0);
	}
 
	foreach(callback:Function):void {
        this._breaking = false;
        var sum = this.length;
        for(var i=0;i<sum;i++){
            if(this._breaking){
                break;
            }
            callback(this[i]);
        }
    }
 
    _breaking:boolean = false;
    break():void {
        this._breaking = true;
    }
 
	toArray():T[]{
		var array:T[] = [];
		this.forEach(element => {
			array.push(element);
		});
		return array;
	}
 
	append(value:T[]):void{
		value.forEach(element => {
			this.push(element);
		});
	}
}
