---
layout: post
title:  "Pathfinding"
date:   2023-05-01 04:25:25 +0800
categories: Interactive
tags:
  - Data Structure
  - Algorithms
excerpt: "An Interactive pathfinding page to display Dijkstra and A Star Pathfinding."
banner:
  loop: true
  volume: 0.8
  start_at: 8.5
  image: "/assets/images/Pathfinding/Pathfinding.gif"
  opacity: 0.618
  background: "#000"
  height: "100vh"
  min_height: "38vh"
  heading_style: "font-size: 4.25em; font-weight: bold; text-decoration: underline"
  subheading_style: "color: gold"
---
<style>
    .full-width-iframe-container {
        width: 100vw; /* Viewport width */
        height: 70vw;
        position: relative; /* For positioning context */
        left: 50%; /* Move the center of the element to the middle */
        right: 50%;
        margin-left: -50vw; /* Pull it back to the left edge */
        margin-right: -50vw; /* Extend it to the right edge */
        overflow: hidden; /* Prevents horizontal scrollbar */
        min-height: 300px; /* Default minimum height */

    }
    .responsive-iframe {
        position: relative;
        overflow: hidden;
        padding-top: 56.25%; /* Maintain 16:9 aspect ratio */
        height: 0;
        min-height: 300px; /* Default minimum height */
    }
    .responsive-iframe iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    
</style>



<br>

**Not Mobile-Friendly**

<div class="full-width-iframe-container">
    <div class="responsive-iframe">
        <iframe src="/assets/iframe/Pathfinding/controls.html" frameborder="0" allowfullscreen></iframe>
    </div>
</div>
    
<script src="/assets/js/Pathfinding/cell.js"></script>
<script src="/assets/js/Pathfinding/dijkstra.js"></script>
<script src="/assets/js/Pathfinding/a_star.js"></script>
<script src="/assets/js/Pathfinding/sketch.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>




