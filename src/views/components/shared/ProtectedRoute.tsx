import React, { ReactNode } from "react";
import { Redirect } from "react-router";
import { Role } from "../../../models/Role";
import { User } from "../../../models/User";

const RedirectComp = () => (
    <Redirect to="/" />
);

// HOC to protect a route based on if the current user has a role
export const protectRoute = (role: string, currentUser?: User) => (route: ReactNode) => {
    return currentUser && currentUser.roles.some((r: Role) => r.role === role) ? route : RedirectComp;
};
