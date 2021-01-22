import { ReactNode } from "react";
import { Redirect } from "react-router";
import { Role } from "../../../models/Role";
import { User } from "../../../models/User";

const RedirectComp = () => (
    <Redirect to="/" />
);

// HOC to protect a route based on if the current user has a role
export const protectRoute = (role: string, currentUser?: User) => (route: ReactNode): ReactNode => {
    return currentUser?.roles.some((r: Role) => r.role === role) ? route : (<RedirectComp />);
};
