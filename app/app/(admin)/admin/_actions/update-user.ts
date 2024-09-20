"use server";

import getMyServerSession from "@/lib/my-server-session";
import { TServerActionResponse } from "@/lib/server-action-response";
import { revalidateTag } from "next/cache";

export type TUpdateUserProfilePayload = {
  payload: {
    honorific: string;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
  };
};

export async function updateUserProfile({ payload }: TUpdateUserProfilePayload): Promise<TServerActionResponse<any>> {
    const session = await getMyServerSession();
    if (!session) {
        return {
            error: "Unauthorized",
            data: null,
        };
    }
    const res = await fetch(`${process.env.FE_URL}/api/me/${session.user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        return {
            error: "Error",
            data: null,
        };
    }
    revalidateTag("myData");
    return {
        error: null,
        data: await res.json(),
    };
}
