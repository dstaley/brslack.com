var fs = require('hexo-fs');
var pathFn = require('path');

hexo.extend.helper.register('inline_css', function(args) {
  var path = pathFn.join(hexo.theme_dir, 'source', args);
  var style = hexo.render.renderSync({ path, engine: 'scss' });
  return `<style>${style}</style>`;
});