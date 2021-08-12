import React from "react";
import style from "./footer.module.css";

const Footer = () => {
    return (
        <div className={style.footerContainer}>
            <div className={style.topFooter}>
                <div className={style.upperPart}>
                    <ul>
                        <li>About us</li>
                        <li>New in</li>
                        <li>Sale</li>
                        <li>Women</li>
                        <li>Men</li>
                        <li>Season</li>
                        <li>Blog</li>
                        <li>Contact us</li>
                    </ul>
                    <ul>
                        <li>
                            <img src="/img/twitter.png" />
                        </li>
                        <li>
                            <img src="/img/twitter.png" />
                        </li>
                        <li>
                            <img src="/img/twitter.png" />
                        </li>
                    </ul>
                </div>
                <div className={style.lowerPart}></div>
            </div>
            <div className={style.bottomFooter}></div>
        </div>
    );
};

export default Footer;