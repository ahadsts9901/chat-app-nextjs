import "../mongodb"
import { NextRequest, NextResponse } from "next/server";
import { userModel } from "../schema";

export const GET = async (req: NextRequest, res: NextResponse) => {

    try {

        const users = await userModel.find().sort({ _id: -1 }).exec()

        console.log(users);


        return NextResponse.json({
            message: "success",
            data: users
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "An unknown error occured"
        }, { status: 500 })
    }

};