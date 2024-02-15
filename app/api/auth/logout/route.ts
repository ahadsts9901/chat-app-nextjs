import "../../mongodb";
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest, res: NextResponse) => {

    try {

        const response = NextResponse.json({
            message: "Logout successfull"
        });

        response.cookies.set('hartRef', "", {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now())
        });

        response.cookies.set('hart', "", {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now())
        });

        return response;

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "An unknown error occured",
        }, { status: 500 });
    }

};
