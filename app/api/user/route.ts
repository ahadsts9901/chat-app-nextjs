import "../mongodb"
import { NextRequest, NextResponse } from "next/server";
import { userModel } from "../schema";

export const GET = async (req: NextRequest, res: NextResponse) => {

    try {
        const id = new URL(req.url).searchParams.get("id");

        if (!id) {
            return NextResponse.json({ message: "User id is required" }, { status: 400 })
        }

        const projection = {
            firstName: 1,
            lastName: 1,
            _id: 1
        };

        const user = await userModel.findById(id, projection).exec();
        
        if (!user) {
            return NextResponse.json({
                message: "User not found"
            }, { status: 404 });
        }

        return NextResponse.json({ user: user });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "An unknown error occured" }, { status: 500 });
    }
};