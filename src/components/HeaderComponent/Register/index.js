
import clsx from "clsx";
import styles from "./Register.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setRegister } from "../../../redux/slices/headerStateSlice";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import {useForm} from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { addToastMessage } from "../ToastMessage";

const validation = yup.object().shape({
    username: yup.string().required("Username is required").min(5, "Username must be at least 5 characters")
    .matches(/^[a-zA-Z0-9]+$/, "Username must be alphanumeric"),
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    confirmPassword: yup.string().required("Confirm password is required").oneOf([yup.ref("password")], "Confirm password does not match")
})

const Register = () => {
    const dispatch = useDispatch();
    const register = useSelector(state => state.headerStates.register);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {register: registerForm, handleSubmit, formState: {errors, isValid}, reset} = useForm({
        mode: "onChange",
        
        resolver: yupResolver(validation)
    })

    const handleOpenLogin = ()=>{
        dispatch(setRegister(false));
        dispatch(setLogin(true))
    }

    const handleSubmitForm = async(data)=>{
        if (isValid){
            try {
                const res = await axios.post(process.env.REACT_APP_PROXY + `/users/sign-up`, data);
                if (res.status == 200){
                    addToastMessage({title: "Register success", message: res.data.message, type: "success"})
                    reset();
                }
            } catch (error) {
             
                addToastMessage({title: "Register failed", message: error.response?.data?.message, type: "error"})
            }

        }
    }
    return (
        <>
             <div
                className={clsx(
                    styles.modal,
                    !register ? styles.unactive : '',
                )}
                onClick={() => {
                    dispatch(setRegister(false));
                }}
            >

            </div>
            <div
                className={clsx(
                    styles.modalBox,
                    register ? styles.active : '',
                )}
            >
                <div className={clsx(styles.modalHeader)}>
                    <NavLink to="/" className={styles.modalLogo}>
                        <img src="https://i.imgur.com/Hc92VcL.png" alt="logo" />
                    </NavLink>
                    <span
                        className={clsx(styles.btnCloseModal)}
                        onClick={() => {
                            dispatch(setRegister(false));
                        }}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </span>
                </div>
                <div className={clsx(styles.modalBody)}>
                    <h3 className={clsx(styles.titleModal)}>Sign Up</h3>
                    <form action="" className={clsx(styles.registerForm)}
                        onSubmit={handleSubmit(handleSubmitForm)}
                    >
                        <div className={`row`}>

                            <div className={`col-12 ${clsx(styles.formGroup)}`}>
                                <div className={clsx(styles.formTitle)}>
                                    <label htmlFor="usernameSignUp">Username <span>*</span></label>
                                </div>
                                <input className={clsx(styles.formInput)} type="text" id="usernameSignUp" 
                                    {...registerForm("username")}
                                />
                                <span className={clsx(styles.msgErr)}>{errors.username?.message}</span>
                            </div>

                            <div className={`col-6 ${clsx(styles.formGroup)}`}>
                                <div className={clsx(styles.formTitle)}>
                                    <label htmlFor="firstName">First Name <span>*</span></label>
                                </div>
                                <input className={clsx(styles.formInput)} type="text" id="firstName" 
                                    {...registerForm("firstName")}
                                />
                                <span className={clsx(styles.msgErr)}>{errors.firstName?.message}</span>
                            </div>

                            <div className={`col-6 ${clsx(styles.formGroup)}`}>
                                <div className={clsx(styles.formTitle)}>
                                    <label htmlFor="lastName">Last Name <span>*</span></label>
                                </div>
                                <input className={clsx(styles.formInput)} type="text" id="lastName" 
                                    {...registerForm("lastName")}
                                />  
                                <span className={clsx(styles.msgErr)}>{errors.lastName?.message}</span>
                            </div>

                            <div className={`col-12 ${clsx(styles.formGroup)}`}>
                                <div className={clsx(styles.formTitle)}>
                                    <label htmlFor="email">Email <span>*</span></label>
                                </div>
                                <input className={clsx(styles.formInput)} type="email" id="email" 
                                    {...registerForm("email")}
                                />
                                <span className={clsx(styles.msgErr)}>{errors.email?.message}</span>
                            </div>

                            <div className={`col-12 ${clsx(styles.formGroup)}`}>
                                <div className={clsx(styles.formTitle)}>
                                    <label htmlFor="passwordSignUp">Password <span>*</span></label>
                                    <div className={clsx(styles.showPwBox)}>
                                        <input type="checkbox" id="showPassword"
                                            checked={showPassword}
                                            onChange={() => setShowPassword(!showPassword)}
                                        />
                                        <label htmlFor="showPassword">Show</label>
                                    </div>
                                </div>
                                <input className={clsx(styles.formInput)} type={showPassword ? "text" : "password"} id="passwordSignUp"
                                    {...registerForm("password")}
                                    autoComplete="off"
                                />
                                <span className={clsx(styles.msgErr)}>{errors.password?.message}</span>
                            </div>

                            <div className={`col-12 ${clsx(styles.formGroup)}`}>
                                <div className={clsx(styles.formTitle)}>
                                    <label htmlFor="confirmPassword">Confirm Password <span>*</span></label>
                                    <div className={clsx(styles.showPwBox)}>
                                        <input type="checkbox" id="showConfirmPassword"
                                            checked={showConfirmPassword}
                                            onChange={() => setShowConfirmPassword(!showConfirmPassword)}
                                        />
                                        <label htmlFor="showConfirmPassword">Show</label>
                                    </div>
                                </div>
                                <input className={clsx(styles.formInput)} type={showConfirmPassword ? "text" : "password"} id="confirmPassword" 
                                    {...registerForm("confirmPassword")}
                                    autoComplete="off"
                                />
                                <span className={clsx(styles.msgErr)}>{errors.confirmPassword?.message}</span>
                            </div>

                        </div>
                        <input type="submit" value="SIGN UP" className={clsx(styles.btnSignUp)}/>
                    </form>
                    <p className={clsx(styles.alreadyAccount)}
                        onClick={handleOpenLogin}
                    >   
                        Already have an account? 
                        <span className={clsx(styles.goToLogin)}>Login</span>
                    </p>
                </div>

            </div>
        </>
    );
};

export default Register;