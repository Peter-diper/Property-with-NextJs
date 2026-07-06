import connectDB from "@/config/db";
import Property from "@/models/Property";
import { NextResponse } from "next/server";

// GET/API/PROPERTIES
export const GET = async () => {
  try {
    await connectDB();
    const properties = await Property.find({});
    return NextResponse.json(properties, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "some thing went wrong" },
      { status: 500 },
    );
  }
};
