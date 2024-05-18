---
layout: post
title:  "Untitled Networking Game"
date:   2023-03-01 04:25:25 +0800
categories: Game
tags:
  - Game
  - Networking
banner:
  loop: true
  volume: 0.8
  start_at: 8.5
  image: "/assets/images/Untitled_Networking_Game/client/202124.png"
  background: "#000"
  height: "100vh"
  min_height: "38vh"
  heading_style: "font-size: 4.25em; font-weight: bold; text-decoration: underline"
  subheading_style: "color: gold"
---

A top down multiplayer game and server made with winsock.

### Language
**C++** 

For the game development


## Libraries Used

# Client
- Alpha-Engine, a Digipen devoloped graphics libraby, that utilises OpenGL
- [WinSock](https://learn.microsoft.com/en-us/windows/win32/winsock/getting-started-with-winsock)

# Server
- [GLEW](https://glew.sourceforge.net/)
- [GLFW](https://www.glfw.org/)
- [ImGui](https://github.com/ocornut/imgui)
- [WinSock](https://learn.microsoft.com/en-us/windows/win32/winsock/getting-started-with-winsock)

# Tools
- [Wireshark](https://www.wireshark.org/)
- [Tiled](https://www.mapeditor.org/)

## Overview
**Computer Networks Project**

In my Computer Network Module, we learn the basics of networking. At the end of the module, we had to create a multiplayer game from scratch using the Windows Socket Library and grpahic library of our choice, ```#include <WinSock2.h>```

After learning networking fundamentals, such as TCP and UDP, a three way handshake, and how data is sent. A requirement for the game is for 3 core networking features to be implemented which are:
- Server Reconcilation
- Client Prediction
- Entity Interpolation


After implementing the various techniques, we then had to test its effectiveness by artificially causing lag with a script provided by out professor.
<img alt="Client-side prediction + server reconciliation." src="https://www.gabrielgambetta.com/img/fpm2-05.png">

## Roles and Task

For the client side, I set up the the 
- Graphics
- Client to Server Connection
- Client Predition

For the Server:
- Set up the project, threads that receives messages from connected clients
- Set up ImGui and various interfaces to send commands that

## Assets
- [Pixel Adventure](https://pixelfrog-assets.itch.io/pixel-adventure-1)

## Research Material
- [Gabriel Gambetta](https://www.gabrielgambetta.com/client-side-prediction-server-reconciliation.html)
- [Ruoyu Sun](https://ruoyusun.com/2019/03/28/game-networking-1.html)
- [Gaffer On Games](https://gafferongames.com/post/introduction_to_networked_physics/)

## Summary

With many popular online and multiplayer games, it is easy to forget the amount of work and the increased complexity that goes into developing it. Many major engines such as Unity, Godot or Unreal Engine have libraries and frameworks that simplify the process. 

## Screenshots and explanation

**Client Menu screen**
When the user launches the game, they will be greeted with a simple menu screen.
![MenuScreen](/assets/images/Untitled_Networking_Game/client/201307.png)

**Client Lobby Screen**
<br>
Clicking on the join game button, will bring then to a server connect screen. Since i am launching both client and server on my machine, i will connect to the localhost and use the default port 5050
![ConnectToLobby](/assets/images/Untitled_Networking_Game/client/201856.png)

**The game screen**
<br>
When the user successfully connects to the server, it will wait for the game to start.

![GameScreen](/assets/images/Untitled_Networking_Game/client/202124.png)

**The server UI**
<br>
This is the server UI. It allows the server host to control various aspects of the game such as 

- Which map to load
- Viewing how many players are connected
- View player stats
- Send custom commands to any or all players

It is important for both the client and the server to have the same copy of the map. The map data read by the client is purely for rendering purposes whereas the map data in the server is used for physics and collision detection.

When any client does an input, it will compact it into a small message and sent to the server. The server will receive the message, validate it, update the clients position and broadcast it to the other clients.  

![ServerUI](/assets/images/Untitled_Networking_Game/server/201912.png)

**Player Connected**
<br>
When a player is connected, it will show in the server

![PlayerConnected](/assets/images/Untitled_Networking_Game/server/202015.png)

**Player Stats**
<br>

![PlayerStats](/assets/images/Untitled_Networking_Game/server/202217.png)
---

