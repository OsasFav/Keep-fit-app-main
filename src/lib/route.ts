export const ROUTE = {
  index: "/",
  // Auth
  login: "/login",
  createAccount: "/register",
  forgotPassword: "/forgot-password",
  // Dashboard
  dashboard: "/dashboard",
  trainer: "/dashboard/trainer:id",
  history: "/dashboard/history",
  profile: "/dashboard/profile",
  updatePassword: "/dashboard/profile/password",

  //  Trainer
  trainerDashboard: "/trainer/dashboard",
  trainerLogin: "/trainer/login",

  // Trainer
};

export const protectedRoutes = [
  ROUTE.dashboard,
  ROUTE.history,
  ROUTE.profile,
  ROUTE.updatePassword,
  ROUTE.trainerDashboard,
];
