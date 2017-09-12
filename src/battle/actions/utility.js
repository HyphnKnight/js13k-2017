

export const dealDamage = (defChar, damage) => {
  const [, , , status] = defChar;
  const shield = status.find(({ type }) => type === `shield`);
  if(shield) damage *= (1 - shield.effect);
  defChar[1] -= damage;
};

export const heal =
  (defChar, heal) =>
    defChar[1] = Math.min(defChar[1] + heal, defChar[0].maxHealth);

export const handlStatuses = (character) => {
  const [, , , statuses] = character;
  character[3] = statuses.map((status) => --status.duration < 0 ? false : status).filter(x => x);
  statuses.forEach(status => {
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
