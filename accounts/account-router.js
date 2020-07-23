const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
  // SELECT * FROM accounts;
  db('accounts')
    .then((accounts) => res.status(200).json({ data: accounts }))
    .catch((err) => console.log(err));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  // SELECT * FROM accounts WHERE id = id;
  db('accounts')
    .where({ id })
    .then((account) => res.status(200).json({ data: account }))
    .catch((err) => console.log(err));
});

module.exports = router;
