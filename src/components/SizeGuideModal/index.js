
import clsx from "clsx";
import styles from "./SizeGuideModal.module.scss";
import { useState } from "react";

const sizeGuideDate = [
    {
        name: "Dresses",
        guide: [
            {
                size: "XS", 
                chest: "34",
                waist: "28",
                hip: "34"
            },
            {
                size: "S",
                chest: "36",
                waist: "30",
                hip: "36"
            },
            {
                size: "M",
                chest: "38",
                waist: "32",
                hip: "38"
            },
            {
                size: "L",
                chest: "40",
                waist: "34",
                hip: "40"
            },
            {
                size: "XL",
                chest: "42",
                waist: "36",
                hip: "42"
            },
            {
                size: "XXL",
                chest: "44",
                waist: "38",
                hip: "44"
            }
        ]

    },
    {
        name: "T-SHIRT",
        guide: [
            {
                size: "XXS",
                chest: "32",
                waist: "26",
                hip: "32"
            },
            {
                size: "XS",
                chest: "34",
                waist: "28",
                hip: "34"
            },
            {
                size: "S",
                chest: "36",
                waist: "30",
                hip: "36"
            },
            {
                size: "M",
                chest: "38",
                waist: "32",
                hip: "38"
                
            },
            {
                size: "L",
                chest: "40",
                waist: "34",
                hip: "40"
            },
            {
                size: "XL",
                chest: "42",
                waist: "36",
                hip: "42"

            }
        ]
    },
    {
        name: "Bottoms",
        guide: [
            {
                size: "XS",
                chest: "34",
                waist: "28",
                hip: "34"
            },
            {
                size: "S",
                chest: "36",
                waist: "30",
                hip: "36"
            },
            {
                size: "M",
                chest: "38",
                waist: "32",
                hip: "38"
            },
            {
                size: "L",
                chest: "40",
                waist: "34",
                hip: "40"
            },
            {
                size: "XL",
                chest: "42",
                waist: "36",
                hip: "42"
            },
            {
                size: "XXL",
                chest: "44",
                waist: "38",
                hip: "44"
            }
        ]
    }
]


const SizeGuide = ({
    setTabServicesActive,
    tabServicesActive,
    keyTab
}) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className={clsx(styles.modal, keyTab=== tabServicesActive ? styles.activeModal : "")}
            onClick={()=>setTabServicesActive(0)}
        >
            <div className={clsx(styles.modalBox, keyTab=== tabServicesActive ? styles.activeModal : "")}
               
                onClick={(e)=>e.stopPropagation()}
            >
                <div className={styles.modalBoxDetail}>
                    <div className={styles.modalHeader}>
                        <i className={`fa-solid fa-xmark ${styles.modalClose}`}
                            onClick={()=>setTabServicesActive(0)}
                        ></i>
                        <h1 className={styles.modalTitle}>Size Guide</h1>
                    </div>
                    <div className={styles.modalBody}>
                        <div className={styles.modalBodyContent}>
                            {
                                sizeGuideDate && sizeGuideDate.map((item, index)=>{
                                    return (
                                        <p key={index} className={clsx(styles.itemTab, activeTab == index ? styles.activeTab : "")} onClick={()=>setActiveTab(index)}>
                                            {item.name}
                                        </p>
                                    )
                                })
                            }
                        </div>
                        <div className={clsx(styles.modalBodyContentDetail)}>
                            {
                                    sizeGuideDate && sizeGuideDate.map((item, index)=>{
                                        return (
                                            <div key={index} className={clsx(styles.tabContentList)}
                                                style={{display: activeTab == index ? "block" : "none"}}
                                            >
                                                <div className={clsx(styles.tableTitle)}>
                                                        <p style={{width: `calc(100% / ${Object.keys(item.guide).length})`}}>SIZE</p>
                                                        <p style={{width: `calc(100% / ${Object.keys(item.guide).length})`}}>CHEST</p>
                                                        <p style={{width: `calc(100% / ${Object.keys(item.guide).length})`}}>WAIST</p>
                                                        <p style={{width: `calc(100% / ${Object.keys(item.guide).length})`}}>HIP</p>
                                                </div>
                                                {
                                                    item.guide && item.guide.map((guide, index2)=>{
                                                        return (
                                                            <div key={index2} className={clsx(styles.tableContent)}>
                                                                <p style={{width: `calc(100% / ${Object.keys(guide).length})`}}>{guide.size}</p>
                                                                <p style={{width: `calc(100% / ${Object.keys(guide).length})`}}>{guide.chest}</p>
                                                                <p style={{width: `calc(100% / ${Object.keys(guide).length})`}}>{guide.waist}</p>
                                                                <p style={{width: `calc(100% / ${Object.keys(guide).length})`}}>{guide.hip}</p>
                                                            </div>
                                                        )
                                                    })
                                                }  
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className={styles.noteContent}>
                                All measurements are in INCHES
                                    and may vary a half inch in either direction.
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
};

export default SizeGuide;
