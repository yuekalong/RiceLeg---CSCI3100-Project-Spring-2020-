## CSCI3100 Project - RiceLeg Back End

**CSCI3100 Software Enigeering (Spring 2020) Group Project: RiceLeg**

This software is created by the CSCI3100 students who studied in 2020 semester 2. We are _Group 27_ and this program is the back end of our application.

**Team Member**

- Yue Ka Long <SID: 1155110560>
- Wong Kin Chi <SID: 1155109665>
- Tu Chen Hsien <SID: 1155108479>
- Lam Hiu Lui <SID: 1155109098>
- Lau Ping Tung <SID: 1155111034>

**Build Set Up**

> 1. This back end makes use of express.js and knex.js, and we controll all the node modules by using Yarn, so first please install node.js and yarn first.
>
> 2. According to our set up, we use MySQL database (version 8.0.12) on port 3306 and we use root user and password is "1234" for our development. For better user experience, please set up like our development enviroment. Or you can simply edit the `knexfile.js` file to change the configuration.
>
> 3. To build up the same testing enviroment, first enter `yarn install` in terminal to download all the node modules, then enter `yarn knex migrate:latest` to sync up the tables in the database. And then run `yarn knex seed:run` to run the seeds.
>
> 4. To start the back end, please enter `yarn dev` to start it. It will using the port 3000 as default.
>
> 5. Log-in with `username: long/ harry/ arthur/ jane/ charlie` with `password: 1234aA!`
