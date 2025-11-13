# 🚗 Highveld Mall Parking Ticket System (Node.js)

## 🧠 Challenge Description
Highveld Mall wants to automate its parking ticket system. This Node.js program simulates issuing and calculating parking tickets for cars entering and leaving the mall.

### ✅ Features
- Asks for vehicle and driver details
- Issues a random 4-digit ticket number
- Calculates parking fees (first 2 hours = R10, each extra hour = R5)
- Demonstrates **scope shadowing**
- Supports **recursive re-entry** (process another car)
- Handles user input using the `readline` module

---

## 📘 Explanation
This project helps students understand:
- Functions and parameters in JavaScript
- Variable scope and shadowing (local vs global)
- Using recursion to repeat actions
- Simple logic and condition handling in Node.js

---

## 🧩 How to Run
1. Make sure Node.js is installed on your computer.
2. Save both files (`README.md` and `solution.js`) in the same folder.
3. Open your terminal and navigate to that folder.
4. Run the program using:
   ```bash
   node solution.js
   ```

---

## 💡 Example Output
```
=== Welcome to Highveld Mall Parking System ===
Enter driver name: Miracle
Enter vehicle number: ND12345
Enter hours parked: 3

Ticket issued for Miracle (Vehicle: ND12345)
Ticket Number: 4827
Parking Fee: R15
Payment of R15 received. Have a safe trip!

Inside function: Temporary Parking Zone
Global scope: Highveld Mall

Do you want to process another vehicle? (yes/no)
```

---

## 🔗 Author
Created by Miracle (https://github.com/Miracle10-hub)
