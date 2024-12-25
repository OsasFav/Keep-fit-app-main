import { NextRequest, NextResponse } from "next/server";
import { createResponse } from "@/utils/req";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function authMiddleware(request: NextRequest) {
  const authorizationHeader = request.headers.get("authorization");

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return createResponse("Unauthorized", false, {}, 401);
  }

  const token = authorizationHeader.split(" ")[1];
  if (!token) {
    return createResponse("Unauthorized", false, {}, 401);
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (payload && typeof payload === "object" && "exp" in payload) {
      const currentTime = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < currentTime) {
        console.log("Token has expired");
        return createResponse("Token expired", false, {}, 401);
      }
    }

    const response = NextResponse.next();
    response.headers.set("x-decoded-token", JSON.stringify(payload));
    return response;
  } catch (error) {
    console.error("Token verification failed:", error);
    return createResponse("Unauthorized", false, {}, 401);
  }
}
