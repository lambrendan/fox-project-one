Directions For Running the Application:

Starting the server
1. Enter: npm start

Loading the docker database image:
1. Get the mongo image: docker pull mongo
2. Run the database: docker run --name "ENTER NAME OF CONTAINER HERE" -d mongo:tag 
3. Enter the mongo shell: docker exec -it "container name" bash
4. Switch to the correct port: mongo --port "port number"
5. Switch to users: use users
6. Show the databse: db.users.find().pretty()

Commands:
1. COMMAND-LINE MODE:
        a. To enter command-line mode: npm run parseArgs (flags/options)
        b. Check the help flag for more info: npm run parseArgs -h
2. PROMPTING MODE: 
        a. To enter prompt mode: npm run prompt
    