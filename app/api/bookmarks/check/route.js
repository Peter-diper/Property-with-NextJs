import connectDB from "@/config/db";
import User from "@/models/Users";
import { getSessionUser } from "@/utils/getSessionUser";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (request) => {
  try {
    await connectDB();
    const { propertyId } = await request.json();

    const sessionUser = await getSessionUser();

    if ((!sessionUser, !sessionUser.userId)) {
      return NextResponse.json("user id is requeierd ", { status: 401 });
    }

    const { userId } = sessionUser;

    //find user in database
    const user = await User.findById(userId);

    // check if user is book marked

    let isBookmarked = user.bookmarks.includes(propertyId);

    return NextResponse.json({ isBookmarked }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("something went wrong", { status: 500 });
  }
};
