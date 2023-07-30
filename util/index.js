const sleep = (sleepTime = 1) => {
  return new Promise((resolve) => {
    setTimeout(resolve, sleepTime);
  });
};
