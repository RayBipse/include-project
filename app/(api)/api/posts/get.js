import { NextResponse } from "next/server";
import client from "@utils/database";

export async function GET(req) {
    const body = JSON.parse(req.body);
    console.log(`New request in posts ${body}`);
    const collection = client.db("maps_include").collection("posts");
    let posts = await collection.find(body == null ? {} : body);
    posts = await posts.toArray();
    return NextResponse.json({ status: 200, data: posts });
}
