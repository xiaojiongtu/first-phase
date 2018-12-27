let str='multipart/form-data; boundary=----WebKitFormBoundaryGQmRLuAB8mJLqxEB';
let arr1=str.split(';'); //[ 'multipart/form-data',' boundary=----WebKitFormBoundaryGQmRLuAB8mJLqxEB' ]
let arr2=arr1[1].split("="); //[ ' boundary', '----WebKitFormBoundaryGQmRLuAB8mJLqxEB' ]
let boundary='--'+arr2[1];
console.log(arr1);
console.log(arr2);
console.log(arr2[1]); //----WebKitFormBoundaryGQmRLuAB8mJLqxEB

