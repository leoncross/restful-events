# Restful Events:

1. [Task](#task)
2. [My Approach](#my_approach)
3. [Installation](#installation)
4. [How to run the tests](#how_to_run_tests)
5. [How to run the app](#how_to_run_the_app)

# <a name="task">Task</a>:

The given task was as follows:

Using Nest.js and Firestore, create a microservice capable of handling form definitions and form submissions
- should be able to get, create, update, and delete definitions
- handle, capture and store data to Firestore
- handle service side validation of submissions against definitions


ACCEPTANCE CRITERIA
```
Build a simple Nest.js app
- API to handle CRUD opporations
-- Read of a form definition based on a provided service name (magician, confetti or hottub
-- Creation of a form definition
--- Service name must be unique
-- Update of a form definition
-- Delete of a form definition
-- Submission of a form entry
--- Should validate submission based on schema
---- Read type, check schema ensuring required fields are present, and max length not breached (if provided)
--- Should return 200 if validation pass and storage successful
--- Should return 400 if validation fails
-- store JSON objects in firebase
- Write tests for your services, controllers and e2e
```


# <a name="my_approach">My Approach</a>:
To implement this, I initially started to identify areas of complexity - within the ACs, the key complexity identified was handling submissions against a schema, and providing a true / false result. To do this, I diagrammed both the approach for handling submissions, as well as the project as a whole.

Once I knew the direction I was to take, I followed a strict TDD approach of development - this involved writing a failing unit test for the feature I was implementing, writing the smallest code that would pass the test, then building the feature up. From then, I would refactor and remove superfluous tests / features as necessary.

One of the key limitations I came across in the development of this application was not being able to find a suitable mock database that I could assert against in my unit tests. Because of this, I had to develop my own; which unfortunately ended up (due to time constraints) being a bit of a quick and dirty implementation.

As I had not used the tech stack requested previously, and the time restraints on the completion of the project, I am unfortunately aware of a few of the shortcoming approaches of my implementation - primarily when related to NestJS and the design structure of code (module pattern over MVC).

### Moving forward:

If more time was available for this assignment, I would have focused on the following areas:

- Implement a dedicated module for handling responses and errors bak to the user
- Refactor code to lose the duplication of code from definitions / submissions and have better supporter functions to aid in the reusability of code
- Limit / clean unit tests while still retaining full 100% test coverage. Currently there are tests that are duplicating functionality
- Improve e2e test start-up and shut down. Currently the tests are hitting the main database, and not cleaning up after themselves; all submissions sent through e2e stay in the database.

# <a name="installation">Installation and Configuration</a>:

In an open terminal, type the following:

```bash
git clone https://github.com/leoncross/restful-events.git
cd restful-events
npm install
```

As this project uses Googles Firestore DB, you will need to provide a certs.json file for authorisation to use the DB. Please use the cert provided and paste it into the created cert.json file below.
  
```bash
# in restful-events root
touch certs.json

# copy the provided certs into this file
```


# <a name="how_to_run_tests">How to run the tests</a>:
type the following into a terminal:

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


# <a name="how_to_run_the_app">How to run the app</a>:

At the root layer, type:

```bash
$ npm run start
```

then to test it locally, you can run various curl commands to play with functionality:

```
# gets confetti schema
curl -v http://localhost:3000/definitions/?schema=confetti
```

the '/definitions' end point accepts GET, PUT, POST and DELETE
the '/submissions' end point only accepts POST

all end points require the schema to be defined in the params as above.

To see a run through of all functionality; at the root level, run 
```
npm run test:e2e
```
