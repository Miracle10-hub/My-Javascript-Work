// Exercise 5 — Lotto History Tracker (Node.js)
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
  return Array.from(set).sort((a,b)=>a-b);
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const draws = [];
  let drawNumber = 1;

  console.log('=== Lotto History Tracker ===');
  while (true) {
    const cmd = (await askQuestion(rl, '\nType ADD to create a draw, LIST to show all draws, STATS for stats, or DONE to exit: ')).toUpperCase();
    if (cmd === 'DONE') break;
    if (cmd === 'ADD') {
      const winning = getRandomUniqueNumbers(6,1,49);
      const payout = Math.round((Math.random() * 20000) + 500); // simulate payout between 500 and 20500
      draws.push({ drawNumber, winningNumbers: winning, totalPayout: payout });
      console.log(`Added Draw #${drawNumber} — Payout: R${payout} — Numbers: ${winning.join(', ')}`);
      drawNumber += 1;
    } else if (cmd === 'LIST') {
      console.log('\n=== PAST DRAWS ===');
      for (const d of draws) {
        console.log(`DRAW ${String(d.drawNumber).padStart(2,'0')} — Numbers: ${d.winningNumbers.join(', ')} — Payout: R${d.totalPayout}`);
      }
    } else if (cmd === 'STATS') {
      if (!draws.length) {
        console.log('No draws yet.');
        continue;
      }
      const payouts = draws.map(d => d.totalPayout);
      const highest = Math.max(...payouts);
      const lowest = Math.min(...payouts);
      const avg = (payouts.reduce((s,n)=>s+n,0) / payouts.length).toFixed(2);
      console.log('\n=== STATS ===');
      console.log('Highest payout: R' + highest);
      console.log('Lowest payout: R' + lowest);
      console.log('Average payout: R' + avg);
    } else {
      console.log('Unknown command. Use ADD, LIST, STATS or DONE.');
    }
  }

  console.log('\nExiting Lotto History Tracker.');
  rl.close();
}

main();
