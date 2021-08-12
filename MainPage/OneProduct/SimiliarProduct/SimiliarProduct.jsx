import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./similiar.module.css";

const SimilarProducts = ({ goodsId, categoryId }) => {

    const [similars, setSimilars] = useState();
    const [count, setCount] = useState(3);

    useEffect(() => {
        const url = `https://shopapi.inloya.com/api/GoodsInfo/getsamectgrgoods?lng=az&categoryid=${categoryId}&goodsid=${goodsId}
        `;
        axios.get(url).then((res) => setSimilars(res.data.obj));
    }, []);


    const ShowMore = () => {
        setCount(count + 5)
    }

    return (
        <div className={styles.Similars}>
            {similars && similars.slice(0, count).map(value => (
                <div>
                    <h1>{value.name}</h1>
                    <img src={value.imageUrl} />
                </div>
            ))}
            <button onClick={ShowMore}>Show More</button>
        </div>
    )
}

export default SimilarProducts
