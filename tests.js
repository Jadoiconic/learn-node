const  bills=[125,555,44,99,50];

const calTip = (bill)=> bill >=50 && bill<=300 ?bill*15/100:bill*20/100;
const unitTip = bills.map((bill) => calTip(bill))
const totalsBill = bills.map((bill) => bill + calTip(bill))
const totalIncone = totalsBill.reduce((bill,sum)=>bill + sum,0)

console.log(bills,unitTip,totalsBill,"Total = ", totalIncone)



```__Ami__
year 3: 1109.8 => 74
year 2: 532.1 => 53.21
year 1: 1212.1 => 63.79
3years 123: 190.98 =>63.66

__Musta__
year 3: 1115.4 => 74.36
year 2: 714.3 => 71.43
year 1: 1283.6 => 67.55
3years 123: 213.34 =>71.11
```