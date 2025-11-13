// 🚗 Highveld Mall Parking Ticket System
// Created by Miracle - Simple Node.js version

const readline = require('readline');

// Global variable
let mallName = "Highveld Mall";

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to issue ticket
function issueTicket(vehicleNumber, driverName) {
  const ticketNumber = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number
  console.log(`\nTicket issued for ${driverName} (Vehicle: ${vehicleNumber})`);
  console.log(`Ticket Number: ${ticketNumber}`);
  return ticketNumber;
}

// Function to calculate fee
function calculateFee(hoursParked) {
  let total = 10; // first 2 hours cost R10
  if (hoursParked > 2) {
    total += (hoursParked - 2) * 5;
  }
  return total;
}

// Function to process payment
function processPayment(amount) {
  console.log(`Payment of R${amount} received. Have a safe trip!`);
}

// Function demonstrating shadowing
function showMallNames() {
  let mallName = "Temporary Parking Zone"; // Local variable shadows global
  console.log(`\nInside function: ${mallName}`);
  console.log(`Global scope: ${global.mallName || "Highveld Mall"}`);
}

// Main function
function main() {
  console.log("\n=== Welcome to Highveld Mall Parking System ===");

  rl.question("Enter driver name: ", function(driverName) {
    rl.question("Enter vehicle number: ", function(vehicleNumber) {
      rl.question("Enter hours parked: ", function(hours) {
        const ticket = issueTicket(vehicleNumber, driverName);
        const fee = calculateFee(Number(hours));
        console.log(`Parking Fee: R${fee}`);
        processPayment(fee);
        showMallNames();

        rl.question("\nDo you want to process another vehicle? (yes/no): ", function(answer) {
          if (answer.toLowerCase() === "yes") {
            main(); // Recursion
          } else {
            console.log("\nParking system shutting down...");
            rl.close();
          }
        });
      });
    });
  });
}

// Start the program
main();
