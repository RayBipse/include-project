import { NextResponse } from "next/server";
import client from "@utils/database";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const area = searchParams.get("area");
    console.log(`New request in posts for ${area}`);
    const collection = client.db("maps_include").collection("posts");
    let posts = await collection.find(area == null ? {} : { area });
    posts = await posts.toArray();
    return NextResponse.json({ status: 200, data: posts });
}
