import TokenType from './tokenType';

function parser(tokens) {
  const stack = [];
  const list = [];
  let tokenIndex = 0;
  let node;
  let childNode;

  while (tokenIndex < tokens.length) {
    const token = tokens[tokenIndex];
    switch (token.type) {
      case TokenType.START_TAG_TOKEN:
        stack.push({
          type: 'tag',
          name: token.value,
          attrs: token.attrs,
          directives: token.directives,
          children: []
        })
        break;
      case TokenType.CHARACTER_TOKEN:
        const prevNode = stack[stack.length - 1];
        if (prevNode) {
          prevNode.children.push({
            type: 'text',
            data: token.value
          });
        } else {
          list.push({
            type: 'text',
            data: token.value
          })
        }
        break;
      case TokenType.END_TAG_TOKEN:
        childNode = stack.pop();
        node = stack[stack.length - 1];
        if (node) {
          node.children.push(childNode);
        } else {
          list.push(childNode)
        }
        break;
      case TokenType.EXP_START_IF_TOKEN:
        stack.push({
          type: 'if',
          expression: token.value
        })
        stack.push({
          children: []
        })
        break;
      case TokenType.EXP_THEN_IF_TOKEN:
        childNode = stack.pop();
        node = stack[stack.length - 1];
        if (node) {
          node.if = childNode.children;
        }

        stack.push({
          children: []
        })
        break;
      case TokenType.EXP_END_IF_TOKEN:
        childNode = stack.pop();
        node = stack[stack.length - 1];
        if (node) {
          node.else = childNode.children;
        }

        childNode = stack.pop();
        node = stack[stack.length - 1];
        if (node) {
          node.children.push(childNode);
        } else {
          list.push(childNode)
        }
        break;
    }
    tokenIndex++;
  }

  return list;
}

export { parser };