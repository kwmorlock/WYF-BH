import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";


const formSchema = yup.object().shape({
    name: yup.string().required("please include a name"),
    email: yup.string().email("must be a valid email address").required("please include email address"),
    address: yup.string().required("please provide an address"),
    flavor: yup.string().required("we need to know what flavor you are!"),
    size: yup.string().required("must include size for t-shirt")
});

export default function Form() {
    // state for whether our button should be disabled or not.
    const [buttonDisabled, setButtonDisabled] = useState(true);

    // managing state for our form inputs
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        address: "",
        flavor: "",
        size: ""
    });

    // state for our errors
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        address: "",
        flavor: "",
        size: ""
    });

    // new state to set our post request too. So we can console.log and see it.
    const [post, setPost] = useState([]);

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [formState]);

    const formSubmit = e => {
        e.preventDefault();
        axios
            .post("https://reqres.in/api/orders", formState)
            .then(res => {
                setPost(res.data); // get just the form data from the REST api

                // reset form if successful
                setFormState({
                    name: "",
                    email: "",
                    address: "",
                    flavor: "",
                    size: ""
                });
            })
            .catch(err => console.log(err.response));
    };

    const validateChange = e => {
        // Reach will allow us to "reach" into the schema and test only one part.
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                });
            })
            .catch(err => {
                setErrors({
                    ...errors,
                    [e.target.name]: err.errors[0]
                });
            });
    };

    const inputChange = e => {
        e.persist();
        const newFormData = {
            ...formState,
            [e.target.name]:
                e.target.type === "checkbox" ? e.target.checked : e.target.value
        };

        validateChange(e);
        setFormState(newFormData);
    };

    return (
        <form onSubmit={formSubmit}>
            <h1>If you could be any flavor...what flavor would you be?</h1>
            <label htmlFor="name">
                Name: 
        <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={inputChange}
                />
                {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
            </label> <br/>
            <label htmlFor="email">
                Email: 
        <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={inputChange}
                />
                {errors.email.length > 0 ? (
                    <p className="error">{errors.email}</p>
                ) : null}
            </label> <br/>
            <label htmlFor="address">
                Address: 
        <input
                    type="text"
                    name="email"
                    value={formState.address}
                    onChange={inputChange}
                />
                {errors.address.length > 0 ? (
                    <p className="error">{errors.address}</p>
                ) : null}
            </label> <br/>
            <label htmlFor="flavor">
                What flavor do you identify as? 
        <textarea
                    name="flavor"
                    value={formState.flavor}
                    onChange={inputChange}
                />
                {errors.flavor.length > 0 ? (
                    <p className="error">{errors.flavor}</p>
                ) : null}
            </label> <br/>
            <label htmlFor="size">
                What size t-shirt would you like?
        <select id="size" name="size" onChange={inputChange}>
                    <option value="small">small</option>
                    <option value="medium">medium</option>
                    <option value="large">large</option>
                </select>
            </label>
            {/* displaying our post request data */}
            <pre>{JSON.stringify(post, null, 2)}</pre>
            <button disabled={buttonDisabled}>Submit</button>
        </form>
    );
}
