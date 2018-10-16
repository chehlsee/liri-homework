var obj = {
  thing: "value",
  thing2: "Chelsea",
  thing3: "Zintis"
}

console.log(obj.thing3);
console.log(obj["thing3"]);

for(var keyString in obj){
  console.log(keyString, obj[keyString]);

}