const ATTACK_VALUE = 10;
const ATTACK_MONSTER_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK'
const MODE_STRONG_ATTACK = 'STRONG_ATTACK'

function getMaxLifeValues(){
    const enteredValue = prompt("Maximum life for you and monster", "100");
    
    const parsedValue = parseInt(enteredValue);

    if (isNaN(parsedValue) || parsedValue <= 0)
        throw {message:'Invalid user input, not a number!'};

        return parsedValue;
}
    

let chosenMaxLife;
    try{
        chosenMaxLife = getMaxLifeValues()

    }catch(err){
        console.log(err);
        chosenMaxLife = 100;
        alert('You entered something wrong,default values of 100')
    }

let currentMonsterHelth = chosenMaxLife;
let currentPlayerHelth = chosenMaxLife;
let hasBonusLife = true;
adjustHealthBars(chosenMaxLife);


function reset() {
  currentMonsterHelth = chosenMaxLife;
  currentPlayerHelth = chosenMaxLife;
  resetGame(chosenMaxLife);
}
function endRound() {
  const initialPlayerHelth = currentMonsterHelth;
  const playerDamage = dealPlayerDamage(ATTACK_MONSTER_VALUE);
  currentPlayerHelth -= playerDamage;
  if (currentPlayerHelth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHelth = initialPlayerHelth;
    setPlayerHealth(initialPlayerHelth);
    alert("You would be dead but the bonus life saved you");
  }
  if (currentMonsterHelth <= 0 && currentPlayerHelth > 0) alert("You won");
  else if (currentPlayerHelth <= 0 && currentMonsterHelth > 0)
    alert("You lose");
  else if (currentPlayerHelth <= 0 && currentMonsterHelth <= 0)
    alert("You have draw!");
  if (currentPlayerHelth <= 0 || currentMonsterHelth <= 0) reset();
}
function attack(mode) {
  const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE:STRONG_ATTACK_VALUE;
//   if (mode === MODE_ATTACK) maxDamage = ATTACK_VALUE;
//   else if (mode === MODE_STRONG_ATTACK) maxDamage = STRONG_ATTACK_VALUE;

  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHelth -= damage;
  endRound();
}

function attackHandler() {
  attack(MODE_ATTACK);
}

function strongAttackHandler() {
  attack(MODE_STRONG_ATTACK);
}

function healPlayerHendler() {
  let healValue;
  if (currentPlayerHelth >= chosenMaxLife - HEAL_VALUE) {
    alert("You can't heal to more than your initial value");
    healValue = chosenMaxLife - currentPlayerHelth;
  } else {
    healValue = HEAL_VALUE;
  }

  increasePlayerHealth(healValue);
  currentPlayerHelth += healValue;
  endRound();
}
attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHendler);
