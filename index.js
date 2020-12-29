import { Tokenize } from './src/tokenize';

function tokenize(input) {
  return new Tokenize(input).scan();
}
export { tokenize }