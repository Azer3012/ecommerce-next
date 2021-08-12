import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import PhoneCheck from './PhoneCheck';

const App = () => {

    const token = "C9U0VC0TMRZ5N8RBNUSKT7RG32AG5V34";
    const [datas, setDatas] = useState();
    const [gender, setGender] = useState();


    const firstName = useRef();
    const lastName = useRef();
    const birthdayDate = useRef();
    const phoneNumber = useRef();
    const email = useRef();
    const password = useRef();
    const genderValue = useRef();
    const smsCode = useRef();


    useEffect(() => {
        axios.get("https://shopapi.inloya.com/api/Account/getgenders?lng=en")
            .then(res => setGender(res.data.obj));
    }, []);



    const handleSubmit = (e) => {

        e.preventDefault();

        const registerData = {
            "name": firstName.current.value,
            "surname": lastName.current.value,
            "birthday": birthdayDate.current.value,
            "phonenumber": phoneNumber.current.value,
            "email": email.current.value,
            "token": token,
            "smsCode": smsCode.current.value,
            "password": password.current.value,
            "genderId": +genderValue.current.value,
        }

        axios.post("https://shopapi.inloya.com/api/Account/register", registerData)
            .then(res => console.log(res.data));
    }




    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input ref={firstName} type="text" placeholder="name" />
                <input ref={lastName} type="text" placeholder="surname" />
                <input ref={birthdayDate} type="date" />
                <input ref={phoneNumber} type="number" placeholder="phonenumber" />
                <input ref={email} type="email" placeholder="email" />
                <input ref={password} type="password" placeholder="password" />
                <input ref={smsCode} type="number" />
                {gender && gender.map(value => (
                    <label>
                        <input ref={genderValue} value={value.id} name="gender" type="radio" /> {value.name}
                    </label>
                ))}
                <button>Register</button>
                <a href="#">Already has an account</a>
            </form>
            <PhoneCheck />
        </div >
    )
}

export default App