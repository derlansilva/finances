class Finance{
    constructor(value ,details){
        this._value = value;
        this._details = details;
    }

    get value(){
        return this._value
    }

    get details(){
        return this._details
    }
}