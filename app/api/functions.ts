import "dotenv/config"
import jwt from "jsonwebtoken"

export const getUserData = (request: any) => {

    return new Promise((resolve, reject) => {

        const hart = request.cookies.get("hart")?.value || '';

        if (!hart) {
            reject(new Error("unauthorized"))
        }

        const userData: any = jwt.verify(hart, process.env.JWT_SECRET!);

        resolve(userData)

    })

}