module.exports = (content) => { // eslint-disable-line arrow-body-style
  return `${content.toString('utf-8').replace('module.exports', 'var sqip')} module.exports = sqip.preview; module.exports = Object.assign(module.exports, sqip);`
}
