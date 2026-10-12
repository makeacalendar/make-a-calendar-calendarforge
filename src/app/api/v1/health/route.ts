export const dynamic="force-dynamic";
export async function GET(){return Response.json({status:"ok",service:"calendarforge-web",version:"0.1.0",databaseConfigured:Boolean(process.env.DATABASE_URL),time:new Date().toISOString()});}
