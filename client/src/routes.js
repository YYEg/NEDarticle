import Admin from "./page/Admin";
import Cart from "./page/Cart";
import Shop from "./page/Shop";
import Auth from "./page/Auth";
import DevicePage from "./page/DevicePage";

import {
    ADMIN_ROUTE,
    CART_ROUTE,
    DEVICE_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE
} from "./utils/consts";


export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: CART_ROUTE,
        Component: Cart
    }
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    },
    {
        path: CART_ROUTE,
        Component: Cart
    }
]