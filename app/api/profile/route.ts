import "../mongodb";
import { NextRequest, NextResponse } from 'next/server';
import jwt from "jsonwebtoken";
import "dotenv/config";
import { userModel } from "../schema";

export const GET = async (req: NextRequest, res: NextResponse) => {

    try {
        const hart = req.cookies.get("hart")?.value;

        if (!hart) {
            return NextResponse.json({
                error: "No token found",
                status: 400
            });
        }

        const currentUser: any = jwt.verify(hart, process.env.JWT_SECRET!);

        const userData = await userModel.findById(currentUser._id);

        if (!userData) {
            return NextResponse.json({
                error: "User not found",
                status: 404
            });
        }

        return NextResponse.json({
            message: "User fetched successfully",
            data: {
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                _id: userData._id,
                createdOn: userData.createdOn,
            }
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            error: "An unknown error occurred",
            status: 500
        });
    }
};