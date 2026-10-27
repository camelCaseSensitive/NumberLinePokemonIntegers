// Load Pokemon art only when it is actually needed, rather than
// downloading/decoding all 150 sprites before the game can start.
let pokeImages = new Array(151); // National Dex #001 through #151, including Mew
const pokemonImageRequested = new Set();
const SHOW_HELP_ARROW = true; // Change to false to test with the arrow disabled.

function getPokemonImage(index) {
  if (!Number.isInteger(index) || index < 0 || index >= pokeImages.length) return null;
  if (!pokemonImageRequested.has(index)) {
    pokemonImageRequested.add(index);
    loadImage(`${index + 1}.png`,
      img => { pokeImages[index] = img; },
      err => { console.warn(`Could not load Pokemon image ${index + 1}.png`, err); }
    );
  }
  return pokeImages[index] || null;
}

function preload() {
  ash = loadImage("ash-ketchum-walk.png")
  pixFont = loadFont("Minecraft.ttf")
  ftprnt = loadImage("lighterprint.png")
  pokeball = loadImage("pokeball.png")
}

// The canvas uses a 1920 x 600 coordinate system. CSS scales it to fit
// the available window without changing the game's internal positions.
const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 600;

// Visible number line and walking boundaries (from version 2).
const minP = -9;
const maxP = 9;

// Integer n maps to the same horizontal location as Ash at position n.
// count = 20 + 2*n, so Ash is drawn at ash.width/4 * count.
function xFromNumber(n) {
  return ash.width / 2 * (10 + n);
}

function worldScale() {
  // Fit every tick into the canvas, but don't over-enlarge the sprites.
  const lineWidth = xFromNumber(maxP) - xFromNumber(minP);
  const requiredWidth = lineWidth + 100; // end caps + spacing
  return Math.min(0.75, (width - 140) / requiredWidth);
}

function setup() {
  // Avoid enormous high-DPI backing buffers on Chromebooks.
  pixelDensity(1);
  const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  // Works both in a normal HTML page and in editors without this div.
  if (typeof document !== 'undefined' && document.getElementById('sketch-holder')) {
    canvas.parent('sketch-holder');
  }
  canvas.style('display', 'block');
  canvas.style('background-color', '#ffffff');
  canvas.style('width', '100%');
  canvas.style('height', 'auto');
  imageMode(CENTER)
  rectMode(CENTER)
  textFont(pixFont)
  textAlign(CENTER)
  frameRate(24)
  textSize(60)
  s = 0.1
  ash.resize(ash.width*s, ash.height*s)
  ftprnt.resize(ftprnt.width*s*0.8, ftprnt.height*s*0.8)
  pokeball.resize(pokeball.width*s/2, pokeball.height*s/2)
  getPokemonImage(Pokemon.indexOf(yourPokemon[0])); // warm up starter sprite
  // image(ash, 100, 200, 100, 200)
  // image(ash, 0, 0, ash.width/2, ash.height, 0, 0, ash.width/2, ash.height)
  
}

let count = 20;

let enterWait = 0;

let Pokemon= ["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr. Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"];

let yourPokemon = [];

let strt = Math.random() 

if(strt > 0.5) strt = Math.random() 

yourPokemon.push(Pokemon[Math.floor(strt * Pokemon.length)])

let add = false;
let add2 = false;

let sub = false;
let sub2 = false;

let walking = false;
let facing = 1;

let startCount = 20;

let startPos = startCount - count;

let ans = 3;

let showAns = false;

let newQuetion = false;

let question = "0 + 3"
let answer = "0 + 3 = 3"

let pCorrect = 3;

let even = 2;

let prints = [];
let right = true;

let wrongAnswer = false;
let wait = 0;

let showArrow = false;

let score = 0;
let lives = 1;
let pokeRow = 12;

let congrats = false;
let congratsWait = 0;
let congratsP = 0;

let correct = false
let correctWait = 0;
let correctP = 0;

let showImage = 0;
let newPokeIndex = 0;
let pokeLocation = 3;

let misses = 0;

let pressEnter = false;
let p = 0;

