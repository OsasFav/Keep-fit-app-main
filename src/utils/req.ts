// import axios from "axios";
import { ROUTE } from "@/lib/route";
import setAuthToken from "./setAuthToken";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { jwtVerify, SignJWT } from "jose";
import api from "./api";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
export const getProfile = async (url) => {
  // console.log(url);
  var baseurl = "dashboard/profile";

  if (url && typeof url === "string" && url.includes("/trainer/dashboard")) {
    baseurl = "trainer/dashboard/profile";
  } else baseurl = "dashboard/profile";
  return await api.get(baseurl);
};

export const getAllTrainers = async (id) => {
  return await api.get(
    id ? `trainer/dashboard/${id}` : "trainer/dashboard/all"
  );
};

export const getAllReqs = async () => {
  return await api.get("dashboard/history");
};

export function getWithExpiry(key: string) {
  if (typeof window !== "undefined") {
    const itemStr = sessionStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    // const now = new Date();

    // if (now.getTime() > item.expiry) {
    //   sessionStorage.removeItem(key);
    //   setAuthToken("");
    //   window.location.href = ROUTE.login
    //   return null;
    // }
    return item.value;
  }
}
export function setWithExpiry(key: string, val: string, ttl?: any) {
  const now = new Date();
  const item = {
    value: val,
    // expiry: now.getTime() + ttl,
  };
  sessionStorage.setItem(key, JSON.stringify(item));
}

export function createResponse(
  message: string,
  isSuccess: boolean,
  data = {},
  statusCode: number
) {
  const responsePayload = {
    message,
    status: isSuccess ? "success" : "error",
    code: statusCode,
    data,
  };

  return NextResponse.json(responsePayload, { status: statusCode });
}

export const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return passwordRegex.test(password);
};

export const hashPassword = async (plainPassword: string) => {
  const saltround = await bcrypt.genSalt(10);
  return await bcrypt.hash(plainPassword, saltround);
};

export async function comparePasswords(
  password: string,
  hashedPassword: string
) {
  // console.log(await bcrypt.compare(password, hashedPassword));
  return await bcrypt.compare(password, hashedPassword);
}

export async function generateToken(userId) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(JWT_SECRET);
  return token;
}
