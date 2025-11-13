// Exercise 1 — Lotto Number Picker (Node.js)
// Simple, beginner-friendly solution.
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

function parsePlayerNumbers(input) {
  // Accept numbers separated by spaces or commas, e.g. "1 2 3 4 5 6" or "1,2,3,4,5,6"
  const parts = input.split(/[ ,]+/).map(s=>s.trim()).filter(Boolean);
  const nums = [];
  for (let p of parts) {
    const n = Number(p);
    if (!Number.isInteger(n) || n < 1 || n > 49) continue;
    if (!nums.includes(n)) nums.push(n);
    if (nums.length === 6) break;
  }
  return nums;
}

async function playOne(rl, playerStats) {
  console.log('\n=== Welcome to the Lotto Simulator! ===');
  let name = await askQuestion(rl, 'Enter your name: ');
  name = name.toUpperCase() || 'PLAYER';

  // Ask the player to choose 6 numbers
  let picks = [];
  while (picks.length < 6) {
    const input = await askQuestion(rl, `Pick your numbers (remaining ${6 - picks.length}). Enter numbers separated by space or comma: `);
    const parsed = parsePlayerNumbers(input);
    // merge unique values into picks
    for (let n of parsed) {
      if (!picks.includes(n) && picks.length < 6) picks.push(n);
    }
    console.log('Current picks:', picks.join(', '));
  }

  // Generate winning numbers
  const winning = getRandomUniqueNumbers(6, 1, 49);

  // Compare
  const matches = picks.filter(n => winning.includes(n)).sort((a,b)=>a-b);

  console.log(`\nPlayer: ${name}`);
  console.log('Your picks:', picks.join(', '));
  console.log('Winning numbers:', winning.join(', '));

  if (matches.length === 6) {
    console.log('Jackpot! All 6 numbers match!');
  } else if (matches.length >= 3) {
    console.log(`You matched ${matches.length} numbers. Not bad!`);
    console.log('Matching numbers:', matches.join(', '));
  } else if (matches.length > 0) {
    console.log(`You matched ${matches.length} numbers.`);
    console.log('Matching numbers:', matches.join(', '));
  } else {
    console.log('No matches this time. Try again!');
  }

  // update stats object
  playerStats[name] = (playerStats[name] || 0) + 1;
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const playerStats = {}; // tracks how many times each player has played

  let playAgain = 'yes';
  do {
    await playOne(rl, playerStats);
    playAgain = (await askQuestion(rl, '\nPlay again? (yes/no): ')).toLowerCase();
  } while (playAgain === 'yes' || playAgain === 'y');

  console.log('\nThanks for playing! Summary of plays:');
  for (const [name, times] of Object.entries(playerStats)) {
    console.log(`${name} — times played: ${times}`);
  }
  rl.close();
}

main();
