import { DefaultLayout } from '../layouts';
import configs from '../config';
import { HomePage, ProductDetailPage, StoreDetailPage, StorePage } from '../pages';
import ComparePage from '../components/ComparePage';
import { element } from 'prop-types';

const routes = [
    {
        path: configs.routes.homePage,
        element: HomePage,
        layout: DefaultLayout,
        requireLogin: false
    },
    {
        path: configs.routes.productDetail,
        element: ProductDetailPage,
        layout: DefaultLayout,
        requireLogin: false
    },
    {
        path: configs.routes.compare,
        element: ComparePage,
        layout: DefaultLayout,
        requireLogin: false
    },
    {
        path: configs.routes.store,
        element: StorePage,
        layout: DefaultLayout,
        requireLogin: false
    },
    {
        path: configs.routes.storeDetail,
        element: StoreDetailPage,
        layout: DefaultLayout,
        requireLogin: false
    }
];


export default routes;
