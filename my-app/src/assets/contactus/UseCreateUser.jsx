import { useState } from 'react';
import axios from 'axios';

const UseCreateUser = (validateNewUser) => {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        feed: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSubmit = e => {
    e.preventDefault();
    setErrors(validateNewUser(values));

    const user = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        feed: values.feed,
        Delete:false
        };

    if (handleSubmit){
        axios.post("https://tickets-73a3c-default-rtdb.firebaseio.com/Contact.json", user)
        .then((response) => {
        console.log(response.data);
    })
    }
}

  return {handleChange, values, handleSubmit, errors}
}

export default UseCreateUser;