import tokenizer from './src/tokenizer';
import parser from './src/parser';
import transform from './src/transform';
import generate from './src/generate';

function compile(template) {
  const tokens = tokenizer(template);
  const ast = parser(tokens);
  const code = generate(ast);
  const dynamicFunction = new Function(`return ${code}`);
  return dynamicFunction();
}

export { tokenizer, parser, generate, compile }