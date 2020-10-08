<p align="center">
  <img width="340" height="200" src="/gobarber-web/src/assets/logo.svg">
</p>
<br>
<p align="center">
  This is an app to create appointments with barbers, it's backend was written with Node.Js, it's frontend was built with ReacJS and the mobile version with React Native.
</p>
<br>

## If you want to run it:
* ## Server
  * ### Required technologies:
    * [Node.JS](https://nodejs.org/en/)
    * [Yarn](https://yarnpkg.com/getting-started/install)
    * [PostgreSQL](https://www.postgresql.org/)
    * [MongoDB](https://www.mongodb.com/)
    * [Redis - Linux and Mac](https://redis.io/) 
    * [Redis - Windows](https://redis.io/)
  * ### Environment Variables:
    * At the "server" folder, you'll find a ".env.example" file, erase the ".example" part from the title and fill the missing informations on the body;
    * On "STORAGE_DRIVER=", write "disk" right in front of it (without space) if you want to storage user profile images on your hd. In case you want to use Amazon S3, write "s3", but you'll need a AWS account and a created bucket, wich you will need to inform at "server/src/config/upload", right at the end of the file, replace "bucket: 'gobarber-gostack-application'" for your own bucket;
    * On "MAIL_DRIVER=" use "ethereal", so the emails from the app go to [Ethereal Email](https://ethereal.email/), where you'll need to register. Or you can use "ses", wich will use Amazon SES, but will be necessary a AWS account;
    * On "APP_API_URL=http://localhost:3333", you can change the "localhost", for you machine IP, to guarantee the mobile compatibility;
  * ### Database and Cache
    * ## PostgreSQL
      * On PostgreSQL, you'll need to create a database named "gostack_gobarber";
      * On the server folder, the "ormconfig.json" file will need to be updated with your postgres username and password;
      * Now on you terminal run: "yarn typeorm migration:run", this will create all necessary tables and relations;
    * ## MongoDB
      * Just install it and make sure it's running on "localhost:27017";
      * For a visual interface you can use [MongoDB Compass community](https://www.mongodb.com/try/download/compass)
    * ## Redis
      * Just install it and make sure it's running on gate "6379";
  * ### To run
    * Go to the server folder, run "yarn" to install all necessary packages;
    * Now run, "yarn dev:server" and that's it
      
* ## React Web Front-end

  <p align="center">
    <img width="850" height="450" src="/gobarber-web/public/gobarber-logon.png">
  </p>
  
  * Let your server running;
  * Inside the "gobarber-web" folder, run "yarn";
  * Run "yarn start", that's it;
  
 * ## React Native
  
  <p align="center">
    <img width="300" height="600" src="/gobarber-mobile/public/logon.png">
  </p>
  
  * Let your server running;
  * Inside the "gobarber-mobile" folder, run "yarn";
  * Change the base URL, on "gobarber-mobile/src/services/api.ts", to "http:YOUR_MACHINE_IP:3333";
  * Run "yarn start", that's it;
