_Preface_ : _The initial intent of this app is not to replicate processing or processing apps of any kind. It's just to play with scale across three existing companies and create an etl process that will result in consolidated payouts_

# Merchants
- A Company that is this org to process transactions
    \_ pk 
    \_ public_id
    \_ name 

# Merchant Accounts
- An account within the Merchant. This could be a different bank account, region or brand. 
    \_ pk int
    \_ public_id string
    \_ dba_name string (Doing Business As)
    \_ account_last_four (Last four numbers of the funding bank account)

# Transactions
- A transaction initiated by a consumer in exchange for goods or services from a merchant
    \_ pk int
    \_ public_id string
    \_ type string (sale or refund)
    \_ amount decimal (We're only dealing with decimal transactions here)
    



