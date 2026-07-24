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

// put api/property/id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return NextResponse.json("User ID is requierd", { status: 401 });
    }

    const { userId } = sessionUser;

    const { id } = await params;
    const formData = await request.formData();

    // Access all values from amenities and images
    const amenities = formData.getAll("amenities");

    // get property to update
    const existingProperty = await Property.findById(id);

    if (!existingProperty) {
      return NextResponse.json("property does not exist", { status: 404 });
    }

    // verify ownership
    if (existingProperty.owner.toString() !== userId) {
      return NextResponse.json("unautrized", { status: 401 });
    }

    // Create Property Object for database
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
    };


    // update property in database
    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);
    
    return NextResponse.json(updatedProperty, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
