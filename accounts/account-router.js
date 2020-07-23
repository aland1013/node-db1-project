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

router.post('/', (req, res) => {
  const accountData = req.body;
  // INSERT INTO accounts (...fields) VALUES (...values)
  db('accounts')
    .insert(accountData)
    .then((id) => res.status(201).json({ data: id[0] }))
    .catch((err) => console.log(err));
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  //UPDATE accounts SET field = 'new value' WHERE id = id;
  db('accounts')
    .where({ id })
    .update(changes)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ data: count });
      } else {
        res.status(404).json({ message: 'there was no account to update' });
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;
