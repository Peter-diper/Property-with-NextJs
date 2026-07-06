import connectDB from "@/config/db";
import Property from "@/models/Property";
import { NextResponse } from "next/server";

// get/api/properies/id
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    // getting params has bin changed slightly in next 15
    const { id } = await params;

    const property = await Property.findById(id);
    if (!property) {
      return NextResponse.json(
        { message: "property not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(property, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "some thing went wrong" },
      { status: 500 },
    );
  }
};
