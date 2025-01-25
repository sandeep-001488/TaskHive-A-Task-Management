export const config = {
  dbUrl:
    process.env.DATABASE_URL ||
    "postgres://user:password@localhost:5432/dbname", 
  jwtSecret: process.env.JWT_SECRET || "your_jwt_secret",
};
