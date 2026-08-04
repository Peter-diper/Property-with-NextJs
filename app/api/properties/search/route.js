import connectDB from "@/config/db";
import Property from "@/models/Property";
import { NextResponse } from "next/server";

// GET /api/properties/search

export const GET = async (request) => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");

    const locationPattern = new RegExp(location, "i");

    const typePattern = new RegExp(propertyType, "i");

    // match location pattern agaist database fields
    let query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.state": locationPattern },
        { "location.city": locationPattern },
        { "location.zipcode": locationPattern },
        { type: typePattern },
      ],
    };

    // only check for property if it's property type is not all
    if (propertyType && propertyType !== "All") {
      query.type = typePattern;
    }

    const properties = await Property.find(query);

    return NextResponse.json(properties, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse("something went wrong", { status: 500 });
  }
};
