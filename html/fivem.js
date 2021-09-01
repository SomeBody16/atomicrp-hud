const fivemCall = ({action, args}) => {
  let func = hudManager;
  const arr = action.split('.');
  do {
    func = func[arr.shift()];
  } while (arr.length)

  func(...args);
}
const fivemCallArr = (arr) => arr.forEach(fivemCall);
window.addEventListener('message', event => fivemCallArr(event.data));

/**
 * data: [
 *  {
 *   action: 'setShow',
 *   args: [true],
 *  },
 *  {
 *   action: 'stats.hide',
 *   args: ['armor'],
 *  },
 * ]
 */
