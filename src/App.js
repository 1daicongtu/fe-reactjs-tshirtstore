import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllProduct } from './redux/slices/listProductsSlice';
import { fetchAllStores } from './redux/slices/listStoresSlice';
import { updateWishlistFromLocalStorage } from './redux/slices/wishlistSlice';
import { updateItemCompareFromLocalStorage } from './redux/slices/compareSlice';
import { Route, Routes } from 'react-router-dom';
import Home from './components/HomePage/HomeComponent';


function App() {
    /* const products = useSelector(state => state.products.listProduct)
    const stores = useSelector(state => state.stores.listStore) */

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(updateItemCompareFromLocalStorage());
        dispatch(updateWishlistFromLocalStorage());
        dispatch(fetchAllProduct());
        dispatch(fetchAllStores());
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    );
}

export default App;
