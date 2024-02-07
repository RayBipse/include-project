import { NextResponse } from "next/server";
import client from "@utils/database";

export async function POST(req) {
    let body = await req.json();
    console.log(body);
    if (body == null) {
        return NextResponse.json({ status: 400, message: "no body" });
    }
    console.log(`New post request: ${JSON.stringify(body)}`);
    const collection = client.db("maps_include").collection("posts");
    const result = await collection.insertOne(body);
    return NextResponse.json({ status: 200, data: result });
}
