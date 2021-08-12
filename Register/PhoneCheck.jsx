import axios from 'axios';
import React from 'react'
import { useState } from 'react'

const PhoneCheck = () => {

    const [phonenumberCheck, setPhonenumberCheck] = useState(true);
    const [phonenumber, setPhonenumber] = useState('');
    const [data, setData] = useState("");



    const handleSubmit = () => {
        axios.get(`https://shopapi.inloya.com/api/Account/SendSmsCode?phonenumber=${phonenumber}`)
            .then(res => setData(res.data));
    }

    const handlePhoneNumber = (e) => {
        if (e.length === 9) {
            setPhonenumber("994" + e);
            setPhonenumberCheck(true)
        }
        else {
            setPhonenumberCheck(false);
        }
    }

    return (
        <div>
            <span>+994</span>
            <input onChange={e => handlePhoneNumber(e.target.value)} type="number" placeholder="PhoneNumber" />
            <button onClick={() => handleSubmit()}>Submit</button>
        </div>
    )
}

export default PhoneCheck