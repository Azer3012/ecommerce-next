import axios from 'axios';
import React, { useEffect, useState } from 'react';
import style from "./Header.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import DropDown from './DropDown/DropDown';
import { GiHamburgerMenu } from "react-icons/gi"
import { AiOutlineClose } from "react-icons/ai"
import Link from "next/link";



const Header = ({ cartValue }) => {

    const [header, setHeaders] = useState();
    const [wordsNull, setWordsNull] = useState();
    const [isVisible, setIsVisible] = useState(false);
    const [cartlist, setCartList] = useState();

    let myIndex = [];


    useEffect(() => {

        axios.get("https://shopapi.inloya.com/api/Category/getcategories?lng=en")
            .then(res => setHeaders(res.data.obj))

        axios.get("https://shopapi.inloya.com/api/Category/getcategories?lng=en")
            .then(res => res.data.obj.map(item => {
                if (item.parentId !== null) {
                    myIndex.push(item);
                }
                setWordsNull([...myIndex]);
            }))
    }, [])



    useEffect(() => {
        axios.get("https://shopapi.inloya.com/api/Cart/getcartlist?token=C9U0VC0TMRZ5N8RBNUSKT7RG32AG5V34&lng=en")
            .then(res => setCartList(res.data.obj.listViewModel.length))
    }, [cartValue])



    return (
        <div className={style.App}>
            <Link href={{ pathname: './mainpage' }}><h2>Logo</h2></Link>
            <ul onClick={() => setIsVisible(false)} className={isVisible ? style.navlinkmobile : style.navlink}>
                {header && header.map(value => value.parentId === null && (
                    <li key={value.name}>{value.name}
                        <ul className={style.submenu}>
                            {wordsNull && wordsNull.map(item => {
                                if (item.parentId === value.id) {
                                    return (
                                        <Link href={{ pathname: "./allproducts", query: { id: item.id } }}>
                                            <div><DropDown name={item.name} /></div>
                                        </Link>
                                    )
                                }
                            })}
                        </ul>
                    </li>
                ))}
            </ul>
            <span onClick={() => setIsVisible(!isVisible)} className={style.mobilemenuicon}>
                {isVisible ? < AiOutlineClose /> : <GiHamburgerMenu />}
            </span>
            <Link href={{ pathname: "./search" }} ><span><AiOutlineSearch /></span></Link>
            <Link href={{ pathname: './register' }}><span><FaUserAlt /></span></Link>
            <Link href={{ pathname: "./cart" }}>
                <span><FaShoppingCart />
                    <div className={style.cartlist}>{cartlist && cartlist}</div>
                </span>
            </Link>
        </div >
    )
}

export default Header