import axios from 'axios';
import React, { useEffect, useState } from 'react';
import style from "./AllProducts.module.css";
import Categories from './Categories/Categories';
import Pagination from "../Components/Pagination/Pagination";
import Header from "../Components/Header/Header";
import Link from "next/link";
import { useRouter } from 'next/dist/client/router';

const AllProducts = () => {

    const token = "C9U0VC0TMRZ5N8RBNUSKT7RG32AG5V34";

    const router = useRouter();
    const selectedCatIds = router.query.id;

    console.log(selectedCatIds);

    const [cartValue, setCartValue] = useState(false);
    const [showCount, setShowCount] = useState(0);
    const [products, setProducts] = useState();
    const [collections, setCollections] = useState();
    const [initialSlicer, setInitialSlicer] = useState(0)
    const [slicer, setSlicer] = useState(9);
    const [page, setPage] = useState(1);

    let iSlicer = 0;
    let _slicer = 9;


    useEffect(() => {

        axios.get(`https://shopapi.inloya.com/api/GoodsList/getgoodslist?selectedCatIds=${router.query.id}`)
            .then(res => {
                setProducts(res.data.obj)
                setShowCount(Math.ceil(res.data.obj.length / slicer))
            });

    }, [router.query.id])


    useEffect(() => {
        axios.get("https://shopapi.inloya.com/api/GoodsList/GetFilters?lng=az")
            .then(res => setCollections(res.data.obj))


        axios.get(`https://shopapi.inloya.com/api/GoodsList/getgoodslist`)
            .then(res => {
                setProducts(res.data.obj)
                setShowCount(Math.ceil(res.data.obj.length / slicer))
            });
    }, [])


    const handleChange = (event, value) => {
        setPage(value);

        setInitialSlicer(_slicer * value - _slicer)
        setSlicer(_slicer * value)

    };


    return (
        <React.Fragment>
            <Header />
            <div className={style.container}>
                <div className={style.categories}><Categories collections={collections} /></div>
                <div className={style.App}>
                    {products && products.slice(initialSlicer, slicer).map(prd => {
                        return (
                            <div className={style.col1} key={prd.imageUrl}>
                                <figure>
                                    <img src={prd.imageUrl} />
                                </figure>
                                <h3>{prd.name}</h3>
                                <span>{prd.price}$</span>
                                <Link href={{
                                    pathname: "/oneproduct",
                                    query: { code: prd.code }
                                }}>
                                    <button>More</button>
                                </Link>
                            </div>
                        )
                    })}
                </div>
                <Pagination count={showCount} page={page} onChange={handleChange} />
            </div>
        </React.Fragment>
    )
}



export default AllProducts
