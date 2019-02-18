export const buildURL = (route: string) => {
    return process.env.PRODUCTION
        ? `https://grade-tracker-api.herokuapp.com${route}`
        : route;
};
