1: Clone this project.

2: Run "npm install" within both the api and the client folder.

3: Create a config.env file in the root of the api folder and add the following 2 lines:

      DB_CONNECTION_STRING = <YourOwnMongoDBConnectionString>/<DB name>
      JWT_SECRET = <EncryptionString>

      Note: <EncryptionString> can be any series of string data, just keep it secret as it is your "encryption" key for the JWT token generator. Also <DB name> you can specify yourself ex. "movierating"

4: Run "npm run dev" in both the api and the client folder via the terminal.

5: View frontend via the provided url in the terminal.

6: Navigate to "Sign Up" and register as a new user - note that this will become your admin.

7: Go to your MongoDB page ex: https://account.mongodb.com/account/login

8: Find the database - if you followed the example it should be called "movierating". Here you will find the collection called "users" and within you will see you newly registered user. Edit this user and change its role to "admin".

9: Return to the frontend running in your browser. Log out and log back in. Then you will have access to the admin functionality.

10: From with the api directory (cd api) run this line in the terminal:

      mongoimport <YourOwnMongoDBConnectionString>/<DB name> --collection genres genres.json

11: Return to the frontend running in your browser and click the 'Add Movie' tab. Here you will find the genre list in the dropdown menu.

12: Now add movies of your choice and assign a fitting genre. *There is a file in the api directory called movies.json where you can "steal" movie info and urls for images if you like. You cannot run it the same way as genres.json, because the genre object id's will not match.

13: You can see the added movies by navigating to the frontpage called 'MovieRating'

13: Log out again and register a new user (it by default be a regular user - non admin). With this user you can now view the films that the admin has added. You can create a review to a given movie by clicking on the specific movie navigating from the front page. You will be able to see your user's review under 'Reviews' in the nav bar. 

14: The 'Request Movie' page will send a message to the admin requesting to add a new movie to the 'MovieRating' side.
