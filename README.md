# Functional turn-based game logic #

This is an example prototype on making games with React, Redux and use of functional programming. 


## How it works

It implements a very basic turn-based game logic.

In this example every turn consists of two phases:

Phase #1: The player phase.

Phase #2: The compute phase.

When every participant in a phase is done performing actions (e.g. moving around), 
the next phase gets triggered. When the phase index exceeds the number of defined phases 
a new turn begins and phases start over again.

### Please note
This was my first excercise with Redux and functional programming. 
Although I always try to create best practice, scalable code and to avoid anti-patterns, 
it might be very well possible that I failed in some cases.

Therefore I really appreciate any tips and improvements.
Especially on how to decouple world and cycle modules.


## Dev Stack

The frontend UI is built with React.

The 3d game world itself is built with React as well, but uses [react-three-renderer](https://github.com/toxicFork/react-three-renderer/).

For state management I used Redux.

I used [seamless-immutable](https://github.com/rtfeldman/seamless-immutable) for immutable data structures and because it's so seamless :)

The build system uses webpack, gulp and that sort of things.

The project is written in ES6/7 and transpiled using babel.


## Getting started

To run the game install npm dependencies:

```npm install```

Then start the dev server with:

```gulp dev```

It may take a few seconds till the server is ready.