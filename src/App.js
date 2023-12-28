import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProduct } from './redux/slices/listProductsSlice';
import { fetchAllStores } from './redux/slices/listStoresSlice';
import { addWishlistToServer, updateWishlistFromLocalStorage } from './redux/slices/wishlistSlice';
import { addManyToCompareListServer, updateItemCompareFromLocalStorage } from './redux/slices/compareSlice';
import { Route, Routes } from 'react-router-dom';
import routes from './routes';
import addAccessTokenToHeader from './utils/addAccessTokenToHeader';
import CheckExpiredToken from './components/CheckExpiredToken';
import { addCartItemToServer, getCartListByUserID, updateCartFromLocalStorage } from './redux/slices/cartSlice';


function App() {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin)

    useEffect(() => {
        dispatch(fetchAllProduct());
        dispatch(fetchAllStores());
        addAccessTokenToHeader();

    }, [])

    useEffect(()=>{
        if (userLogin.isLogin){
            dispatch(addWishlistToServer(userLogin.user?._id))
            dispatch(addCartItemToServer(userLogin.user?._id))
            dispatch(addManyToCompareListServer(userLogin.user?._id))
        } else {
            dispatch(updateCartFromLocalStorage())
            dispatch(updateWishlistFromLocalStorage());
            dispatch(updateItemCompareFromLocalStorage());
        }
    }, [userLogin.isLogin])

    return (
        <>
            <Routes>
                {routes &&
                    routes.map((route, index) => {
                        
                        const {
                            layout: Layout,
                            element: Component,
                            path: Path,
                        } = route;
                        return (
                            <Route
                                key={index}
                                path={Path}
                                element={
                                    <Layout>
                                        <Component />
                                    </Layout>
                                }
                            />
                        );
                    })}
            </Routes>
            <CheckExpiredToken/>
        </>
        
    );
}

export default App;
