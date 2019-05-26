
String.prototype.isNullOrEmpty = function (): boolean {
    let isEmpty:boolean = true;
    var value: string = String(this);
    if( (!value || 0 === value.length))
        return isEmpty;
    else if ((!value || /^\s*$/.test(value))) 
        return isEmpty;
    else if ((value.length === 0 || !value.trim())) 
        return isEmpty;  

    return isEmpty = false;
  }

String.prototype.getFileExtn = function (): string {
    var value: string = String(this);
    return value.substr(value.lastIndexOf('.') + 1);
}

String.prototype.isNotEmpty = function (): boolean {
    var value: string = String(this);
    var pattern =/\S+/;
    return pattern.test(value);   
}

String.prototype.isNumber = function():boolean {
    var value: string = String(this);
    var pattern = /^\d+$/;
    return pattern.test(value);   
}

String.prototype.isAlphaNumeric = function():boolean {
    var value: string = String(this);
    var pattern = /^[\w ]*[^\W_][\w ]*$/;
    return pattern.test(value);   
}
