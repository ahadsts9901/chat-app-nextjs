import "../../mongodb";
import { extendedSessionInDays, initialSessionInDays, userModel } from "../../schema";
import { NextRequest, NextResponse } from 'next/server';
import { firstNamePattern, lastNamePattern, emailPattern, passwordPattern } from "@/app/core";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const POST = async (req: NextRequest, res: NextResponse) => {

    try {

        const { firstName, lastName, email, password } = await req.json();

        console.log(firstName);


        if (!firstName || !lastName || !email || !password) {
            return NextResponse.json({
                message: `Required parameters missing`
            }, { status: 400 });
        }

        if (!firstNamePattern.test(firstName)) {
            return NextResponse.json({
                message: "First Name must between 2 to 15 characters long",
            }, { status: 400 })
        }

        if (!lastNamePattern.test(lastName)) {
            return NextResponse.json({
                message: "Last Name must between 2 to 15 characters long",
            }, { status: 400 })
        }

        if (!emailPattern.test(email.toLowerCase())) {
            return NextResponse.json({
                message: "Email pattern is invalid",
            }, { status: 400 })
        }

        if (!passwordPattern.test(password)) {
            return NextResponse.json({
                message: `Password must be alphanumeric and 8 to 24 characters long`,
            }, { status: 400 })
        }

        const user = await userModel.findOne({ email: email.toLowerCase() }).exec();

        if (user) {
            return NextResponse.json({
                message: "Email already taken",
            }, { status: 409 });
        }

        // create a user
        const passwordHash = await bcrypt.hash(password, 12)

        const signupResponse = await userModel.create({
            firstName: firstName,
            lastName: lastName,
            email: email.toLowerCase(),
            password: passwordHash,
        });

        const response = NextResponse.json({
            message: "Signup successfull",
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                _id: signupResponse.insertedId,
            }
        });

        // generate tokens
        const hartRef = jwt.sign({
            firstName: firstName,
            lastName: lastName,
            email: email,
            _id: signupResponse.insertedId,
        }, process.env.JWT_SECRET!, {
            expiresIn: extendedSessionInDays * 24 * 60 * 60 * 1000,
        });

        const hart = jwt.sign({
            firstName: firstName,
            lastName: lastName,
            email: email,
            _id: signupResponse.insertedId,
        }, process.env.JWT_SECRET!, {
            expiresIn: initialSessionInDays * 24 * 60 * 60 * 1000,
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