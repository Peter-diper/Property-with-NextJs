import connectDB from "@/config/db";
import Property from "@/models/Property";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

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

export const POST = async (request) => {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json("unauthorized", { status: 401 });
    }

    const userId = session.user.id;

    const formData = await request.formData();

    // Access all values from amenities and images
    const amenities = formData.getAll("amenities");

    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");

    // Create Property Object for data base

    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
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
      rate: {
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
      images,
    };

    console.log(userId);

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json("falied to add property", { status: 500 });
  }
};
