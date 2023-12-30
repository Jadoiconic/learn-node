// console.log(arguments)
// console.log(require("module").wrapper)

const C = require("../test")

const calc1 = new C
 console.log("sum = ", calc1.add(4,7))
 console.log("quotient = ", calc1.divide(8,2))