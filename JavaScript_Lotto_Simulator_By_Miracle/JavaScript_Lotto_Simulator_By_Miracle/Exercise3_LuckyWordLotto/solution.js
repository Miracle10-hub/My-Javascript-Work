// Exercise 3 — Lucky Word Lotto (Node.js)
const readline = require('readline');

function askQuestion(rl, q) {
  return new Promise(resolve => rl.question(q, ans => resolve(ans.trim())));
}

function randomLetter() {
  const code = Math.floor(Math.random() * 26) + 65; // A-Z
  return String.fromCharCode(code);
}

function randomScore() {
  return Math.floor(Math.random() * 100) + 1; // 1-100
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  let play = true;
  const leaderboard = []; // { name, score }
  let rounds = 0;

  while (play) {
    const name = (await askQuestion(rl, '\nEnter your name: ')).toUpperCase() || 'PLAYER';
    let word = (await askQuestion(rl, 'Enter a 5-letter word: ')).toUpperCase().trim();
    if (word.length !== 5) {
      console.log('Please enter exactly 5 letters. Try again.');
      continue;
    }

    const letters = word.split('');
    const lucky = Array.from({length: 5}, () => randomLetter());

    const matches = letters.filter((ch, i) => lucky.includes(ch));
    const uniqueMatches = Array.from(new Set(matches));

    const score = randomScore();
    rounds +=1;
    leaderboard.push({ name, score });

    console.log('\nYour word:', word);
    console.log('Lucky letters:', lucky.join(', '));
    console.log('Matches:', uniqueMatches.join(', ') || 'None');
    console.log(`You matched ${uniqueMatches.length} letters.`);
    console.log(`Score this round: ${score}`);

    const again = (await askQuestion(rl, '\nPlay another round? (yes/no): ')).toLowerCase();
    if (!(again === 'yes' || again === 'y')) play = false;
  }

  // Summary / Leaderboard
  const highest = leaderboard.reduce((a,b)=> a.score>b.score ? a : b, {name:'',score:0});
  const avg = (leaderboard.reduce((s,r)=>s+r.score,0) / (leaderboard.length || 1)).toFixed(2);

  console.log('\n=== FINAL REPORT ===');
  console.log('WINNER:', highest.name, '-', highest.score, 'points');
  console.log('TOTAL ROUNDS PLAYED:', rounds);
  console.log('AVERAGE SCORE:', avg);

  rl.close();
}

main();
