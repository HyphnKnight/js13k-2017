

export const dealDamage = (defChar, damage) => {
  console.log(`Dealing Damage`);
  const [data, , , status] = defChar;
  const shield = status.find(({ type }) => type === `shield`);
  if(shield) damage *= (1 - shield.effect);
  console.log(`Deal ${damage} Damage to ${data.name}`);
  defChar[1] -= damage;
};

export const heal = (defChar, heal) => {
  defChar[1] = Math.min(defChar[1] + heal, defChar[0].maxHealth);
};

export const handlStatuses = (character) => {
  const [, , , statuses] = character;
  console.log(`handling Statuses: ${statuses.length}`);
  character[3] = statuses.map((status) => --status.duration < 0 ? false : status).filter(x => x);
  statuses.forEach(status => {
    console.log(`handling Status: ${status.type}`);
    switch(status.type) {
      case `damage`:
        dealDamage(character, status.effect);
        break;
      case `heal`:
        heal(character, status.effect);
        break;
    }
  });
};
