import { DefaultLayout } from '../layouts';
import configs from '../config';
import { AboutUsPage, CheckoutPage, ContactUsPage, HomePage, ProductDetailPage, ShoppingCartPage, StoreDetailPage, StorePage } from '../pages';
import ComparePage from '../components/ComparePage';
import { element } from 'prop-types';
import AboutUs from '../components/AboutUs';
import MyAccountPage from '../pages/myAccountPage';
import MyAccount from '../components/MyAccount';

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
    },
    {
        path: configs.routes.contactUs,
        element: ContactUsPage,
        layout: DefaultLayout,
        requireLogin: false
    }, 
    {
        path: configs.routes.aboutUs,
        element: AboutUsPage,
        layout: DefaultLayout,
        requireLogin: false
    },
    {
        path: configs.routes.shoppingCart,
        element: ShoppingCartPage,
        layout: DefaultLayout,
        requireLogin: false
    },
    {
        path: configs.routes.checkout,
        element: CheckoutPage,
        layout: DefaultLayout,
        requireLogin: false
    },
    {
        path: configs.routes.myAccount,
        element: MyAccount,
        layout: DefaultLayout,
        requireLogin: true
    }
];


export default routes;
