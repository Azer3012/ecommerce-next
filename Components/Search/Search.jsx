import React, { useRef } from 'react'
import { useState } from 'react'
import axios from 'axios';

const Search = () => {

    const [searchData, setSearchData] = useState();
    const inputRef = useRef();

    const handleSearch = (e) => {

        e.preventDefault();

        axios.get(`https://shopapi.inloya.com/api/GoodsList/GetSearchData?token=%2F&lng=en&searchquery=${inputRef.current.value}`)
            .then(res => setSearchData(res.data.obj))
    }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input ref={inputRef} type="text" placeholder="enter a name" />
                <button>Search</button>
            </form>
            {searchData ? searchData.map(item => (<div>
                <h1>{item.name}</h1>
            </div>)) : <h2>Loading..</h2>}
        </div>
    )
}

export default Search

