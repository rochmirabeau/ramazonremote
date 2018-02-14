# ramazonremote

# Roch Amazon App
The roch amazon remote upload failed edition

## Included Files:
## Functions:
## To Do:
## Example Gifs:

### Included Files:
The app contains the following files:
1. crud.js - A javascript file handling some of the logic for updating the SQL database
2. rochamazon.js - A customer view of the Roch Amazon App
3. rochamazonManager.js - A manager view of the Roch Amazon App
4. schema.sql - a schema file for creating a template database
5. seeds.sql - a seeds file for populating the database
6. tableinserts.csv - a csv file for populating the database if you don't like seeds.

### Functions:
This app is a basic replica of an online store, allowing 2 possible views: a customer view and a manager view.  
The customer view allows the user to view the inventory and purchase an amount of items from the database.  If the user requests too many of the item, an error is returned and the app stops.  If the user requests an amount that is available, the app calculates the total price based on the amount requested and the price of the item.  The app then calculates quantity of the item left after purchase.
The manager view gives more control of the database via the command line.  The user is prompted with options ranging from checking and adding inventory, to adding completely new products.  After answering all of the prompts, the app will collect the data and execute a SQL command to update the database accordingly, see some of the gifs attached for examples.

### To Do:
⋅⋅* A supervisor view is yet to be added, this view would create a new table allowing the user to view profit potential.  
⋅⋅* Error handling for input types will be implemented as well, preventing users from entering letters where numbers are expected or including dollar signs where they are not required. 
⋅⋅* Proper handling of application exit
