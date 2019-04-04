
const easeInOut = (currentTime, start, change, duration) => {
  currentTime /= duration / 2;
  if (currentTime < 1 ) {
    return change / 2 * currentTime * currentTime + start;
  }
  currentTime--;
  return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
}

export const smoothScroll = (node, amount, duration) => {
  const start = node.current.scrollLeft;
  const increment = 20;
  let currentTime = 0;

  const animateScroll = () => {
    currentTime += increment;
    const val = easeInOut(currentTime, start, amount, duration);

    node.current.scrollLeft = val;
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  };

  animateScroll();
}
