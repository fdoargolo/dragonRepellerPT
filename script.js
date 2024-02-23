let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["graveto"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'graveto', power: 5 },
  { name: 'adaga', power: 30 },
  { name: 'martelo de mão', power: 50 },
  { name: 'espada', power: 100 }
];
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "Besta",
    level: 8,
    health: 60
  },
  {
    name: "dragão",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "town square",
    "button text": ["Ir para a loja", "Ir para a caverna", "Lutar com dragão"],
    "button functions": [goStore, goCave, fightDragon],
    text: "Você está na praça da cidade. Você vê um sinal que está escrito \"Loja\"."
  },
  {
    name: "store",
    "button text": ["Compre 10 de vida (10 ouros)", "Compre arma (30 ouros)", "Ir para a praça da cidade"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Você entra na loja."
  },
  {
    name: "cave",
    "button text": ["Lutar com Slime", "Lutar com Besta", "Ir para a praça da cidade"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Você entra na caverna e vê alguns monstros."
  },
  {
    name: "fight",
    "button text": ["Atacar", "Desviar", "Fugir"],
    "button functions": [attack, dodge, goTown],
    text: "Você está lutando com um monstro."
  },
  {
    name: "kill monster",
    "button text": ["Ir para a praça da cidade", "Ir para a praça da cidade", "Ir para a praça da cidade"],
    "button functions": [goTown, goTown, goTown],
    text: 'O monstro grita "AAAAAAAAAHSDAJLS!" e morre. Você ganha pontos de experiência e acha ouro.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "VOCÊ MORREU. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "Você derrotou o dragão! VOCÊ VENCEU O JOGO! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Ir para a praça da cidade?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "Você achou o jogo secreto. Escolha um número entre 0 e 10. Um número será sorteado. Se você acertar o número entre os sorteados, você vence o jogo!"
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "Você não tem moedas o suficiente para isso.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Agora você tem " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " No seu inventário você tem: " + inventory;
    } else {
      text.innerText = "Você não tem ouro o suficiente para comprar uma arma.";
    }
  } else {
    text.innerText = "Você já tem a arma mais poderosa!";
    button2.innerText = "Vender a arma por 15 moedas de ouro.";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Você vendeu a " + currentWeapon + ".";
    text.innerText += " No seu inventário você tem: " + inventory;
  } else {
    text.innerText = "Não venda sua única arma!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {

  //pronomes dos monstros

  let monsterPronoun;
  switch (fighting) {
    case 0:
      monsterPronoun = "O ";
      break;
    case 1:
      monsterPronoun = "A ";
      break;
    case 2:
      monsterPronoun = "O ";
      break;
  }

  //pronome das armas
  //poderia ter utilizado o if, deixaria o código mais curto. Porém, nesse caso, fica mais intuitivo com o switch.

   let weaponPronoun;
  switch (currentWeapon) {
    case 0:
      weaponPronoun = "seu ";
      break;
    case 1:
      weaponPronoun = "sua ";
      break;
    case 2:
      weaponPronoun = "seu ";
      break;
    case 3:
      weaponPronoun = "sua ";
      break;
  }

  text.innerText = monsterPronoun + monsters[fighting].name + " ataca! ";
  text.innerText += "Você ataca com " + weaponPronoun + weapons[currentWeapon].name + ".";


  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " Você errou.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {

    //procurarei uma solução melhor que deixará o codigo mais limpo e organizado do que o switch
    //porém, é apenas a primeira adaptação, deixarei com o switch para facilitar a leitura

    switch (weapons){
      case (weapons[currentWeapon] = 0):
        text.innerText += " Seu " + inventory.pop() + " quebrou.";
      break;
      
      case (weapons[currentWeapon] = 1):
        text.innerText += " Sua " + inventory.pop() + " quebrou.";
      break;
      
      case (weapons[currentWeapon] = 2):
        text.innerText += " Seu " + inventory.pop() + " quebrou.";
      break;
      
      case (weapons[currentWeapon] = 3):
        text.innerText += " Sua " + inventory.pop() + " quebrou.";
      break;
  
    }
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = monsters[fighting].name + " te atacou, mas você desviou.";
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
  healthText.innerText = 0;
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "Você escolheu: " + guess + ". Aqui estão os números aleatórios:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Boa! Você ganhou 20 moedas de ouro!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Puts! Você perdeu 10 de vida!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}