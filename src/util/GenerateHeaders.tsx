export const generateAuthHeaders = () => {
    const token = sessionStorage.getItem("jwtToken");
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };
};

export const generateHeaders = () => ({
    "Content-Type": "application/json",
});
