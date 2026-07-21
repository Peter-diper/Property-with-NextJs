import connectDB from "@/config/db";
import Property from "@/models/Property";
import { NextResponse } from "next/server";
import { getSessionUser } from "@/utils/getSessionUser";

// get  /api/properies/id
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

// DELETE  /api/properies/id
export const DELETE = async (request, { params }) => {
  try {
    await connectDB();

    // getting params has bin changed slightly in next 15
    const { id: propertyId } = await params;

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return NextResponse.json("user id is requierd ", { status: 401 });
    }

    const { userId } = sessionUser;

    const property = await Property.findById(propertyId);
    if (!property) {
      return NextResponse.json(
        { message: "property not found" },
        { status: 400 },
      );
    }

    // Verfiy owner ship
    if (property.owner.toString() !== userId) {
      return NextResponse.json("unauthorized", { status: 401 });
    }

    await property.deleteOne();

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "some thing went wrong" },
      { status: 500 },
    );
  }
};
