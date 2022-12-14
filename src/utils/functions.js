export const scrollToMax = () => {
  let scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );

  window.scrollBy({
    top: scrollHeight,
    behavior: 'smooth',
  });
};
