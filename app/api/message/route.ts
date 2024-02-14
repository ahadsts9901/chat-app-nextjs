import { isValidObjectId } from "mongoose";
import "../mongodb";
import { NextRequest, NextResponse } from 'next/server';
import { chatModel } from "../schema";
import { getUserData } from "../functions";
import { pusherServer } from "@/app/lib/pusher";
import { toPusherKey } from "@/app/lib/utils";

export const POST = async (req: NextRequest, res: NextResponse) => {

    try {

        const { message, to_id, from_id } = await req.json()

        if (!message || !to_id || !from_id) {
            return NextResponse.json({
                message: "Required parameters misisng",
            }, { status: 400 });
        }

        if (message.trim() === "") {
            return NextResponse.json({
                message: "Message cannot be empty",
            }, { status: 400 });
        }

        if (!isValidObjectId(to_id)) {
            return NextResponse.json({
                message: "Reciever's id is invalid",
            }, { status: 400 });
        }

        if (!isValidObjectId(from_id)) {
            return NextResponse.json({
                message: "Sender's id is invalid",
            }, { status: 400 });
        }

        const response = chatModel.create({
            message: message,
            from_id: from_id,
            to_id: to_id,
        })

        try {
            pusherServer.trigger(
                toPusherKey(`user:${to_id}:message`), `message`,
                {
                    senderId: from_id
                }
            )
            console.log("pushed");

        } catch (error) {
            console.log(error);

        }

        return NextResponse.json({
            message: "Message sent",
        })


    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "An unknown error occured",
        }, { status: 500 });
    }

};

export const GET = async (req: NextRequest, res: NextResponse) => {

    try {

        const to_id = new URL(req.url).searchParams.get("id");

        const { _id }: any = await getUserData(req)
        const from_id = _id

        if (!to_id || to_id.trim() === "" || !isValidObjectId(to_id)) {
            return NextResponse.json({
                message: "Invalid id",
            }, { status: 400 });
        }

        if (!from_id || from_id.trim() === "" || !isValidObjectId(from_id)) {
            return NextResponse.json({
                message: "Invalid id",
            }, { status: 400 });
        }

        const messages = await chatModel.find({
            $or: [
                {
                    to_id: to_id,
                    from_id: from_id,
                },
                {
                    from_id: to_id,
                    to_id: from_id
                }
            ]
        }).sort({ _id: -1 }).exec()

        if (messages.length < 1) return NextResponse.json({
            message: "No messages found"
        }, { status: 404 })

        return NextResponse.json({
            messages: messages,
            message: "Messages fetched successfully"
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "An unknown error occured",
        }, { status: 500 });
    }

};