import connectDB from "@/config/db";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { NextResponse } from "next/server";
import Property from "@/models/Property";

export const dynamic = "force-dynamic";

// GET  /api/messages

export const GET = async (request) => {
  try {
    await connectDB();

    const userSession = await getSessionUser();

    if (!userSession || !userSession?.userId) {
      return NextResponse.json(
        { message: "you should be logged in" },
        { status: 200 },
      );
    }

    const { userId } = userSession;

    const messages = await Message.find({ recipient: userId })
      .populate("sender", "username")
      .populate("property", "name");

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("something went wrong", { status: 500 });
  }
};

// POST  /api/messages
export const POST = async (request) => {
  try {
    await connectDB();

    const { name, email, phone, message, property, recipient } =
      await request.json();
    const sessionUser = await getSessionUser();

    if ((!sessionUser, !sessionUser?.user)) {
      return NextResponse.json(
        { message: "You most loged in" },
        { status: 401 },
      );
    }

    const { user } = sessionUser;

    // Cannot send user to your self
    if (user?.id === recipient) {
      return NextResponse.json(
        { message: "cannot send message to yourself" },
        { status: 400 },
      );
    }

    const newMessage = new Message({
      sender: user.id,
      recipient,
      email,
      name,
      phone,
      property,
      body: message,
    });

    await newMessage.save();

    return NextResponse.json({ message: "Message sent" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("something went wrong", { status: 500 });
  }
};
