const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data', 'db.json');
const SEED_FILE = path.join(__dirname, 'seed.json');

if (!fs.existsSync(DATA_FILE)) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.copyFileSync(SEED_FILE, DATA_FILE);
}

const db = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

function save() {
  const tmp = DATA_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(db, null, 2));
  fs.renameSync(tmp, DATA_FILE);
}

function nextId(list, key) {
  return list.reduce((max, item) => Math.max(max, item[key]), 0) + 1;
}

function ok(res, data = {}) {
  res.status(200).json({ status: 200, error_message: '', ...data });
}

function fail(res, code, message) {
  res.status(code).json({ status: code, error_message: message });
}

module.exports = { db, save, nextId, ok, fail };