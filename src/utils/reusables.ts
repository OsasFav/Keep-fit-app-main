import toaster from "@/ui/toast";
import api, { baseURL } from "./api";
import { getWithExpiry } from "./req";
import setAuthToken from "./setAuthToken";
import { ROUTE } from "@/lib/route";

export const logOutAction = async () => {
  // if (res) {
  const token = getWithExpiry("jwtToken");
  if (!token) {
    // await api.get("logout");
    // toaster("Logged out successfully", "success");
  }
  window.location.href = window.location.pathname.includes("merchant")
  ? "/trainer/login"
  : ROUTE.login;
  sessionStorage.clear();
  setAuthToken("");
  // }
};



export function validatePassword(
  password: string,
  confirmPassword?: string
): { valid: boolean; message: string } {
  if (password !== confirmPassword) {
    return { valid: false, message: "Passwords do not match" };
  }
  // if (password.length < 8) {
  //   return {
  //     valid: false,
  //     message: "Password must be at least 8 characters long",
  //   };
  // }
  // if (!/\d/.test(password)) {
  //   return {
  //     valid: false,
  //     message: "Password must contain at least one number",
  //   };
  // }
  // if (!/[A-Z]/.test(password)) {
  //   return {
  //     valid: false,
  //     message: "Password must contain at least one uppercase letter",
  //   };
  // }

  // if (!/[a-z]/.test(password)) {
  //   return {
  //     valid: false,
  //     message: "Password must contain at least one lowercase letter",
  //   };
  // }
  return { valid: true, message: "Password is valid" };
}

export const convertDate = (date: string) => {
  const newDate = new Date(date.replace(" ", "T"));
  const day = Number(newDate.getDate());
  const month = Number(newDate.getMonth() + 1);
  const year = Number(newDate.getFullYear());
  const hours = Number(newDate.getHours());
  const minutes = Number(newDate.getMinutes());
  let hour: number;
  if (hours > 12) {
    hour = hours - 12;
  } else {
    hour = hours;
  }
  return `${day < 10 ? `0${day}` : day}/${
    month < 10 ? `0${month}` : month
  }/${year} ${hour < 10 ? `0${hour}` : hour}:${
    minutes < 10 ? `0${minutes}` : minutes
  } ${hours >= 12 ? `PM` : `AM`}`;
};

export const errorHandler = (res: any) => {
  const err = res.response?.data;

  if (typeof err === "object" && err.message) {
    if (typeof err.message === "object") {
      for (let [key, value] of Object.entries(err.message)) {
        if (typeof value === "string") {
          toaster(value, "error");
        }
      }
    } else if (typeof err.message === "string") {
      toaster(err.message, "error");
    }
  } else {
    toaster(
      err?.message || "Something went wrong, please try again.",
      "error"
    );
  }
};
export function getInitials(name) {
  if (!name) return '';
  const words = name.trim().split(/\s+/);
  return words.map(word => word[0].toUpperCase()).join('');
}

export const fitnessTrainingTypes = [
  "Strength Training",
  "Weightlifting",
  "Bodyweight Exercises",
  "Resistance Band Workouts",
  "Cardiovascular Training",
  "Running",
  "Cycling",
  "Swimming",
  "Rowing",
  "Jump Rope",
  "Flexibility and Mobility Training",
  "Yoga",
  "Pilates",
  "Stretching Exercises",
  "Foam Rolling",
  "High-Intensity Interval Training (HIIT)",
  "Tabata",
  "Circuit Training",
  "Bootcamp Workouts",
  "Endurance Training",
  "Long-Distance Running",
  "Marathon Training",
  "Triathlon Training",
  "Functional Training",
  "Kettlebell Workouts",
  "TRX Suspension Training",
  "Sandbag Training",
  "Core Training",
  "Plank Variations",
  "Abdominal Exercises",
  "Stability Ball Workouts",
  "Sport-Specific Training",
  "Soccer Drills",
  "Basketball Workouts",
  "Tennis Training",
  "Martial Arts",
  "Boxing",
  "Kickboxing",
  "MMA",
  "Balance and Stability Training",
  "Balance Board Exercises",
  "Single-Leg Exercises",
  "Mind-Body Training",
  "Tai Chi",
  "Qigong",
  "Mindfulness Meditation",
  "Aerobic Classes",
  "Zumba",
  "Step Aerobics",
  "Dance Fitness",
  "Outdoor Activities",
  "Hiking",
  "Rock Climbing",
  "Kayaking",
  "Surfing",
  "Group Fitness Classes",
  "Spinning",
  "Barre",
  "CrossFit"
];