function draw() {
  background(255);
  enterWait ++
  
   // image(pokeImages[0], mouseX, mouseY)
  
  if(score < 0){
    showArrow = true
  } else {
    showArrow = false;
  }
  
  let hoverIndex = -1;
  for(let i = 0; i < lives; i++){
    if(i == lives-1 && congrats){
      push()
        translate(50 + 55*i - floor(i/pokeRow)*55*pokeRow, 50 + floor(i/pokeRow)*55)
        // scale(1 + (90 - congratsWait)/ 90)
        scale(1 + (90 - congratsWait)/ 90 * sin(congratsWait/2)/2)
        image(pokeball, 0, 0)
      pop()
    } else if(i == lives-1 && wrongAnswer){
      push()
        // translate(50 + 55*i, 50)
        translate(50 + 55*i - floor(i/pokeRow)*55*pokeRow, 50 + floor(i/pokeRow)*55)
      
        // scale(1 + (90 - congratsWait)/ 90)
        scale(1 - wait/90)
        image(pokeball, 0, 0)
      pop()
    } else {
      push()
        translate(50 + 55*i - floor(i/pokeRow)*55*pokeRow, 50 + floor(i/pokeRow)*55)
        // image(pokeball, 50 + 55*i, 50)
        image(pokeball, 0, 0)
      pop()
    }
    
    if(dist(mouseX, mouseY, 50 + 55*i - floor(i/pokeRow)*55*pokeRow, 50 + floor(i/pokeRow)*55) < 55/2) {
      hoverIndex = i;
      
    }
    
  }
  
  if(hoverIndex != -1){
    push()
      textSize(24)
      rectMode(CENTER)
      rect(mouseX, mouseY - 10, yourPokemon[hoverIndex].length*17, 40)
      text(yourPokemon[hoverIndex], mouseX, mouseY)
      noFill()
      strokeWeight(2.5)
      rect(mouseX, mouseY+50, 50, 50)
      const hoveringSprite = getPokemonImage(Pokemon.indexOf(yourPokemon[hoverIndex]));
      if (hoveringSprite) image(hoveringSprite, mouseX, mouseY+50, 50, 50)
    pop()
  }
  
  
  push()
    translate(1725, 90)
    textSize(30)
    text("S C O R E:  " + score, 0, 0)
    // if(showImage){ 
    //   showImage ++
    //   if(showImage > 90) showImage = 0;
    //   image(pokeImages[newPokeIndex], 0, 100, 100, 100)
    // }
  pop()
  
  
  // Center the problem and show either the question or its answer,
  // never both printed on top of one another.
  push()
    textAlign(CENTER)
    text(showAns ? answer : question, width/2, 100)
  pop()
  
  
  p = round((count-20)/2)
 
  // push()
  //   textAlign(LEFT)
  //   textSize(22)
  //   text(yourPokemon, 25, 200)
  // pop()
  
  
  // Center zero on the canvas; keep the entire -9..9 line visible.
  // The line itself is fixed at canvas y=450. All world elements (Ash,
  // footprints, popup animations, answer locations) get the SAME transform.
  push()
  translate(width/2, 450)
  scale(worldScale())
  translate(-xFromNumber(0), -400)

  // console.log(right)
  for(let p in prints){
    // image(ftprnt, prints[p] - ash.width/4, 300)
    push()
      translate(prints[p] - ash.width/4 , 300 - 7 * (p%2))
      if(!right) translate(ash.width/2, 0)
      image(ftprnt, 0, 0)
    pop()
    
    push()
      translate(prints[p] - ash.width/4 +51, 300 - 7 * (p%2) + 10 * (p%2 * 2 -1))
      if(!right) translate(ash.width/8, 0)
      image(ftprnt, 0, 0)
    pop()
    
    // console.log(p%2)
  }
  
  // console.log(prints[0]/ash.width/4)
  // console.log(startCount)
  
  // Draw arrow
  if(showArrow && SHOW_HELP_ARROW) {
    push()
    translate(0, -110)
    if(p > (startCount-20)/2) { 
      push()
        translate(0, 100)
        strokeWeight(9)
        // stroke(0, 225, 0)
        stroke(0)
        line(ash.width/4 * startCount, 450, ash.width/4 * count - 10, 450)
        fill(0)
        triangle(ash.width/4 * count - 50, 430, ash.width/4 * count-10, 450, ash.width/4 * count - 50, 470)
        strokeWeight(1)
        // textSize(20)
        text("+" + -((startCount-20)/2 - p), (ash.width/4 * startCount + ash.width/4 * count)/2, 550)
      pop()
    }

    if(p < (startCount-20)/2) { 
      push()
        translate(0, 100)
        strokeWeight(9)
        // stroke(225, 0, 0)
        stroke(0)
        line(ash.width/4 * startCount, 450, ash.width/4 * count + 10, 450)
        fill(0)
        triangle(ash.width/4 * count + 50, 430, ash.width/4 * count+10, 450, ash.width/4 * count + 50, 470)
        strokeWeight(1)
        text( -((startCount-20)/2 - p), (ash.width/4 * startCount + ash.width/4 * count)/2, 550)
      pop()
    }
    pop()
  }
  
  // End draw arrow
  
  
  
  
  // Clear number line with visible ticks, including a heavier zero tick.
  // Version 2's bounded line, centered using the same coordinates as Ash.
  push()
    const lineY = 400;
    const tickTop = lineY - 25;
    const tickBottom = lineY + 25;
    const labelY = lineY + 75;

    stroke(0);
    strokeWeight(3);
    line(xFromNumber(minP) - 40, lineY, xFromNumber(maxP) + 40, lineY);

    for(let i = minP; i <= maxP; i++){
      strokeWeight(i === 0 ? 6 : 3);
      line(xFromNumber(i),
           i === 0 ? tickTop - 10 : tickTop,
           xFromNumber(i),
           i === 0 ? tickBottom + 3 : tickBottom);
      noStroke();
      fill(0);
      textSize(48);
      text(i, xFromNumber(i), labelY);
      stroke(0);
    }
  pop()
  
  if(showImage){
    showImage++;
    if(showImage > 90) showImage = 0;
    const caughtSprite = getPokemonImage(newPokeIndex);
    if(caughtSprite){
      push()
        translate(ash.width/2*(10+pokeLocation), 490)
        if(showImage < 20){
          scale(sin(showImage/10))
        } else if(showImage >= 20 && showImage < 75){
          scale(sin(2))
        } else {
          scale(sin(showImage/10))
        }
        image(caughtSprite, 0, 0, 150, 150)
      pop()
    }
  }
  
  if(frameCount == add2){
    count += 1
    add2 = false;
    walking = false;
    // prints.push(p)
    if(!right){
      prints.pop()
    } 
  }
  
  if(add){
    count += 1;
    add2 = add + 7;
    add = false;
    if(prints.length == 0) {
      right = true
    }
    if(right){
      prints.push(ash.width/4 * count)
    } 
  }
  
  if(frameCount == sub2){
    count -= 1
    sub2 = false;
    walking = false
    if(right){
      prints.pop()
    }
  }
  
  if(sub){
    count -= 1;
    sub2 = sub + 7;
    sub = false;
    if(prints.length == 0) right = false;
    if(!right) {
      prints.push(ash.width/4 * count)
    }
  }
  
  
  translate(ash.width/4 * count , 250)
  
  if(wrongAnswer){
    push()
      noFill()
      strokeWeight(6)
      translate(0, -150)
      rect(0, 0, 67, 70)
      fill(0)
      text("!", 2, 20)
    pop()
    wait ++
    if(wait > 90){
      wait = 0;
      if(lives > 0) {
        lives -= 1;
        yourPokemon.pop()
      }
      // lives -= 1;
      wrongAnswer = false;
    }
  }
  
  if(congrats){
    push()
      noFill()
      strokeWeight(6)
      translate(- (ash.width/4 * count) + congratsP, -150)
      rect(0, 0, 710 + yourPokemon[yourPokemon.length-1].length*2, 80)
      // if(showImage){ 
      //     showImage ++
      //     if(showImage > 90) showImage = 0;
      //     image(pokeImages[newPokeIndex], (710 + yourPokemon[yourPokemon.length-1].length*2)/2 + 100, 50, 150, 150)
      //   }
      fill(0)
      // text("You caught a Pokemon!", 2, 20)
      text("You caught a " + yourPokemon[yourPokemon.length-1] + "!", 2, 20)
    pop()
    congratsWait ++
    if(congratsWait > 90){
      congratsWait = 0;
      congrats = false;
    }
  }
  
  if(correct){
    push()
      noFill()
      strokeWeight(6)
      translate(- (ash.width/4 * count) + correctP, -150)
      rect(0, 0, 310, 80)
      fill(0)
      text("Correct!", 2, 20)
    pop()
    correctWait ++
    if(correctWait > 60){
      correctWait = 0;
      correct = false;
    }
  }
  
  
  scale(-facing,1)
  if(count %2) {
    image(ash, 0, 0, ash.width/2-1, ash.height, 0, 0, ash.width/2-1, ash.height)
  } else {
    image(ash, 0, 0, ash.width/2, ash.height, ash.width/2+0.5, 0, ash.width/2, ash.height)
  }
  
  
  // if(count  > 29) count  = 0
  pop() // end centered world transform
}

