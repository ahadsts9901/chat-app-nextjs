import Pusher from "pusher";
import PusherClient from "pusher-js";
import "dotenv/config";

export const pusherServer = new Pusher({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: process.env.PUSHER_CLUSTER!,
    useTLS: true,
});

export const pusherClient = new PusherClient("cfcd8da5c056406770bf",
    {
        cluster: "us2",
    });
