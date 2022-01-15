_Plastic is a "company" that specifically handles credit card transactions 
The initial build of this "company" will ignore the construct of a processor
We will assume that once transactions are entered in the Database, they are processed somehow_

The first iteration of application uses the following entities 

### Seller: The merchant trading goods or services for compensation 
    - pk (int)
    - publicId (UUID)
    - businessName (string)

### Buyer: The consumer exchanging compensation for goods/services
    - pk (int)
    - publicId (UUID)
    - name (string)
    - active (bool)

### Card: A card that may used by a Buyer on a transaction 
    - pk
    - publicId (UUID)
    - cardNumber (encrypted string) //We will pretend for this exercise that PCI compliance does not exist and is not necessary
    - expirationDate (date)
    - active (bool)
    - cardTypePk (fk)
    - cardBrandPk (fk)

### Transaction : An Exchange of money for goods between a buyer and seller
    - pk
    - publicId (UUID)
    - CardPk
    - BuyerPk
    - SellerPk
    - settlementAmount (Decimal)  We will also ignore the proper storage of monetary values for this initial exercise)
    - settlementDateTime (dateTime)


