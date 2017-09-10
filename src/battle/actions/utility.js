

export const dealDamage = (defChar, damage) => {
  const [, , , status] = defChar;
  const shield = status.find(({ type }) => type === `shield`);
  if(shield) damage *= (1 - shield.effect);
  defChar -= damage;
};

export const heal = (defChar, heal) => {
  defChar -= heal;
};

export const handlStatuses = (character) => {
  const [, , , statuses] = character;
  character[3] = statuses.map(({ duration }) => --duration < 0).filter(x => x);
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
