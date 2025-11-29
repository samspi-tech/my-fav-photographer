export const navigateToHomepage = () => window.location.replace('/');

export const formatDate = (date, length) => {
    const options = {
        short: {
            month: 'long',
            year: 'numeric',
        },
    };

    return new Intl.DateTimeFormat('en', options[length]).format(date);
};
