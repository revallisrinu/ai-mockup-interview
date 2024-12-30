/** @type {import ("drizzle-kit").config }*/
export default({
  dialect: "postgresql",
  schema: "./app/utils/schema.js",
  dbCredentials: {
    url: "postgresql://neondb_owner:ZBFmvY2Ttx6I@ep-fragrant-mud-a589tf6k.us-east-2.aws.neon.tech/ai-mock-interview?sslmode=require",
  }
});
