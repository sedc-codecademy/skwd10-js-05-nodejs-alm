Create an API for a phonebook application using ExpressJS.

The application should be able to handle several CRUD Operations.



The User/Client/Front End should be to GET all people in the phonebook database
The User should be able to GET a single person by ID
The User should be able to create a new person in the database with a name, phoneNumber, picture, and an ID generated on the backend.
Bonus 1: The user should be able to delete a person from the phonebook database.
Bonus 2: The user should be able to edit a person in the database (Change the name, picture or the phoneNumber)
Bonus 3: Add a middleware that checks if the phoneNumber has exactly 6 characters. If it does it should let the request move on to the next middleware. If not, it should respond with an appropriate message.
За starting dummy data може да го користите овој .json

[

  {

    "id": "ab3a226f-d821-4268-8f56-c99d54b808c9",

    "name": "Leanne Graham",

    "phoneNumber": "770736",

    "imgSrc": "https://randomuser.me/api/portraits/women/44.jpg"

  },

  {

    "id": "378910e3-f64c-4ec6-aaf6-8d7059f94303",

    "name": "Ervin Howell",

    "phoneNumber": "010692",

    "imgSrc": "https://randomuser.me/api/portraits/men/32.jpg"

  },

  {

    "id": "267efc9b-7b71-4fc2-a658-5f20a38fc4a0",

    "name": "Clementine Bauch",

    "phoneNumber": "219477",

    "imgSrc": "https://randomuser.me/api/portraits/women/63.jpg"

  }

]



Слики можете да најдете на овој сајт.

https://www.uifaces.co/browse-avatars/

