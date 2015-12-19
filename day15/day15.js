
//var data = [
//	'Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8',
//	'Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3'
//]
var data = [
	'Sugar: capacity 3, durability 0, flavor 0, texture -3, calories 2',
	'Sprinkles: capacity -3, durability 3, flavor 0, texture 0, calories 9',
	'Candy: capacity -1, durability 0, flavor 4, texture 0, calories 1',
	'Chocolate: capacity 0, durability 0, flavor -2, texture 2, calories 8'
]

Array.prototype.toObject = function(key, value) {
	const res = {};
	if(value === undefined) value = x => x;
	this.forEach(x => res[key(x)] = value(x));
	return res;
}

Array.prototype.sum = function(field) {
	if(field === undefined) value = x => x;
	return this.reduce((p,c)=>p+field(c), 0);
}
Array.prototype.product = function(field) {
	if(field === undefined) value = x => x;
	return this.reduce((p,c)=>p*field(c), 1);
}

const ing = data.map(parseLine).toObject(k=>k.name); 
console.log(ing)

const qualities = ['capacity', 'durability', 'flavor', 'texture']
var best = {str:'', prod: 0}

for(var i=1; i<=99; i++) {
for(var j=1; j<=100-i; j++) {
for(var k=1; k<=100-i-k; k++) {
	var quantities = [
		{name: 'Sugar', q: i},	
		{name: 'Sprinkles', q: j},	
		{name: 'Candy', q: k},	
		{name: 'Chocolate', q: 100-i-j-k}
	]
	
	var product = qualities.product(qual => {
		var total = quantities.sum(q=>q.q * ing[q.name][qual])
		if(total < 0) total = 0;
		return total;
	})
	
	var calories = quantities.sum(q=>q.q * ing[q.name]['calories'])
	
	var desc = quantities.map(x=>x.name+": "+x.q).join(', ')
	if(product > best.prod && calories === 500) {
		best = {str:desc, prod: product}
	}
	console.log(desc, product)
	
}
}
}

console.log('best:', best)

function parseLine(line) {
	const matcher = 
	  /^(\w+): \w+ ([\-\d]+), \w+ ([\-\d]+), \w+ ([\-\d]+), \w+ ([\-\d]+), \w+ ([\-\d]+)/;
	
	const m = matcher.exec(line);
	
	return {
		name: m[1],
		capacity: ~~m[2],
		durability: ~~m[3],
		flavor: ~~m[4],
		texture: ~~m[5],
		calories: ~~m[6]
	};
}