import { NextRequest } from "next/server";
import verifyToken from "./verify-token";

export function checkHeaders(req: NextRequest): Boolean {
    const { headers } = req;
    
    const authorizationHeader = headers.get('authorization');
    if (!authorizationHeader) {
        return false;
    }
    
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
        return false
    }
    
    const decoded = verifyToken(token, process.env.NEXTAUTH_SECRET!);
    if (!decoded) {
        return false
    }
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp && decoded.exp > currentTime;
}