// Packs models/*.glb into models/models.js so the page also works when opened with a double-click (file://).
// Usage:  node tools/build-models.js
const fs = require('fs'), path = require('path');
const dir = path.join(__dirname, '..', 'models');
const out = {};
for (const id of ['a', 'b']) {
  const f = path.join(dir, id + '.glb');
  if (fs.existsSync(f)) out[id] = fs.readFileSync(f).toString('base64');
}
fs.writeFileSync(path.join(dir, 'models.js'), 'window.MODEL_DATA=' + JSON.stringify(out) + ';\n');
console.log('models.js:', (fs.statSync(path.join(dir, 'models.js')).size / 1e6).toFixed(1), 'MB', Object.keys(out));
