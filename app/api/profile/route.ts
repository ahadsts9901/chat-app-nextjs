import "../mongodb";
import { NextRequest, NextResponse } from 'next/server';
import jwt from "jsonwebtoken";
import "dotenv/config";
import { userModel } from "../schema";
import { getUserData } from "../functions";

export const GET = async (req: NextRequest, res: NextResponse) => {

    try {

        const currentUser: any = await getUserData(req)

        return NextResponse.json({
            currentUser
        })

        // const userData = await userModel.findOne({ email: currentUser?.email });

        // if (!userData) {
        //     return NextResponse.json({
        //         error: "User not found",
        //         status: 404
        //     });
        // }

        // return NextResponse.json({
        //     message: "User fetched successfully",
        //     data: {
        //         firstName: userData.firstName,
        //         lastName: userData.lastName,
        //         email: userData.email,
        //         _id: userData._id,
        //         createdOn: userData.createdOn,
        //     }
        // });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            error: "An unknown error occurred",
            status: 500
        });
    }
};