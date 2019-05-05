export const formatTime = (milliseconds = 0) => {
  const hours = `0${new Date(milliseconds).getHours() - 1}`.slice(-2);
  const minutes = `0${new Date(milliseconds).getMinutes()}`.slice(-2);
  const seconds = `0${new Date(milliseconds).getSeconds()}`.slice(-2);

  const time = `${hours || 0}:${minutes || 0}:${seconds || 0}`;
  return time;
};
