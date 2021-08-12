import React, { useState } from 'react';
import style from "./Categories.module.css";
import axios from 'axios';
import PriceSlider from "../../Components/PriceSlider/PriceSlider";

const Categories = ({ collections }) => {

    const token = "C9U0VC0TMRZ5N8RBNUSKT7RG32AG5V34";

    const [selectors, setSelectors] = useState({
        setSelectedColors: [],
        setSelectedSizes: [],
        setSelectedCategories: [],
        setSelectedCollections: [],
    });

    const [isVisible, setIsVisible] = useState(false);
    const [show, setShow] = useState();
    const [value, setValue] = React.useState([10, 22]);
    const [sends, setSends] = useState();

    const handleFilters = (collect, e, id) => {

        const index = "setSelected" + collect[0].toUpperCase() + collect.slice(1, collect.length - 1) + "s";

        const updated = selectors;

        if (e.target.checked) {
            updated[index].push(id);
        }

        else {
            let updatedneed = updated[index].filter(item => item != id);
            updated[index] = updatedneed
        }

        setSelectors({ ...updated });
    }


    const handleClick = (id) => {
        if (id != show) {
            setShow(id)
            setIsVisible(true)
        }

        else {
            setIsVisible(!isVisible)
            setShow(null)
        }
    }


    const Send = () => {
        axios.get(`https://shopapi.inloya.com/api/GoodsList/getgoodslist?lng=en&
        selectedcolorIds=${selectors.setSelectedColors}&
        selectedCollectionIds=${selectors.setSelectedCollections}&
        minPrice=${value[0]}&maxPrice=${value[1]}&
        sortbyname=${0}&
        sortbyprice=%${1}`)
            .then(res => {
                setIsVisible(!isVisible)
            })

    }

    return (
        <div className={style.App}>
            <PriceSlider value={value} setValue={setValue} />
            {collections && Object.keys(collections).map((collect, index) => {
                return (
                    <div key={collect}>
                        <h3 onClick={() => handleClick(collect)}>{collect}</h3>
                        {collections[collect].map(value => (
                            <label className={isVisible && collect === show ? style.dblock : style.dnone} key={value.id}>
                                <input type="checkbox" onChange={(e) => handleFilters(collect, e, value.id)} /> {value.name}
                            </label>
                        ))}
                    </div>
                )
            })}
            <button onClick={Send}>Search</button>
        </div >
    )
}

export default Categories
