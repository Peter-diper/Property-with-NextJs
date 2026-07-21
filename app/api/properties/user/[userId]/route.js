import connectDB from "@/config/db";
import Property from "@/models/Property";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const { userId } = await params;

    if (!userId) {
      return NextResponse.json("user id not found", { status: 400 });
    }

    const properties = await Property.find({ owner: userId });

    if (!properties) {
      return NextResponse.json("no property found", { status: 400 });
    }

    return NextResponse.json(properties, { status: 200 });
  } catch (error) {
    return NextResponse.json("something went wrong", { status: 500 });
  }
};
