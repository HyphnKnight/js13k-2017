
export const animateFoward =
  (duration, offset = Date.now() % duration) =>
    () =>
      Math.min((Date.now() + offset) % duration / duration, 1);

export const animateFowardNoRepeat =
  (duration, offset) => {
    const start = Date.now();
    let value = 0;
    const anim = animateFoward(duration, offset);
    return () => Date.now() - start < duration
      ? value = Math.max(value, anim())
      : 1;
  };

export const animateReverse =
  (duration, offset = Date.now() % duration) =>
    () =>
      1 - Math.min((Date.now() + offset) % duration / duration, 1);

export const animateAlternate =
  (duration, offset = Date.now() % duration) =>
    () =>
      Math.max(Math.min(Math.abs((Date.now() + offset) % duration / (duration / 2) - 1), 1));
