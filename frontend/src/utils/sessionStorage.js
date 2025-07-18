export const saveToSessionStorage = (key, value) => {
    return sessionStorage.setItem(key, JSON.stringify(value));
};

export const getFromSessionStorage = (value) => {
    return JSON.parse(sessionStorage.getItem(value));
};
