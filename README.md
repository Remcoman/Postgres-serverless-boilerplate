# Boilerplate for connecting Netlify functions with Heroku Postgres database

This boilerplate shows how you can deploy a Heroku database and use it in combination with Netlify functions.

## Technologies used

- PostgresSQL is a relational database. It's Open Source can be self-hosted or used as a Managed Service on Heroku, Azure and Amazon (Amazon RDS).
- Netlify functions is a easy way to run serverless functions in AWS lambda. Put files in a folder, deploy and you are done!
- Knex is a query builder for Node.JS and SQL. It allows you to programmatically build SQL queries instead of concatenating strings (which exposes you to SQL injection vulnerabilities).
- Objection.js is a very simple ORM for Node.JS. It does not hide the full power of SQL and it contains lots of handy functions to restructure database rows into a object format.
- Middy.js brings the world of express middleware to serverless!

## Development

Requirements:
- Docker
- NodeJS

1. Run `npm i`

2. First copy the .env.example, rename it to .env.

3. Startup the database:

```
npm run db:start
```

**Database data will be saved in the .data folder. You can remove that folder if you want to reset the database.**
**The database will keep running. Even when closing your terminal! To shutdown the database use `npm run db:stop`**

4. Run the migrations

Unlike databases like Mongodb or Firestore, Postgres needs a database schema. The database schema describes the structure of its contents. For example: it describes that the database contains a table named `todos` with a field of type `string` called `text`.

We use migrations to manage versions of the database schema. The migrations are located in `functions/lib/migrations`. Each migration describes a change in the schema. The `up` function describes the step to apply that step and the `down` function describes the step to rollback that change.

**Carefully test your migrations because they can result in data loss!**

To run the migrations use:

```
npx knex migrate:latest
```

**You can run this multiple times because it will only apply the changes which have not yet run**

To undo the latest migration use:

```
npx knex migrate:rollback
```

**See all the options using `npx knex`**

5. Seed the database with fake data

We can use `seeds` to put some data in the database. Seeds are located in `functions/lib/seeds`.
To run the seeds use:

```
npx knex seed:run
```

6. Run the development server

```
npm run dev
```

Go to http://localhost:8888/.netlify/functions/get-games to retrieve all the games and their reviews.

## Production

1. Download and install the heroku cli
2. Create a heroku app:

```
heroku create {your-app-name}
```

In all the upcoming commands you need to specify the app name. This gets annoying quickly.
To set the default app use:

```
export HEROKU_APP={your-app-name}
```

3. Add the postgres addon:

```
heroku addons:create heroku-postgresql:hobby-dev
```

**Hobby dev is free plan**

4. Retrieve the connection details and credentials:

```
heroku pg:credentials:url
```

The database is now ready. However you still need to apply the migrations.
You can do this from your local machine by entering the Heroku credentials in your .env file and applying the migrations (Step 4 of the development setup).

5. Deploy the app

- Run `npm run build` to build the app in the dist/functions folder
- Run `npm run deploy` to deploy the app in Netlify
- You can try the `get-games` function by going to {netlify draft url}/.netlify/functions/get-games

## Unresolved issues

- I'm using the `NODE_TLS_REJECT_UNAUTHORIZED` hack to prevent NodeJS from throwing an error when connecting to Heroku SSL. However this is not recommended because it exposes you to a MitM attack. As far as i understand you should be able to add a certificate to Heroku and use that in your Node app. This does not seem to be possible on a free plan however.
- Heroku basic plan has a max 120 connection limit. For high traffic sites this might not be enough. Maybe we need to use connection pooling to circumvent this limit?