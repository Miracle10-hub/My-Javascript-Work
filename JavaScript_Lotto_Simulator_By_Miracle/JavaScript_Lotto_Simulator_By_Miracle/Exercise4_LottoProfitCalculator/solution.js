// Exercise 4 — Lotto Profit Calculator (Node.js)
const readline = require('readline');

function askQuestion(rl, q) {
  return new Promise(resolve => rl.question(q, ans => resolve(ans.trim())));
}

function formatCurrency(amount) {
  return Number(Math.round(amount * 100) / 100).toFixed(2);
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  let run = true;
  do {
    const ticketsStr = await askQuestion(rl, '\nEnter number of tickets sold: ');
    const ticketPriceStr = await askQuestion(rl, 'Enter cost per ticket (R): ');
    const payoutStr = await askQuestion(rl, 'Enter total payout amount (R): ');

    const tickets = Number(ticketsStr) || 0;
    const price = Number(ticketPriceStr) || 0;
    const payout = Number(payoutStr) || 0;

    const income = tickets * price;
    const profit = income - payout;

    console.log('\nTotal Income: R' + formatCurrency(income));
    console.log('Total Payout: R' + formatCurrency(payout));
    console.log('Profit: R' + formatCurrency(profit));

    const again = (await askQuestion(rl, '\nCalculate another? (yes/no): ')).toLowerCase();
    if (!(again === 'yes' || again === 'y')) run = false;
  } while (run);

  console.log('\nExiting Profit Calculator.');
  rl.close();
}

main();
