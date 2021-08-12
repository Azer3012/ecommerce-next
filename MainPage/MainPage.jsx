import React, { useEffect, useState } from 'react';
import styles from "./MainPage.module.css";
import axios from "axios";
import Button from '../Components/Button/Button';
import Header from "../Components/Header/Header";
// import Footer from '../Components/Footer/Footer';
import Link from "next/link";
import OneProduct from './OneProduct/OneProduct';
import Footer from '../Components/Footer/Footer';

const MainPage = () => {

    const [products, setProducts] = useState();
    const [slicer, setSlicer] = useState(4);

    useEffect(() => {
        axios.get("https://shopapi.inloya.com/api/Compilation/mainpage?token=%2F&lng=en")
            .then(res => {
                let arrayIndex = res.data.obj;
                arrayIndex.map((value, index) => {
                    arrayIndex[index].count = slicer;
                });
                setProducts([...arrayIndex]);
            })
    }, [])


    const handleShowMore = (index) => {
        let myIndex = products;
        myIndex[index].count = myIndex[index].count + slicer;
        setProducts([...myIndex])
    }



    return (
        <div>
            <Header />
            <div className={styles.App}>
                {products && products.map((value, index) => {
                    let num = products[index].count
                    return (
                        <div className={styles.title}>
                            <h2>{value.name}</h2>
                            <div className={styles.dflex}>
                                {value.goods.slice(0, num).map(item => (
                                    <Link href={{
                                        pathname: "/oneproduct",
                                        query: { code: item.code }
                                    }}>
                                        <div className={styles.col1}>
                                            <figure>
                                                <img src={item.imageUrl} />
                                            </figure>
                                            <h5>{item.name}</h5>
                                            <p>{item.price}$</p>
                                        </div>
                                    </Link>
                                ))}
                                <span onClick={() => handleShowMore(index)}><Button></Button></span>
                            </div>
                        </div>
                    )
                })}
                <h1>Our Store</h1>
                <div className={styles.store}>
                    <img src="../img/Map.png" />
                    <div>
                        <p>123 Fake St. Toronto, Canada Mon <br /> - Fri, 10am - 9pm Sat & Sun, 11am - 5pm</p>
                        <Button></Button>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default MainPage
