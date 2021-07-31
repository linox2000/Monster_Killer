const ATTACK_VALUE = 10;

let chosenMaxLife = 100;
let currentMonsterHelth = chosenMaxLife;
let currentPlayerHelth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackHandler(){
const damage = dealMonsterDamage(ATTACK_VALUE)
currentMonsterHelth-= damage;
}










attackBtn.addEventListener('click',attackHandler)