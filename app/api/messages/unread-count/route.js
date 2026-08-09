import connectDB from "@/config/db";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connectDB();

    const userSession = await getSessionUser();

    if (!userSession || !userSession?.userId) {
      return NextResponse.json(
        { message: "you need to log in" },
        { status: 401 },
      );
    }

    const { userId } = userSession;

    const unReadMessageCount = await Message.countDocuments({
      recipient: userId,
      read: false,
    });

    return NextResponse.json({ count: unReadMessageCount }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 },
    );
  }
};
