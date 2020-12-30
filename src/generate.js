function createText(text) {
  const match = text.match(/\{\{(.+?)\}\}/);
  if (match) {
    return `_string(${match[1]})`
  } else {
    return text;
  }
}

function generateCode(node, index) {
  const prefix = index === 0 ? '' : ',';

  if (node.type === 'text') {
    return `${prefix}_createText(${createText(node.data)})`
  }

  if (node.type === 'tag') {
    return `${prefix}_creatElement('${node.name}', {}, [ ${ node.children ? generate(node.children) : '' } ])`
  }

  if (node.type === 'if') {
    return `${prefix}_if(${node.expression}, function() { return ${ node.if ? generate(node.if) : '[]' } }, function() { return ${ node.else ? generate(node.else) : '[]' } })`
  }
}

function generate(nodes) {
  let code = '';

  for (let i = 0, len = nodes.length; i < len; i++) {
    let node = nodes[i]
    code += generateCode(node, i)
  }

  return code
}

export { generate };