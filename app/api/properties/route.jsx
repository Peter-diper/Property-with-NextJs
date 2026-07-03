import conncetDB from "@/config/db";
import Property from "@/models/Property";

// GET/API/PROPERTIES
export const GET = async (reqeust) => {
  try {
    await conncetDB();
    const properties = await Property.find({});
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    return new Response("something went wrong", { status: 500 });
  }
};
