# Prisma Data Layer Guide

## Development (SQLite)

1. Set `DATABASE_URL` in your local `.env`:
   - `DATABASE_URL="file:./dev.db"`
2. Run:
   - `npm run prisma:generate`
   - `npm run prisma:migrate -- --name init`

## Production (PostgreSQL)

1. Set a PostgreSQL connection string in environment:
   - `DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/w7_workshop?schema=public"`
2. Update datasource provider in `prisma/schema.prisma` from `sqlite` to `postgresql` before running production migrations.
3. Run:
   - `npm run prisma:generate`
   - `npx prisma migrate deploy`

## Notes

- Prisma v7 reads datasource URL from `prisma.config.ts`.
- No seed data is included by design.
