This is an application that handles monetary exchanges between two parties. 
Those parties are simply defined as recipient and sender.
This is to support use cases that include both customer/merchant transactions as well as simple user to user interactions 

Basic Models
### User : A user that is able to create or receive transactions
- pk (int)
- username (string)
- active (boolean)
- password (encryptedString)
- userDisplayName (string)

### UserAccount : The account with which a user makes a transaction 
- pk (int)
- publicId (UUID)
- accountName (string)
- userFk

### Transaction : A monetary exchange between two accounts
- pk (int)
- publicId (UUID)
- recievingAccountFk (int)
- sendingAccountFk (int)
- settlementDate (date)
- status (enum {pending || complete || cancelled })