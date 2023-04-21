function returnNumberFrom(a, b){
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

//eslint-disable-next-line
function checkStringLength(string, minLenght, maxLenght){
  return ((string.length >= minLenght) && (string.length <= maxLenght));
}

function getNumber(num){
  return num;
}

export {returnNumberFrom, getNumber};
