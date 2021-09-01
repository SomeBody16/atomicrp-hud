const fivemCall = ({action, args}) => {
  let func = hudManager;
  const arr = action.split('.');
  do {
    func = func[arr.shift()];
  } while (arr.length)

  func(...args);
}

window.addEventListener('message', event => fivemCall(event.data));

/**
 * data: {
 *   action: 'setShow',
 *   args: [true],
 * }
 *
 * data: {
 *   action: 'stats.hide',
 *   args: ['armor'],
 * }
 */
