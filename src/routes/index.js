import { DefaultLayout } from '../layouts';
import configs from '../config';
import { HomePage, ProductDetailPage } from '../pages';
import ComparePage from '../components/ComparePage';




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
    }
];

export default routes;
