export interface MenuItem {
    id: number;
    label: string;
    icon: string;
    url: string;
}
  
export const dynamicMenuItems: MenuItem[] = [
    {
        id: 1,
        label: 'Dashboard',
        icon: '/images/dashboard.png',
        url: '/dashboard',
    },
    {
        id: 2,
        label: 'Products',
        icon: '/images/products.png',
        url: '/products',
    },
    {
        id: 3,
        label: 'Schedule',
        icon: '/images/schedule.png',
        url: '/schedule',
    },
    {
        id: 4,
        label: 'Pending Product',
        icon: '/images/pending-product.png',
        url: '/pending-product',
    },
    {
        id: 5,
        label: 'Reporting',
        icon: '/images/reporting.png',
        url: '/reporting',
    },
  ];