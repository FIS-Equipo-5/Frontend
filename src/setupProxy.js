const proxy = require('http-proxy-middleware');


const API_TRANSFERS_URL = (process.env.TRANSFERS_URL || 'http://localhost:3000');
const API_TEAMS_URL = (process.env.TEAMS_URL || 'http://localhost:3001');

module.exports = function(app) {
  app.use(proxy('/api/v1/transfers', {target: API_TRANSFERS_URL}));
  app.use(proxy('/api/v1/transfer/', {target: API_TRANSFERS_URL}));
  app.use(proxy('/api/v1/teams', {target: API_TEAMS_URL}));
};