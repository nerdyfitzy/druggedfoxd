import { TRoutes } from "@/utils/types";

export const routes: TRoutes = [
  {
    path: "/",
    name: "Home",
    renderOnAuth: true,
    requiresAuth: false,
    variant: "link",
  },
  {
    path: "/login",
    name: "Log in",
    renderOnAuth: false,
    variant: "default",
  },
  {
    path: "/signup",
    name: "Sign Up",
    renderOnAuth: false,
    variant: "outline",
  },
  {
    path: "/profile",
    name: "Profile",
    requiresAuth: true,
    renderOnAuth: true,
    variant: "link",
  },
  {
    path: "/log-out",
    name: "Log Out",
    requiresAuth: true,
    renderOnAuth: true,
    variant: "outline",
  },
] as const;
