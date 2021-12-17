const express = require('express');
const apiRouter = express.Router();

apiRouter.use('/merchants', require('./merchants'))
apiRouter.use('/merchant_accounts', require('./merchantAccounts'))

module.exports = apiRouter;