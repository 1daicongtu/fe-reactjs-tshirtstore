import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProduct } from './redux/slices/listProductsSlice';
import { fetchAllStores } from './redux/slices/listStoresSlice';
import { addWishlistToServer, updateWishlistFromLocalStorage } from './redux/slices/wishlistSlice';
import { updateItemCompareFromLocalStorage } from './redux/slices/compareSlice';
import { Route, Router, Routes } from 'react-router-dom';
import axios from 'axios';
import routes from './routes';
import addAccessTokenToHeader from './utils/addAccessTokenToHeader';
import CheckExpiredToken from './components/CheckExpiredToken';
import { addCartItemToServer, getCartListByUserID, updateCartFromLocalStorage } from './redux/slices/cartSlice';
import { get } from 'react-hook-form';

function App() {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin)


    useEffect(() => {
        if (!userLogin.isLogin){
            dispatch(updateCartFromLocalStorage())
            dispatch(updateItemCompareFromLocalStorage());
        }
        dispatch(fetchAllProduct());
        dispatch(fetchAllStores());
        addAccessTokenToHeader();

    }, [])

    useEffect(()=>{
        if (userLogin.isLogin){
            dispatch(addWishlistToServer(userLogin.user?._id))
            dispatch(addCartItemToServer(userLogin.user?._id))
            
        } else {
            dispatch(updateCartFromLocalStorage())
            dispatch(updateWishlistFromLocalStorage());
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
