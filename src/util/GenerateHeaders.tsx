export const generateAuthHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${sessionStorage.getItem("jwtToken")}`,
});

export const generateHeaders = () => ({
    "Content-Type": "application/json",
});
