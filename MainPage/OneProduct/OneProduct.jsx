import { useRouter } from 'next/dist/client/router'
import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from "axios";
import style from "./OneProduct.module.css";
import Header from "../../Components/Header/Header";
import SimilarProducts from './SimiliarProduct/SimiliarProduct';

const OneProduct = () => {

    const [products, setProducts] = useState();
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState();
    const [colorId, setColorId] = useState();
    const [sizeId, setSizeId] = useState();
    const [cartValue, setCartValue] = useState(false);

    const router = useRouter();
    const productId = router.query.code;
    const token = "C9U0VC0TMRZ5N8RBNUSKT7RG32AG5V34";


    useEffect(() => {
        axios.get(`https://shopapi.inloya.com/api/GoodsInfo/goodsinfo?lng=en&code=${productId}`)
            .then(res => setProducts(res.data.obj))
    }, [router.query.code])


    const decreaseHandler = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1)
        }
    }

    const increaseHandler = () => {
        setQuantity(quantity + 1)
    }


    useEffect(() => {
        if (products) {
            setMainImage(products.mainImageUrl)
        }
    }, [products])


    const handleImage = (url) => {
        setMainImage(url)
    }



    const selectedColor = (color) => {
        setColorId(color.id);
    }


    const selectedSize = (size) => {
        setColorId(size.id);
    }


    const addToCart = () => {
        axios.post("https://shopapi.inloya.com/api/Cart/addtocart", {
            goodsId: products.good.id,
            sizeId: sizeId,
            colorId: colorId,
            token: token,
            counter: quantity
        }).then(res => console.log(res.data))

        setCartValue(!cartValue);
    }




    return (
        <div>
            <Header cartValue={cartValue} />
            {products &&
                <div className={style.App} >
                    <div>
                        <figure>
                            <img src={mainImage} />
                        </figure>
                        <div className={style.changeImage}>
                            {products.goodimages.map(imageUrl => (
                                <figure onClick={() => handleImage(imageUrl)}>
                                    <img src={imageUrl} />
                                </figure>
                            ))}
                        </div>
                    </div>
                    <div className={style.About}>
                        <h2>{products.good.name}</h2>
                        <h3>${products.good.price}</h3>
                        <h1>Size</h1>
                        {products.itemsize.map(size => (
                            <p onClick={() => selectedSize(size)}>{size.name}</p>
                        ))}
                        <h1>Color</h1>
                        {products.itemcolors.map(color => (
                            <button onClick={() => selectedColor(color)} style={{ backgroundColor: color.code }}>{color.name}</button>
                        ))}
                        <h1>Quantity</h1>
                        <div>
                            <button onClick={decreaseHandler}>-</button>
                            <button>{quantity}</button>
                            <button onClick={increaseHandler}>+</button>
                        </div>
                        <button onClick={addToCart} className={style.adToCart}>add To Cart</button>
                    </div>
                </div>
            }
            {
                products && (
                    <SimilarProducts
                        goodsId={products.good.id}
                        categoryId={products.good.categoryId}
                    />
                )
            }
        </div>
    )
}

export default OneProduct
