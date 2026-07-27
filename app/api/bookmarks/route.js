import connectDB from "@/config/db";
import User from "@/models/Users";
import Property from "@/models/Property";
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
    let message;

    if (isBookmarked) {
      //  if already bookmarked, remove it
      user.bookmarks.pull(propertyId);
      message = "book mark removed successfully";
      isBookmarked = false;
    } else {
      // if not bookmarked added
      user.bookmarks.push(propertyId);

      message = "Book mark added successfully";
      isBookmarked = true;
    }

    await user.save();

    return NextResponse.json({ message, isBookmarked }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("something went wrong", { status: 500 });
  }
};

//! the plan is to get the properties that are in the User bookmarks collection
// GET  /api/bookmarks
export const GET = async () => {
  try {
    await connectDB();
    const userSession = await getSessionUser();
    if (!userSession || !userSession?.userId) {
      return NextResponse.json("user id is requierd!");
    }

    const { userId } = userSession;

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json("user not found");
    }

    // get user bookmarks
    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });

    if (!bookmarks) {
      return NextResponse.json("something went wrong with the bookmarks", {
        status: 401,
      });
    }

    return NextResponse.json(bookmarks, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse("something went wrong", { status: 500 });
  }
};
