﻿# Overview

- We have a village having 1000 peasants.
- Peasants can move left, right, up, down
- Peasants can be promoted to:

  - Food gatherers (10pcs / 15 seconds)
  - Wood gatherers (8pcs / 15 seconds)
  - Gold gatherers (3pcs / 15 seconds)
  - Iron gatherers (5pcs / 15 seconds)

- An X gatherer can switch to any of the other types (food, wood, gold, iron).

# Demo

![Game Demo](demo/age-of-empires.gif)

# Features

- 1000 peasants created on first run (with names assigned P1-P1000).
- Move command for peasants (P1 move up/down/left/right).
- Gather command to promote peasant into a gatherer (P1 gather food/wood/gold/iron).
- Stats command to print:
  - Total number of active peasants.
  - Total active of every type of gatherer.
  - Total number of people that have moved (peasants move when commanded to, gatherers move once every 15 seconds).
- Inventory command to print the available resources of the village.
- Commands are case insensitive.
- State is persisted in a JSON file and loaded upon game restart.

Note: The search button is decorative. Search is performed automatically during typing.

# Installation

1. Download and install the latest LTS version of Node.js.
2. When finished run `node ./main.js` in the root directory to start the game.

# Notes

1. When a peasant get promoted to a gatherer, by typing i.e. `P1 gather food`,
   you can switch his specialty by typing `G1 gather food`. The "P" gets replaced by "G".
