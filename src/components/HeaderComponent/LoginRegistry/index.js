import React from 'react';
import clsx from 'clsx';
import styles from "./LoginRegistry.module.scss"
import { NavLink } from 'react-router-dom';

const LoginRegistry = ({loginRegistry, setLoginRegistry}) => {
    return (
        <>
            <div className={clsx(styles.modal, !loginRegistry ? styles.unactive : "")}
                onClick={() => {setLoginRegistry(false)}}
            ></div>
            <div className={clsx(styles.modalBox, loginRegistry ? styles.active : "")}>
                <div className={clsx(styles.modalHeader)}>
                    <NavLink to="/" className={styles.modalLogo}>
                        <img src="https://i.imgur.com/Hc92VcL.png" alt="logo" />
                    </NavLink>
                    <span className={clsx(styles.btnCloseModal)}
                        onClick={() => {setLoginRegistry(false)}}
                    >
                        <i class="fa-solid fa-xmark"></i>
                    </span>
                </div>

                <div className={clsx(styles.modalBody)}>
                    <h3>Great to have you back!</h3>
                    <div className={clsx(styles.labelUsername)}>
                        <label htmlFor="username">Username or email
                            <span>*</span>
                        </label>
                        <div className={clsx(styles.rememberPassword)}>
                            <input type="checkbox" name="loginRemember" id="loginRemember" />
                            <label htmlFor="loginRemember">Remember</label>
                        </div>
                    </div>
                    <input type="text" id='username' className={clsx(styles.inputForm)} />
                    <div className={clsx(styles.labelPassword)}>
                        <label htmlFor="password">Password
                            <span>*</span>
                        </label>
                        <div className={clsx(styles.lostPassword)}>
                            <NavLink to="/" className={styles.linkLostPassword}>Lost?</NavLink>
                        </div>
                    </div>
                    <input type="text" id='password' className={clsx(styles.inputForm)} />

                    <button>
                        SIGN IN TO YOUR ACCOUNT
                    </button>
                    <div className={clsx(styles.contentLogin)}>
                        <h4>Or Login with</h4>
                    </div>
                    <div className={clsx(styles.linkWithSocial)}>
                        <NavLink to="/" className={clsx(styles.itemSocial)}>
                            <i class="fa-brands fa-facebook"></i>
                            <span>Facebook</span>
                        </NavLink>
                        <NavLink to="/" className={clsx(styles.itemSocial)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#4285F4" d="M20.64 12.2045c0-.6381-.0573-1.2518-.1636-1.8409H12v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z"></path><path fill="#34A853" d="M12 21c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5831-5.036-3.7104H3.9574v2.3318C5.4382 18.9832 8.4818 21 12 21z"></path><path fill="#FBBC05" d="M6.964 13.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2823-1.71V7.9582H3.9573A8.9965 8.9965 0 0 0 3 12c0 1.4523.3477 2.8268.9573 4.0418L6.964 13.71z"></path><path fill="#EA4335" d="M12 6.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C16.4632 3.8918 14.426 3 12 3 8.4818 3 5.4382 5.0168 3.9573 7.9582L6.964 10.29C7.6718 8.1627 9.6559 6.5795 12 6.5795z"></path></svg>
                            <span>Google</span>
                        </NavLink>
                    </div>

                    <h6>
                        Not a member? 
                        <NavLink to="/" className={clsx(styles.createAccount)}>Create An account</NavLink>
                    </h6>
                </div>
            </div>
        </>
    );
};

export default LoginRegistry;