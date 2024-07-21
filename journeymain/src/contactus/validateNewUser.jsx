export default function validateNewUser(values) {
    let errors = {}

    //Validate First Name
    if(!values.firstName.trim()) {
        errors.firstName = 'First Name is Required.'
    }

    //Validate Last Name
    if(!values.lastName.trim()) {
        errors.lastName = 'Last Name is Required.'
    }

    //Validate Email
    if(!values.email){
        errors.email = 'Email is Required.'
    } else if(!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Invalid Email Address.'
    }

    if(!values.phone){
        errors.phone = 'phone must be 10 numbers.'
    } else if(values.phone.length < 10) {
        errors.phone = 'number must be greater than 10 characters.'
    }

    return errors;

}