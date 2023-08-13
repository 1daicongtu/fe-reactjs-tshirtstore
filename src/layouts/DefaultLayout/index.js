import Header from '../../components/HeaderComponent/Header';
import Footer from '../../components/FooterComponent';
import ToastMessage from '../../components/HeaderComponent/ToastMessage';

const DefaultLayout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
            <ToastMessage/>

        </>
    );
};

export default DefaultLayout;
