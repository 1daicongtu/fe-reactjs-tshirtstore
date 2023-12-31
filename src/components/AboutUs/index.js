import clsx from "clsx"
import styles from "./styleAboutUs.module.scss"
import TreePath from "../TreePath"
import configs from "../../config"
import { useState } from "react"


const listWhatWeCanDo = [
    {
        title: "Best Quantity",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s"
    },
    {
        title: "Customer Care",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s"
    },
    {
        title: "Best Quantity",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s"
    },
    {
        title: "Support 24/7",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s"
    },
    {
        title: "What We Do",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s"
    },
]

export default function AboutUs() {
    const [activeIndex, setActiveIndex] = useState(0)
  return (
    <div className={clsx(styles.parentWrapper)}>
        <TreePath
            title={"About Us"}
            listPathTree={[
                {
                    name: "Home",
                    link: configs.routes.homePage,
                }
            ]}
        />
        <div className={clsx(styles.aboutUsWrapper)}>
            <div className={clsx("row g-0")}>
                <div className={clsx("col-12 col-md-5 col-lg-4")}>
                    <p className={clsx(styles.titleOurStory)}>Our Story</p>
                    <p className={clsx(styles.descOurStore)}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        <br/><br/>
                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>
                <div className={clsx("col-12 col-md-7 col-lg-8")}>
                    <img className={clsx(styles.imgOurStory)} src="https://elessi.b-cdn.net/wp-content/uploads/2019/08/about-us-1.jpg" alt="our-story"/>
                </div>
            </div>
            <div className={clsx("row g-0", styles.boxWhatWeDoRow)}>
                <div className={clsx("col-12 col-md-7 col-lg-8", styles.boxWhatWeDoCol)}>
                    <p className={clsx(styles.labelWhatWeDo)}>What can we do for you?</p>
                    <div className={clsx(styles.whatWeCanDoList)}>
                        {
                            listWhatWeCanDo 
                            && 
                            listWhatWeCanDo.map((item, index)=>{
                                return (
                                    <div className={clsx(styles.whatWeCanDoItem)} key={index}>
                                        <div className={clsx(styles.whatWeCanDoItemHeader, activeIndex == index ? styles.active : "")}
                                            onClick={() => {
                                                if(activeIndex == index) {
                                                    setActiveIndex(-1)
                                                } else {
                                                    setActiveIndex(index)
                                                }
                                            }}
                                        >
                                            <div className={clsx(styles.boxIconsOpenClose)}>
                                                <i className={clsx(styles.boxIconsOpen, styles.active, "fa-solid fa-minus")}></i>
                                                <i className={clsx(styles.boxIconsClose, "fa-solid fa-minus")}></i>
                                            </div>
                                            <p className={clsx(styles.titleWhatWeDo)}>{item.title}</p>
                                        </div>
                                        <div className={clsx(styles.boxWhatWeCanDoItemDesc, activeIndex == index ? styles.active : "" )}>
                                            <div className={clsx(styles.padding15, activeIndex == index ? styles.active : "" )}></div>
                                            <div className={clsx(styles.whatWeCanDoItemDesc, activeIndex == index ? styles.active : "")}>
                                            {item.desc}
                                            </div>
                                            <div className={clsx(styles.padding15, activeIndex == index ? styles.active : "")}></div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                </div>
                <div className={clsx("col-12 col-md-5 col-lg-4", styles.boxWhatWeDoCol)}>
                    <p className={clsx(styles.labelWhatWeDo)}>Hour Of Operation</p>
                    <ul className={clsx(styles.workingScheduleList)}>
                        <li className={clsx(styles.workingScheduleItem)}>
                            <p>Monday: </p>
                            <p>12-6PM</p>
                        </li>
                        <li className={clsx(styles.workingScheduleItem)}>
                            <p>Tuesday: </p>
                            <p>12-6PM</p>
                        </li>
                        <li className={clsx(styles.workingScheduleItem)}>
                            <p>Wednesday: </p>
                            <p>12-6PM</p>
                        </li>
                        <li className={clsx(styles.workingScheduleItem)}> 
                            <p>Thursday: </p>
                            <p>12-6PM</p>
                        </li>
                        <li className={clsx(styles.workingScheduleItem)}>
                            <p>Friday: </p>
                            <p>12-6PM</p>
                        </li>
                        <li className={clsx(styles.workingScheduleItem)}>
                            <p>Saturday: </p>
                            <p>12-6PM</p>
                        </li>
                        <li className={clsx(styles.workingScheduleItem)}>
                            <p>Sunday: </p>
                            <p>Closed</p>
                        </li>
                    </ul>
                    <p className={clsx(styles.labelWhatWeDo)}>Career</p>
                    <p className={clsx(styles.descCareer)}>
                        If you’re interested in employment opportunities at Elessi, please email us: hieurio12@gmail.com
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}
