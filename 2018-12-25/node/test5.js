let common=require('./libs/common');

let str='Content-Disposition: form-data; name="user" ';

let json= common.parseInfo(str);

console.log(json);
