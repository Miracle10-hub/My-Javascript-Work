# Exercise 2 — Lotto Statistics Dashboard

## Goal
Build a simple Lotto Dashboard that records multiple players' results and displays a summary with winnings.

## Instructions (summary)
1. Allow multiple users to enter their names and choose 6 numbers each (1-49).
2. Store each player's result in an array of objects: { name, picks, matches, winnings }.
3. Use rules to calculate winnings:
   - 6 matches → R10,000
   - 5 matches → R5,000
   - 4 matches → R1,000
   - 3 matches → R100
   - Below 3 → R0
4. Display a summary report for all players.
5. (Bonus) Add a search by name and show average matches & highest winning.

## How to run
```bash
node solution.js
```
