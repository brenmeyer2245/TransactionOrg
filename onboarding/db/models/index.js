const Merchant = require('./merchant');
const MerchantAccount = require('./merchantAccount');

Merchant.hasMany(MerchantAccount);

module.exports = {
    Merchant,
    MerchantAccount
}