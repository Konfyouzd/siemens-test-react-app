import greeting from './greeting.txt';

const printGreeting = () => {
  /* eslint-disable no-console */
  console.log(atob(greeting));
  console.log('I\'m a scholar... People like me...');
  /* eslint-enable no-console */
};

export default printGreeting;
