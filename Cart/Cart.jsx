import axios from 'axios';
import React, { useEffect, useState } from 'react';
import style from "./Cart.module.css";
import Header from '../Components/Header/Header';

const Cart = () => {

    const [cartList, setCartList] = useState();
    const [deleteItem, setDeleteItem] = useState(false);
    const [isChanging, setIsChanging] = useState(false);
    const token = "C9U0VC0TMRZ5N8RBNUSKT7RG32AG5V34";

    useEffect(() => {
        axios.get("https://shopapi.inloya.com/api/Cart/getcartlist?token=C9U0VC0TMRZ5N8RBNUSKT7RG32AG5V34&lng=en")
            .then(res => setCartList(res.data.obj.listViewModel));
    }, [deleteItem])


    const increaseHandler = (goodsId, colorId, sizeId) => {
        axios.post("https://shopapi.inloya.com/api/Cart/addtocart", {
            goodsId: goodsId,
            colorId: colorId,
            sizeId: sizeId,
            token: token,
            counter: 1
        }).then(res => {
            setDeleteItem(!deleteItem)
            setIsChanging(!isChanging)
        })
    }

    const decreaseHandler = (goodsId, colorId, sizeId) => {
        axios.post("https://shopapi.inloya.com/api/Cart/addtocart", {
            goodsId: goodsId,
            colorId: colorId,
            sizeId: sizeId,
            token: token,
            counter: -1
        }).then(res => {
            setDeleteItem(!deleteItem)
            setIsChanging(!isChanging)
        })
    }

    const removeItem = (id) => {
        axios.post("https://shopapi.inloya.com/api/Cart/deletecartitem", {
            cartId: id,
            token: token,
            oneCLick: 0,
        }
        ).then(res => setDeleteItem(res.data))
    }



    return (
        <div>
            <Header />
            <div className={style.App} >
                <h2>Product</h2>
                <h2>Description</h2>
                <h2>Quantity</h2>
                <h3>Unit Price</h3>
                <h3>Total Amount</h3>
                <h3>Remove</h3>
            </div>
            {cartList && (
                <div>
                    {cartList.map(value => (
                        <div className={style.App}>
                            <figure><img src={value.imageUrl} /></figure>
                            <h5>{value.name}</h5>
                            <div>
                                <button onClick={() => decreaseHandler(value.goodsId, value.colorId, value.sizeId)}>-</button>
                                <button>{value.counter}</button>
                                <button onClick={() => increaseHandler(value.goodsId, value.colorId, value.sizeId)}>+</button>
                            </div>
                            <p>{Number(value.price * value.counter.toFixed(2))}$</p>
                            <span onClick={() => removeItem(value.id)}>X</span>
                        </div>
                    ))}
                </div>
            )}
        </div >

    )
}

export default Cart
