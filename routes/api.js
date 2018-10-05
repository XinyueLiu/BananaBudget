const express = require('express')
const budgetService = require('../service/budget')
/*
  Banana Budget API
*/
module.exports = app => {
  app.get('/api/bananabudget/:s_date/:n_day', budgetService.getBudget);
};
