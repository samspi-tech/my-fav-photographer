const navItems = [
    {
        label: 'Settings',
        icon: 'pi pi-cog',
        url: '/settings',
    },
];

export const userNavItems = [
    {
        label: 'Home',
        icon: 'pi pi-home',
        url: '/homepage',
    },
    ...navItems,
];

export const photographerNavItems = [
    {
        label: 'Profile',
        icon: 'pi pi-user',
        url: '/profile',
    },
    ...navItems,
];
