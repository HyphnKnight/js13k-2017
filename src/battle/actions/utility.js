

export const dealDamage = (defChar, damage) => {
  const [, , , status] = defChar;
  const shield = status.find(({ type }) => type === `shield`);
  if(shield) damage *= (1 - shield.percentage);
  defChar -= damage;
};
