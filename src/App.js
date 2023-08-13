import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllProduct } from './redux/slices/listProductsSlice';
import { fetchAllStores } from './redux/slices/listStoresSlice';
import { updateWishlistFromLocalStorage } from './redux/slices/wishlistSlice';
import { updateItemCompareFromLocalStorage } from './redux/slices/compareSlice';
import { Route, Router, Routes } from 'react-router-dom';
import axios from 'axios';
import routes from './routes';
import addAccessTokenToHeader from './utils/addAccessTokenToHeader';
import CheckExpiredToken from './components/CheckExpiredToken';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateItemCompareFromLocalStorage());
        dispatch(updateWishlistFromLocalStorage());
        dispatch(fetchAllProduct());
        dispatch(fetchAllStores());
        addAccessTokenToHeader();

    }, []);

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
