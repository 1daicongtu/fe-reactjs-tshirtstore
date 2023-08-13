import clsx from "clsx";
import styles from "./AskQuestionForProduct.module.scss"
import convertPriceInt from "../../utils/convertIntPriceToStringPriceDouble";
import {useForm} from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";

const validateForm = yup.object().shape({
    name: yup.string().required("The field is required"),
    email: yup.string().required("The field is required").email("Email is invalid"),
    message: yup.string().required("The field is required")
})

const AskQuestionForProductModal = ({
    setTabServicesActive,
    tabServicesActive,
    keyTab,
    product
}) => {
    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        mode: "onChange",
        reValidateMode: "onBlur",
        resolver: yupResolver(validateForm)
    });

    const handleSubmitForm = (data)=>{
        if (isValid){
            console.log(data);
        }
    }

    return (
        <div className={clsx(styles.modal, keyTab === tabServicesActive ? styles.activeModal : "")}
            onClick={() => setTabServicesActive(0)}
        >
            <div className={clsx(styles.modalBox, keyTab === tabServicesActive ? styles.activeModal : "")}
                onClick={(e)=>e.stopPropagation()}
            >
                <div className={styles.modalBoxDetail}>
                    <div className={styles.modalHeader}>
                        <i className={`fa-solid fa-xmark ${styles.modalClose}`}
                            onClick={() => setTabServicesActive(0)}
                        ></i>
                        <div
                            className={clsx(styles.modalInfoProduct)}
                        >   
                            <img className={clsx(styles.modalInfoProductImg)} src={product?.imageSmall?.[0]?.imgURL} alt="anh sp" />
                           
                        </div>
                        <p className={clsx(styles.modalInfoProductName)}>
                                {product?.productName}
                        </p>
                        <p className={clsx(styles.modalInfoProductPrice)}>
                            ${convertPriceInt(product?.costLowest)} - ${convertPriceInt(product?.costHighest)}
                        </p>
                    </div>
                    <div className={styles.modalBody}>
                        <h1 className={styles.modalBodyTitle}>Ask a Question</h1>
                        <form action="" method="POST"
                            onSubmit={handleSubmit(handleSubmitForm)}
                        >
                            <div className={`row ${styles.modalBodyForm}`}>
                                <div  className={`col col-xs-12 col-md-12 col-lg-12 ${styles.modalFormGroup}`}>
                                    <input 
                                        {...register("name")}
                                        className={clsx(styles.modalBodyInput)} type="text" placeholder="Your Name (required)"/>
                                    {
                                        errors.name && <span className={styles.errMsg}>{errors.name.message}</span>
                                    }
                                </div>
                                <div  className={`col col-xs-12 col-md-6 col-lg-6 ${styles.modalFormGroup}`}>
                                    <input 
                                        {...register("email")}
                                        className={clsx(styles.modalBodyInput)} type="email" placeholder="Your Email (required)"/>
                                    {
                                        errors.email && <span className={styles.errMsg}>{errors.email.message}</span>
                                    }
                                </div>
                                <div  className={`"col col-xs-12 col-md-6 col-lg-6 ${styles.modalFormGroup}`}>
                                    <input 
                                        {...register("phoneNumber")}
                                        className={clsx(styles.modalBodyInput)} type="text" placeholder="Phone Number"/>
                                    
                                </div>
                                <div   className={`col col-xs-12 col-md-12 col-lg-12 ${styles.modalFormGroup}`}>
                                    <textarea className={clsx(styles.modalBodyInput)} name="" id="" cols="30" rows="6"
                                        {...register("message")}
                                        placeholder="Your Message (required)"
                                    >


                                    </textarea>
                                    {
                                        errors.message && <span className={styles.errMsg}>{errors.message.message}</span>
                                    }
                                </div>
                            </div>
                            <div className={clsx(styles.modalFormGroup)}>
                                <input type="submit" value="SUBMIT NOW" className={styles.btnSubmitForm}/>
                                {
                                    errors.message 
                                    && 
                                    <span className={clsx(styles.errMsgOutside)}>
                                        One or more fields have an error. Please check and try again.
                                    </span>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AskQuestionForProductModal;