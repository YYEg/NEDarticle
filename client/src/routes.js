import Admin from "./page/Admin";
import Library from "./page/Library";
import Catalog from "./page/Catalog";
import Auth from "./page/Auth";
import ArticlePage from "./page/ArticlePage";

import {
    ADMIN_ROUTE,
    LIB_ROUTE,
    ARTICLE_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    CATALOG_ROUTE, DEVICE_EDIT_ROUTE
} from "./utils/consts";
import ArticlePageEdit from "./page/ArticlePageEdit";


export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: LIB_ROUTE,
        Component: Library
    },
    {
        path: DEVICE_EDIT_ROUTE + '/:id',
        Component: ArticlePageEdit
    },
]

export const publicRoutes = [
    {
        path: CATALOG_ROUTE,
        Component: Catalog
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
        path: ARTICLE_ROUTE + '/:id',
        Component: ArticlePage
    },
    {
        path: LIB_ROUTE,
        Component: Library
    }
]