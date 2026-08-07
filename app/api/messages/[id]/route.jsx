import connectDB from "@/config/db";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// put /api/messages/:id

export const PUT = async (request, { params }) => {
  try {
    await connectDB();
    const { id } = await params;

    const userSession = await getSessionUser();

    if (!userSession || !userSession?.userId) {
      return NextResponse.json(
        { message: "You need to be logged in" },
        { status: 401 },
      );
    }

    const message = await Message.findById(id);

    if (!message) {
      return NextResponse.json(
        { message: "message not found" },
        { status: 404 },
      );
    }

    // Verify ownership

    if (message.recipient.toString() !== userSession?.userId) {
      return NextResponse.json({ authorized: false }, { status: 401 });
    }

    message.read = !message.read;

    await message.save();

    return NextResponse.json(message, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("something went wrong", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectDB();
    const { id } = await params;

    const userSession = await getSessionUser();

    if (!userSession || !userSession?.userId) {
      return NextResponse.json(
        { message: "You need to be logged in" },
        { status: 401 },
      );
    }

    const { userId } = userSession;

    const message = await Message.findById(id);

    if (userId.toString() !== message.recipient.toString()) {
      return NextResponse.json(
        {
          message: "You Are Not The owner of This Message",
        },
        { status: 401 },
      );
    }

    await message.deleteOne();

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("something went wrong", { status: 500 });
  }
};
