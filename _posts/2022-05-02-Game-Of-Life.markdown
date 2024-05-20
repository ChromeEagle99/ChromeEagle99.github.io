---
layout: post
title:  "Conway Game of Life"
date:   2022-01-02 04:25:25 +0800
categories: Interactive
tags:
  - Game
  - Software Engineering
banner:
  loop: true
  volume: 0.8
  start_at: 8.5
  image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Gospers_glider_gun.gif"
  opacity: 0.618
  background: "#000"
  height: "100vh"
  min_height: "38vh"
  heading_style: "font-size: 4.25em; font-weight: bold; text-decoration: underline"
  subheading_style: "color: gold"
--- 

<link rel="stylesheet" href="/assets/css/Game-of-Life/gameOfLife.css">

## Conway's Game of Life

**Not Mobile-Friendly**
 
<div class="game-of-life-container">

  <div class="game-of-life-controls">
    <label for="grid-size">Grid Size:</label>
    <input type="number" id="grid-size" value="20" style="width: 50px;">
    <label for="rows">Rows:</label>
    <input type="number" id="rows" value="30" style="width: 50px;">
    <label for="cols">Columns:</label>
    <input type="number" id="cols" value="30" style="width: 50px;">
    <button id="apply-settings">Apply</button>
  </div>

  <div class="game-of-life-controls">
    <button id="start">Start</button>
    <button id="pause">Pause</button>
    <button id="next-step">Next Step</button>
    <button id="spawn-glider">Spawn Glider</button>
    <button id="toggle-edges">Toggle Edge Behavior: Wrap Around</button>
  </div>

  <div class="game-of-life-controls">
    <label for="speed">Speed:</label>
    <input type="range" id="speed" min="1" max="100" value="10">
    <span id="speed-value">10</span>
  </div>

  <div id="canvas-container"></div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
<script src="/assets/js/Game-of-Life/gameOfLife.js"></script>

## Rules

1. Any live cell with fewer than two live neighbors dies, as if by underpopulation.
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

## More
Before my 1st game project in DigiPen, this was one of our assignments. The purpose of the assignment was to to make us more experience with using a graphic library and teach us the concept of double buffering. Since the assignment was done in C++, I decided to reimplement for the browser using the [p5.js](https://p5js.org/) library.

# Sources
[Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
[TheCodingTrain](https://www.youtube.com/watch?v=FWSR_7kZuYg)