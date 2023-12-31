import clsx from 'clsx'
import styles from './styleContactUs.module.scss'
import TreePath from '../TreePath'
import configs from '../../config'
import { Tooltip } from 'react-tooltip';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios"
import { addToastMessage } from '../HeaderComponent/ToastMessage';
import { ColorRing } from 'react-loader-spinner';

const schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    message: yup.string()
})

export default function ContactUs() {
   
    const { register, handleSubmit, formState: { errors, isValid},} = useForm({
        mode: "onChange",
        resolver: yupResolver(schema)
    });
    const [isLoadingSubmitForm, setIsLoadingSubmitForm] = useState(false)

    const handleSubmitFormContact = async (data)=>{
        if (isValid){
            try {
                setIsLoadingSubmitForm(true)
                const resp = await axios.post(`${process.env.REACT_APP_PROXY}/contact`, {
                    username: data.username,
                    email: data.email,
                    massage: data.massage
                })
                await new Promise((res, rej)=>{
                    setTimeout(()=>{
                        res()
                    }, 2000)
                })
                setIsLoadingSubmitForm(false)
                if (resp.status == 200){
                    addToastMessage({title: "Success", message: "Send message successfully", type: "success"})
                } else if (resp.status >= 500) {
                    addToastMessage({title: "Error", message: "Server error", type: "error"})
                }
            } catch (error) {
                console.log(error);
                setIsLoadingSubmitForm(false)
                addToastMessage({title: "Error", message: "Server error", type: "error"})
            }
        }
    }

    return (
        <div>
            <TreePath
                    title={"Contact Us"}
                    listPathTree={[
                        {
                            name: "Home",
                            link: configs.routes.homePage,

                        }
                    ]}
            />
            <div className={clsx(styles.contactUsWrapper)}>
                <div className={clsx(styles.boxInfoUs, "row g-0")}>
                    <div className={clsx("col-12 col-md-5 col-lg-5", styles.colOfBoxInfoUs)}>
                        <div className={clsx(styles.roadToUs)}>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.8582378431365!2d106.6868454!3d10.8221589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174deb3ef536f31%3A0x8b7bb8b7c956157b!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBUUC5IQ00!5e0!3m2!1svi!2s!4v1703840352636!5m2!1svi!2s" style={{border:"0px", width: "100%", height: "100%"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                    <div className={clsx("col-12 col-md-7 col-lg-7", styles.colOfBoxInfoUs)}>
                        <div className={clsx(styles.boxContainTwoBoxInRow)}>
                            <div className={clsx(styles.boxInfoInRow)}>
                                <p className={clsx(styles.titleInfoUs)}>Address</p>
                                <p className={clsx(styles.textContentInfoUs)}>12 Nguyễn Văn Bảo, Phường 4<br/>
                                ,Gò Vấp, Thành phố Hồ Chí Minh
                                </p>
                            </div>
                            <div className={clsx(styles.boxInfoInRow)}>
                                <p className={clsx(styles.titleInfoUs)}>Mobile</p>
                                <p className={clsx(styles.textContentInfoUs)}>
                                    Mobile 1: (+01)-212-33-6789
                                </p>
                                <p className={clsx(styles.textContentInfoUs)}>
                                    Mobile 2: (+01)-212-66-8888
                                </p>
                                <p className={clsx(styles.textContentInfoUs)}>Hotline: 1900 888 888</p>
                            </div>
                        </div>
                        <div className={clsx(styles.boxContainTwoBoxInRow)}>
                            <div className={clsx(styles.boxInfoInRow)}>
                                <p className={clsx(styles.titleInfoUs)}>Email</p>
                                <p className={clsx(styles.textContentInfoUs)}>
                                    hieurio12@gmail.com
                                </p>
                                <p className={clsx(styles.textContentInfoUs)}>
                                    hieurio12@gmail.com
                                </p>
                            </div>
                            <div className={clsx(styles.boxInfoInRow)}>
                                <p className={clsx(styles.titleInfoUs)}>Social</p>
                                <div className={clsx(styles.boxSocialNetwork)}>
                                    <a href='#' data-tooltip-id='tooltip-tw' data-tooltip-content='Follow us on X'
                                        className={clsx(styles.linkToSocialNetwork)}    
                                    >
                                        <i class="fa-brands fa-twitter"></i>
                                        <Tooltip id="tooltip-tw"/>
                                    </a>
                                    <a href='#' data-tooltip-id='tooltip-fb' data-tooltip-content='Follow us on Facebook'
                                        className={clsx(styles.linkToSocialNetwork)}
                                    >
                                        <i class="fa-brands fa-facebook-f"></i>
                                        <Tooltip id="tooltip-fb"/>
                                    </a>
                                    <a href='#' data-tooltip-id='tooltip-email' data-tooltip-content='Send us an email'
                                        className={clsx(styles.linkToSocialNetwork)}
                                    >
                                        <i class="fa-regular fa-envelope"></i>
                                        <Tooltip id="tooltip-email"/>
                                    </a>
                                    <a href='#' data-tooltip-id='tooltip-ins' data-tooltip-content='Follow us on Instagram'
                                        className={clsx(styles.linkToSocialNetwork)}
                                    >
                                        <i class="fa-brands fa-instagram"></i>
                                        <Tooltip id="tooltip-ins"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <p className={clsx(styles.textContentInfoUs)}>
                            If you have any questions, please fell free to get in touch with us.<br/>
                            We will reply to you as soon as possible. Thank you!
                        </p>
                        <div className={clsx(styles.boxSendContactUs)}>
                            <p className={clsx(styles.titleSendContactUs)}>Drop Us A Line</p>
                            
                            <form method='post' action='#' 
                                onSubmit={handleSubmit(handleSubmitFormContact)}
                            >
                                <div className={clsx("row")}>
                                    <div className={clsx("col-12 col-md-6 col-lg-6", styles.formGroupContactUs)}>
                                        <label htmlFor="idName" className={clsx(styles.labelFormContactUs)} >Your name (required)</label>
                                        <input type='text' className={clsx(styles.inputContactUsForm, errors.username ? styles.errorInputContactUsForm : "")}
                                         placeholder='Your name' id='idName'
                                         {...register("username")}/>
                                        {errors.username && <span className={clsx(styles.errorFormContactUs)}>{errors.username.message}</span>}
                                    </div>
                                    <div className={clsx("col-12 col-md-6 col-lg-6", styles.formGroupContactUs)}>
                                        <label htmlFor="idEmail" className={clsx(styles.labelFormContactUs)} >Your email (required)</label>
                                        <input type='email' className={clsx(styles.inputContactUsForm, errors.username ? styles.errorInputContactUsForm : "")} 
                                        placeholder='Your email' id='idEmail'
                                        {...register("email")}/>
                                        {errors.email && <span className={clsx(styles.errorFormContactUs)}>{errors.email.message}</span>}
                                    </div>
                                    <div className={clsx("col-12 col-md-12 col-lg-12", styles.formGroupContactUs)}>
                                        <label htmlFor="idMsg"  className={clsx(styles.labelFormContactUs)} >Your Massage</label>
                                        <textarea placeholder='Your Message' className={clsx(styles.inputContactUsForm)} 
                                        {...register("massage")}
                                        id='idMsg' rows={5}/>
                                    </div>
                                </div>
                                <button type='submit' className={clsx(styles.btnSUbmitContactUsForm)}>
                                    {
                                        isLoadingSubmitForm
                                        ?
                                        <ColorRing
                                            visible={true}
                                            height="30"
                                            width="80"
                                            ariaLabel="color-ring-loading"
                                            wrapperStyle={{}}
                                            wrapperClass="color-ring-wrapper"
                                            colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
                                        />
                                        :
                                        "SUBSCRIBE"
                                    }
                                    </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