function keyPressed() {
  const currentP = round((count - 20) / 2);
  if(keyCode == RIGHT_ARROW  || keyCode == 68){
     // count += 1
    if(facing == 1 && walking == false && !wrongAnswer && !pressEnter && currentP < maxP){
      add = frameCount;
      walking = true;
    } else {
      facing = 1;
    }
  }
  
  if(keyCode == LEFT_ARROW || keyCode == 65){
     // count += 1
    if(facing == -1 && walking == false && !wrongAnswer && !pressEnter && currentP > minP){
      sub = frameCount;
      walking = true;
    } else {
      facing = -1;
    }
  }
  
  if(keyCode == ENTER && showAns == false && p == pCorrect){
    // enterWait = 0;
    showAns = true;
    pokeLocation = p;
    score ++;
    pressEnter = true
    if(random(0,10) > 8 + yourPokemon.length/(Pokemon.length) - misses/10){
      lives ++;
      misses = 0;
      showImage = 1;
      let rnd = random(0,Pokemon.length-1)
      if(rnd < 0.5) rnd = random(0,Pokemon.length-1)
      if(round(rnd) % 3 == 0) rnd = random(0,Pokemon.length-1)
      yourPokemon.push(Pokemon[round(rnd)])
      newPokeIndex = round(rnd);
      getPokemonImage(newPokeIndex);
      congrats = true;
      congratsP = ash.width/4 * count;
    } else {
      correct = true;
      // console.log(misses)
      misses ++;
      correctP = ash.width/4 * count;
      congratsWait = 0;
      congrats = false;
    }
    even ++ 
  } else if(keyCode == ENTER && enterWait > 20 && showAns == false && p != pCorrect){
    // enterWait = 0
    // if(wrongAnswer == false && lives > 0) lives -= 1;
    
    if(wrongAnswer == false) score -= 1;
    wrongAnswer = true;
    congratsWait = 0;
    congrats = false;
    // correctWait = 0;
    // correct = false;
    
    wait = 0;
  } else if(keyCode == ENTER && showAns == true){
    enterWait = 0;
    showAns = false;
    pressEnter = false;
    correctWait = 0;
    correct = false;
    startCount = count;
    // Version 1 question styles (including +(-n) and -(-n)), with
    // a safeguard so the answer is ALWAYS on the visible -9..9 line.
    // There is no valid +/-10 move from zero on this finite line.
    const maxAvailableStep = Math.max(maxP - p, p - minP);
    let n = round(random(0, 10));
    if(n > 6) n = round(random(1, 10));
    n = Math.min(n, maxAvailableStep);

    const canAdd = p + n <= maxP;
    const canSubtract = p - n >= minP;
    // Alternate preferred directions like version 1. If the preferred
    // direction crosses the edge, use the other one instead.
    const subtract = even % 2 ? canSubtract : !canAdd;
    const useNegativeNotation = Boolean(round(random(0, 1)));

    if(subtract){
      pCorrect = p - n;
      question = useNegativeNotation ? p + " + (-" + n + ")" : p + " - " + n;
    } else {
      pCorrect = p + n;
      question = useNegativeNotation ? p + " - (-" + n + ")" : p + " + " + n;
    }
    answer = question + " = " + pCorrect;
    prints = [];
  }
  
  
  // Avoid the browser scrolling when Arrow keys are used to walk.
  if ([LEFT_ARROW, RIGHT_ARROW, 65, 68, ENTER].includes(keyCode)) return false;
}
