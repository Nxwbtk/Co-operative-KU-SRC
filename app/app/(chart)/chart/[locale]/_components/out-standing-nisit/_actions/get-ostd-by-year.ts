'use server'

import { TServerActionResponse } from "@/lib/server-action-response";
import { TOutStandingData } from "../alumi-screen";

export async function getOstdByYear(year: string): Promise<TServerActionResponse<TOutStandingData[]>> {
    const res = await fetch(`${process.env.FE_URL}/api/outstanding-student/${year}`, {
        method: "GET",
    });
    if (!res.ok) {
        return {
            error: "Something went wrong",
            data: null
        }
    }
    const data = await res.json();
    return {
        error: null,
        data
    }
}


export async function getOstd(): Promise<TServerActionResponse<string[]>> {
    const res = await fetch(`${process.env.FE_URL}/api/outstanding-student/by-year`, {
        method: "GET",
    });
    if (!res.ok) {
        return {
            error: "Something went wrong",
            data: null
        }
    }
    const data = await res.json();
    return {
        error: null,
        data
    }
}