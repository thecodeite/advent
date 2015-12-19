const readLineData = require('../dataReader').readLineData;
const data = readLineData();

//const data = [
//	'Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.',
//	'Blitzen can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.'
//];

Array.prototype.max = function(comp) {
	const first = this[0];
	var lowest = first;

	this.forEach(x => lowest = (comp(x)>comp(lowest))?x:lowest);
	return lowest;
}

const raindeers = data.map(parseLine);
console.log(raindeers);

const seconds = 2503;

raindeers.forEach(r => {
	r.energy = r.speedTime;
	r.flying = true;
	r.pos = 0;
	r.score = 0;
});

for(var tick=1; tick<=seconds; tick++) {
	console.log('tick:', tick);
	
	raindeers.forEach(r => {
		if(r.flying) {
			r.pos += r.speed;
			r.energy--;
			
			if(r.energy === 0) {
				r.flying = false;
				r.sleeping = r.restTime;
			}
		} else {
			r.sleeping--;
			
			if(r.sleeping === 0) {
				r.flying = true;
				r.energy = r.speedTime;
			}
		}
		
		console.log(r.name, 'at', r.pos, `Energy: ${r.energy} Sleeping:${r.sleeping}`);
	});
	
	var leader = raindeers.max(x=>x.pos);
	
	raindeers.forEach(r=>{
		if(r.pos === leader.pos) {
			console.log(r.name, 'in the lead and scores a point!');
			r.score++;
		}
	});
	console.log();
}

console.log('Winner:', raindeers.max(r=>r.score));

function parseLine(line) {
	  //'Blitze can fly 16000 km/s  for 11111 seconds, but then must rest for 162  seconds.'             
	const matcher = 
	  /^(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+)/;
	
	const m = matcher.exec(line);
	
	return {
		name: m[1],
		speed: ~~m[2],
		speedTime: ~~m[3],
		restTime: ~~m[4]
	};
}