import "../../mongodb";
import { extendedSessionInDays, initialSessionInDays, userModel } from "../../schema";
import { NextRequest, NextResponse } from 'next/server';
import { emailPattern, passwordPattern } from "@/app/core";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config"

export const POST = async (req: NextRequest, res: NextResponse) => {

    try {

        const { email, password } = await req.json();

        if (!email) {
            return NextResponse.json({
                message: `Email is reqiured`
            }, { status: 400 });
        }

        if (!password) {
            return NextResponse.json({
                message: `Password is required`
            }, { status: 400 });
        }

        if (!emailPattern.test(email.toLowerCase()) || !passwordPattern.test(password)) {
            return NextResponse.json({
                message: "Email or password incorrect",
            }, { status: 400 })
        }

        const user = await userModel.findOne({ email: email.toLowerCase() }).exec();

        if (!user) {
            return NextResponse.json({
                message: "Email or password incorrect",
            }, { status: 400 });
        }

        // match the password
        const isPasswordTrue = await bcrypt.compare(password, user.password);

        if (!isPasswordTrue) {
            return NextResponse.json({
                message: "Email or password incorrect"
            }, { status: 400 })
        }

        // generate tokens
        const hartRef = jwt.sign({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            _id: user._id,
        }, process.env.JWT_SECRET!, {
            expiresIn: extendedSessionInDays * 24 * 60 * 60 * 1000,
        });

        const hart = jwt.sign({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            _id: user._id,
        }, process.env.JWT_SECRET!, {
            expiresIn: initialSessionInDays * 24 * 60 * 60 * 1000,
        });

        const response = NextResponse.json({
            message: "Login successfull",
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                _id: user._id,
            }
        });

        response.cookies.set('hartRef', hartRef, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + extendedSessionInDays * 24 * 60 * 60 * 1000)
        });

        response.cookies.set('hart', hart, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + initialSessionInDays * 24 * 60 * 60 * 1000)
        });

        return response;

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "An unknown error occured",
        }, { status: 500 });
    }

};
