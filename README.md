Express.js REST api exercise using TypeScript and Prisma

## Dependencies

First, please install the dependencies with `npm install`

## Database

###### Creating database locally

Please run `npx prisma migrate dev --name init` to create your local database. For more information, please see [Prisma Doc](https://www.prisma.io/docs/getting-started/quickstart#3-run-a-migration-to-create-your-database-tables-with-prisma-migrate)

###### Seeding test data

To seed test data in your local database, please run `npm run db-seed`

###### Database viewer

To see the current database records in GUI, you can run `npm run db-studio`

## Running app

To start the app, please run `npm run dev`
