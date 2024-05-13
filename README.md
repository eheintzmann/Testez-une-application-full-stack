[![forthebadge](https://forthebadge.com/images/badges/made-with-java.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://forthebadge.com)

# Yoga

Yoga is a reservation application for the Savasana yoga studio.

## Technologies
- Front-end
  - Typescript
  - Angular 14
  - Node.js 16
- Back-end
  - Java 11
  - Spring Boot 2.6
  - MySql 8

## Git clone

```sh
git clone https://github.com/eheintzmann/Testez-une-application-full-stack.git
```

## Start the project with Docker Compose
1. Install [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)


2. In the project root location,copy .env.example file and name it .env.
Edit this new file, and modify the variables

    ```sh
    MYSQL_ROOT_PASSWORD=   # specifies the password for the MySQL root account (docker only setting)
    MYSQL_DATABASE=test   # specify the name of a database to be created and used
    MYSQL_USER=user       # create a new user that will be granted superuser access on the created database
    MYSQL_PASSWORD=123456 # specify the password of the created user
    ```


3. Run application with Docker compose
   1. From the project root location, run `docker compose up`
   2. Wait until application starts
   3. Yoga application is accessible at http://localhost
   4. (Optional) API is accessible at http://localhost:8080/api/
   5. (Optional) Adminer is available at http://localhost:9090. Connect it to *mysql* server


## Start the project with manual installation 

### Backend

1. Install MySQL 8 (_Official documentation is available at https://dev.mysql.com/doc/ in installation section_)
    1. [Download MySQL Community](https://dev.mysql.com/downloads/mysql/) 
    2. Install MySQL
    3. Start MySQL (verify with `mysql -V`)
    4. If not done during installation, define a root password 

        ```sh
        mysqladmin -u root password 'YourRootPassword'
        ```


2. Create MySQL user and database
   1. Connect yourself to MySQL as root

        ```sh
        mysql -u root -p
        ```

   2. Create the new database `test`

       ```sql
       CREATE DATABASE test;
        ```

   3. Create the user `user` 

        ```sql
        CREATE USER 'user'@'%' IDENTIFIED BY '123456';
        ```

   4. Give all privileges to the new user on newly created database

        ```sql
        GRANT ALL ON test.* TO 'user'@'%';
        ```

   5. Quit MySQL

        ```sql
        exit;
        ```

    _This connects to MySQL as root and allows access to the user from all hosts.  
This is not the recommended way for a production server._


3. Create the schema

    ```sh
    mysql -u root -p test < ressources/sql/script.sql
    ```

4. Install Java Development Kit 11
    1. Download and Install [OpenJDK 11](https://jdk.java.net/archive)
    2. Download and install [Maven](https://maven.apache.org) 


5. Run the application
    1. Go inside `back` folder

        ```sh
        cd back
        ```

    2. Start the application with [Maven](https://maven.apache.org/)

        ```sh
        mvn spring-boot:run
        ```

    3. API is accessible at
    
        [http://localhost:8080/api/](http://localhost:8080)


### Frontend
1. Install [Node.js](https://nodejs.org/) 16 and [yarn](https://yarnpkg.com/)


2. Go inside `front` folder

    ```sh
    cd front
    ```

3. Install dependencies

    ```sh
    yarn install
    ```

4. Launch Front-end

    ```sh
    yarn run start
    ```

5. Navigate to
    [http://localhost:4200/](http://localhost:4200/)

## Test the project

### Frontend tests

1. Install [Node.js](https://nodejs.org/) 16 and [yarn](https://yarnpkg.com/)


2. Go inside `front` folder

    ```sh
    cd front
    ```

3. Install dependencies

    ```sh
    yarn install
    ```

4. Launching tests 
    - Launching **unit** tests

        ```sh
        yarn run test unit
        ```

    - Launching **integration** tests

        ```sh
        yarn run test int
        ```

5. Launching all tests with **coverage**

    ```sh
    yarn run test --coverage
    ```

    Report is available at `front/coverage/jest/lcov-report/index.html`

### End2End tests

1. Install [Node.js](https://nodejs.org/) 16 and [yarn](https://yarnpkg.com/)


2. Go inside `front` folder

    ```sh
    cd front
    ```

3. Install dependencies

    ```sh
    yarn install
    ```


4. Launching e2e tests

    ```sh
     yarn run e2e
    ```

5. Generate coverage report (you should launch all e2e tests before)

    ```sh
    yarn run e2e --headless --watch=false
    yarn run e2e:coverage
    ```
    Report is available at `front/coverage/lcov-report/index.html`

### Backend tests

1. Install Java Development Kit 11
     1. Download and Install [OpenJDK 11](https://jdk.java.net/archive)
     2. Download and install [Maven](https://maven.apache.org)
 

2. Go inside `back` folder

    ```sh
    cd back
    ```

3. Launching tests

    - Launching **unit** tests

        ```sh
        mvn clean test -Dgroups=UnitTest
        ```

    - Launching **integration** tests

        ```sh
        mvn clean test -Dgroups=IntegrationTest
        ```

4. Launching and generating the jacoco code coverage
 
    ```sh
    mvn clean verify
    ```
   
    Report is available at `back/target/site/jacoco/index.html`

## Ressources

### MySQL

SQL script for creating the schema is available at `ressources/sql/script.sql`

By default, the admin account is
- login: yoga@studio.com
- password: test!1234

### Postman collection

For Postman import the collection `ressources/postman/yoga.postman_collection.json`

by following the documentation at

[https://learning.postman.com/docs/getting-started/importing-and-exporting-data/#importing-data-into-postman](https://learning.postman.com/docs/getting-started/importing-and-exporting-data/#importing-data-into-postman)
