import React, { Component } from 'react';
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validateForm = (errors) => {
    let valid = true;

    Object.values(errors).forEach(
        // if we have an error string set valid to false
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}


class Reactformval extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: null,
            email: null,
            password: null,
            errors: {
                fullName: '',
                email: '',
                password: '',
            }
        };
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'fullName':
                errors.fullName =
                    value.length < 5
                        ? 'Full Name must be 5 characters long!'
                        : '';
                break;
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'password':
                errors.password =
                    value.length < 8
                        ? 'Password must be 8 characters long!'
                        : '';
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value }, () => {
            console.log(errors)
        })
    }


    handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm(this.state.errors)) {
            console.info('Valid Form')
        } else {
            console.error('Invalid Form')
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                        {/* fullnumame here {errors.fullName.length > 0 } not required */}
                        {/* only <span>{error.name(fullame OR emailor passwo )}</span> is required to dispaly msg */}
                    <label htmlFor="fullName">firstName</label>
                    <input type="text" className="fullName" name="fullName" onChange={this.handleChange}></input>
                    {errors.fullName.length > 0 &&
                        <span className='error'>{errors.fullName}</span>}


                    <label htmlFor="email">Email</label>
                    <input type="email" className="email" name="email" onChange={this.handleChange}></input><br></br>
                    {errors.email.length > 0 &&
                        <span className='error'>{errors.email}</span>}


                    <label htmlFor="password">Password</label>
                    <input type="password" className="password" name="password" onChange={this.handleChange}></input><br></br>

                    {errors.password.length > 0 &&
                        <span className='error'>{errors.password}</span>}


                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default Reactformval;