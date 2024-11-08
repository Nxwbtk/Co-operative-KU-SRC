"use server"

import UserLog from "@/models/user-log";
import getMyServerSession from "../my-server-session"

export default async function signOutAction () {
    const session = await getMyServerSession();
    if (!session) {
        return null;
    }
    const log = await UserLog.findOne({ userId: session.user.id, logoutTime: null });
    if (!log) {
        return null;
    }
    log.logoutTime = new Date();
    await log.save();
    return true;
}