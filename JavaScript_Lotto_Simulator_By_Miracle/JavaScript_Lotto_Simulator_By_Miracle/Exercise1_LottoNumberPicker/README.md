# Exercise 1 — Lotto Number Picker

## Goal
Build a Lotto Number Picker that lets a player pick 6 numbers (1-49) and compares them to 6 randomly generated winning numbers.

## Instructions (summary)
1. Welcome message.
2. Ask the player name, then ask them to pick 6 numbers between 1 and 49.
3. Store player's numbers in an array (ensure uniqueness and valid range).
4. Generate 6 unique random winning numbers between 1 and 49.
5. Compare and display how many and which numbers matched.
6. Format the player's name in UPPERCASE.
7. Use a do–while loop to allow the player to play again until they quit.
8. (Bonus) Use an object to track player's name and how many times they've played.

## How to run
```bash
node solution.js
```

## Example output
```
Welcome to the Lotto Simulator!
Player: MIRACLE
Your picks: 3, 7, 12, 23, 34, 45
Winning numbers: 7, 12, 19, 23, 31, 45
Matches (4): 7, 12, 23, 45
Play again? (yes/no)
```
