const artists = [
  { 
    name: "Laufey", 
    variety: 3, 
    consistency: 5, 
    horny: 0, 
    gay: 0, 
    virgin: 2, 
    throwingUp: 5, 
    motivational: 2,
    variants: ["cards/laufey.png"]
  },
  { 
    name: "The Weeknd", 
    variety: 4, 
    consistency: 4, 
    horny: 5, 
    gay: 0, 
    virgin: 1, 
    throwingUp: 4, 
    motivational: 0,
    variants: ["cards/the_weeknd_after_hours.png", "cards/the_weeknd_europe.png", "cards/the_weeknd_latam.png", "cards/the_weeknd_sao_paulo.png"]
  },
  { 
    name: "Kendrick Lamar", 
    variety: 3, 
    consistency: 5, 
    horny: 4, 
    gay: 0, 
    virgin: 2, 
    throwingUp: 2, 
    motivational: 5,
    variants: ["cards/kendrick_lamar.png"]
  },
  {
    name: "Kanye West", 
    variety: 5, 
    consistency: 3, 
    horny: 5, 
    gay: 0, 
    virgin: 1, 
    throwingUp: 1,
    motivational: 5,
    variants: ["cards/kanye_west_graduation.png", "cards/kanye_west_808s.png", "cards/kanye_west_mbdtf.png", "cards/kanye_west_yeezus.png", "cards/kanye_west_tlop.png", "cards/kanye_west_donda.png"]
  },
  {
    name: "The Strokes", 
    variety: 3, 
    consistency: 5, 
    horny: 1, 
    gay: 1, 
    virgin: 3, 
    throwingUp: 2,
    motivational: 3,
    variants: ["cards/the_strokes_someday.png", "cards/the_strokes_reptilia.png", "cards/the_strokes_yolo.png", "cards/the_strokes_comedown.png", "cards/the_strokes_angles.png", "cards/the_strokes_abnormal.png"]
  },
  {
    name: "Billy Joel", 
    variety: 4, 
    consistency: 3, 
    horny: 5, 
    gay: 0, 
    virgin: 3, 
    throwingUp: 4,
    motivational: 4,
    variants: ["cards/billy_joel.png"]
  },
  {
    name: "Diddy", 
    variety: 5, 
    consistency: 5, 
    horny: 5, 
    gay: 5, 
    virgin: 5, 
    throwingUp: 5,
    motivational: 5,
    variants: ["cards/diddy.png"]
  },
  {
    name: "Men I Trust", 
    variety: 4, 
    consistency: 3, 
    horny: 0, 
    gay: 0, 
    virgin: 3, 
    throwingUp: 0,
    motivational: 1,
    variants: ["cards/men_i_trust.png"]
  },
  {
    name: "Radiohead", 
    variety: 4, 
    consistency: 5, 
    horny: 2, 
    gay: 1, 
    virgin: 5, 
    throwingUp: 3,
    motivational: 3,
    variants: ["cards/radiohead.png"]
  },
  {
    name: "Tame Impala", 
    variety: 3, 
    consistency: 5, 
    horny: 2, 
    gay: 1, 
    virgin: 4, 
    throwingUp: 2,
    motivational: 2,
    variants: ["cards/tame_impala.png"]
  },
  {
    name: "The Marias", 
    variety: 3, 
    consistency: 4, 
    horny: 1, 
    gay: 1, 
    virgin: 0, 
    throwingUp: 2,
    motivational: 1,
    variants: ["cards/the_marias.png"]
  }
  // {
  //   name: "", 
  //   variety: , 
  //   consistency: , 
  //   horny: , 
  //   gay: , 
  //   virgin: , 
  //   throwingUp: ,
  //   motivational: ,
  //   variants: ["cards/.png"]
  // }
];

let playerDeck = [];
let cpuDeck = [];
let playerCard = null;
let cpuCard = null;

const stats = ['variety', 'consistency', 'horny', 'gay', 'virgin', 'throwingUp', 'motivational'];

// Initialize the decks with randomly chosen variants or a single image
function initializeDecks() {
  playerDeck = artists.map(artist => {
    // If an artist has variants, randomly choose one; otherwise, use the only image
    const randomVariant = artist.variants.length > 1 
      ? artist.variants[Math.floor(Math.random() * artist.variants.length)]
      : artist.variants[0];
    
    return { ...artist, image: randomVariant };
  });

  // Copy playerDeck to cpuDeck (or you can shuffle it differently if needed)
  cpuDeck = [...playerDeck];
}

function displayDeck() {
  const deckElement = document.getElementById('deck');
  deckElement.innerHTML = '';
  playerDeck.forEach((artist, index) => {
    deckElement.innerHTML += `
      <div class="card" onclick="chooseCard(${index})">
        <img src="${artist.image}" alt="${artist.name}" class="artist-img">
        <p>${artist.name}</p>
      </div>
    `;
  });
}

function chooseCard(index) {
  playerCard = playerDeck.splice(index, 1)[0];
  cpuCard = cpuDeck.splice(Math.floor(Math.random() * cpuDeck.length), 1)[0];

  document.getElementById("player-stats").innerHTML = `
    <img src="${playerCard.image}" alt="${playerCard.name}" class="artist-img">
    <p>Name: ${playerCard.name}</p>
  `;
  
  document.getElementById("cpu-stats").innerHTML = `
    <img src="${cpuCard.image}" alt="${cpuCard.name}" class="artist-img">
    <p>Name: ${cpuCard.name}</p>
  `;
  
  determineWinner();
}

function determineWinner() {
  let randomStat = stats[Math.floor(Math.random() * stats.length)];
  let playerStat = playerCard[randomStat];
  let cpuStat = cpuCard[randomStat];

  if (playerStat > cpuStat) {
    document.getElementById('result').innerText = `Player Wins! (Compared: ${randomStat}, Player: ${playerStat}, CPU: ${cpuStat})`;
  } else if (playerStat < cpuStat) {
    document.getElementById('result').innerText = `CPU Wins! (Compared: ${randomStat}, Player: ${playerStat}, CPU: ${cpuStat})`;
  } else {
    document.getElementById('result').innerText = `It's a draw! (Compared: ${randomStat}, Player: ${playerStat}, CPU: ${cpuStat})`;
  }
}

// Initialize the game by selecting random variants or single images
initializeDecks();
displayDeck();
