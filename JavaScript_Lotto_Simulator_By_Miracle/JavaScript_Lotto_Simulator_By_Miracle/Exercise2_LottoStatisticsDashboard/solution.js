// Exercise 2 — Lotto Statistics Dashboard (Node.js)
const readline = require('readline');

function askQuestion(rl, q) {
  return new Promise(resolve => rl.question(q, ans => resolve(ans.trim())));
}

function getRandomUniqueNumbers(count, min, max) {
  const set = new Set();
  while (set.size < count) {
    const n = Math.floor(Math.random() * (max - min + 1)) + min;
    set.add(n);
  }
  return Array.from(set).sort((a,b) => a-b);
}

function calculateWinnings(matches) {
  if (matches === 6) return 10000;
  if (matches === 5) return 5000;
  if (matches === 4) return 1000;
  if (matches === 3) return 100;
  return 0;
}

function parsePicks(input) {
  return input.split(/[ ,]+/).map(s => Number(s)).filter(n => Number.isInteger(n) && n>=1 && n<=49)
         .filter((v,i,a) => a.indexOf(v)===i).slice(0,6);
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const results = [];
  const winning = getRandomUniqueNumbers(6,1,49);
  console.log('=== Lotto Statistics Dashboard ===');
  console.log('Winning numbers for this round:', winning.join(', '));

  while (true) {
    const nameRaw = await askQuestion(rl, '\nEnter player name (or type DONE to finish): ');
    const name = nameRaw.trim();
    if (!name || name.toUpperCase() === 'DONE') break;

    const picksInput = await askQuestion(rl, 'Enter 6 numbers (1-49) separated by space or comma: ');
    const picks = parsePicks(picksInput);
    if (picks.length < 6) {
      console.log('You must enter 6 valid unique numbers. Try this player again.');
      continue;
    }

    const matchesList = picks.filter(n => winning.includes(n));
    const matches = matchesList.length;
    const winnings = calculateWinnings(matches);

    results.push({ name: name.toUpperCase(), picks, matches, winnings });
    console.log(`${name.toUpperCase()} — ${matches} matches — R${winnings}`);
  }

  // Summary
  console.log('\nPLAYER STATS\n----------------');
  let totalMatches = 0;
  let highest = 0;
  for (const r of results) {
    console.log(`${r.name} — ${r.matches} matches — R${r.winnings}`);
    totalMatches += r.matches;
    if (r.winnings > highest) highest = r.winnings;
  }

  const avgMatches = results.length ? (totalMatches / results.length).toFixed(2) : 0;
  console.log('\nAverage matches per player:', avgMatches);
  console.log('Highest winning amount: R' + highest);

  // Bonus: search feature
  const search = (await askQuestion(rl, '\nWould you like to search for a player? (yes/no): ')).toLowerCase();
  if (search === 'yes' || search === 'y') {
    const q = (await askQuestion(rl, 'Enter player name to search: ')).toUpperCase();
    const found = results.find(r => r.name === q);
    if (found) {
      console.log(`${found.name} — ${found.matches} matches — R${found.winnings}`);
    } else {
      console.log('Player not found.');
    }
  }

  rl.close();
}

main();
