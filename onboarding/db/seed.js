const db = require('./db');
const {Merchant, MerchantAccount} = require('./models');

async function seed(){
    await db.sync({force:true});
    console.log("Synced DB")
    await createMerchants();
    await db.close();
}

async function createMerchants(){
   
    const merchant = await Merchant.create({
            name:  "Store One"
        });
    await MerchantAccount.create({
            name:  "US Store",
            MerchantPk: merchant.pk
        });
}
seed();

