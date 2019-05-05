export const formatTime = (milliseconds = 0) => {
  const hours = `0${new Date(milliseconds).getHours() - 1}`.slice(-2);
  const minutes = `0${new Date(milliseconds).getMinutes()}`.slice(-2);
  const seconds = `0${new Date(milliseconds).getSeconds()}`.slice(-2);

  const time = `${hours || 0}:${minutes || 0}:${seconds || 0}`;
  return time;
};

export const fileSizeConverter = size => {
  // use count zeros to work out KB (3 zeros), MB (6 zeros)
  const countZeros = (Math.log(size) / Math.log(10)).toFixed(4);
  // use ture to make sure the witch statement always runs
  switch (true) {
    case countZeros < 3:
      return `${size.toFixed(0)} bytes`;
    case countZeros < 6:
      return `${(size / Math.pow(10, 3)).toFixed(0)} KB`;
    case countZeros < 9:
      return `${(size / Math.pow(10, 6)).toFixed(2)} MB`;
    default:
      return `${size} bytes`;
  }
};
