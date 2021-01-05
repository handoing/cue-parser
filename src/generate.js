function createText(text) {
  const match = text.match(/\{\{(.+?)\}\}/);
  if (match) {
    return `_string(_ctx.data.${match[1]})`
  } else {
    return `"${text}"`;
  }
}

function generateCode(node, index) {
  const prefix = index === 0 ? '' : ',';

  if (node.type === 'text') {
    return `${prefix}_createText(${createText(node.data)})`
  }

  if (node.type === 'tag') {
    return `${prefix}_creatElement('${node.name}', {}, [ ${ node.children ? traversal(node.children) : '' } ])`
  }

  if (node.type === 'if') {
    return `${prefix}_if(_ctx.data.${node.expression}, function() { return ${ node.if ? traversal(node.if) : '[]' } }, function() { return ${ node.else ? traversal(node.else) : '[]' } })`
  }
}

function traversal(nodes) {
  return nodes.map(function(node, i) {
    return generateCode(node, i)
  }).join('');
}

function generate(ast, options) {
  let code = traversal(ast);
  return `function create(_ctx) { return ${code} }`
}

export { generate };