import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { Form as BSForm } from 'react-bootstrap'

const Form = ({ defaultValues, children, onSubmit, setDisable }) => {

    const { handleSubmit, register } = useForm({ defaultValues });
    const [validated, setValidated] = useState(false);
    
    const onFormChange = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setDisable(true);
            event.preventDefault();
            event.stopPropagation();
        } else {
            setDisable(false);
        }
        setValidated(true);
        
    }

    return (
        <BSForm noValidate onChange={onFormChange} validated={validated} onSubmit={handleSubmit(onSubmit)} >
            {Array.isArray(children)
                ? children.map((child) => {
                    return child.props.name
                        ? React.createElement(child.type, {
                            ...{
                                ...child.props,
                                register,
                                key: child.props.name
                            }
                        })
                        : child;
                })
                : children}
        </BSForm>
    )
}

export const Input = ({ register, name, feedback, ...rest }) => {
    return (
        <BSForm.Group>
            <BSForm.Control {...register(name)} {...rest} />
            <BSForm.Control.Feedback type="invalid">
                {feedback}
            </BSForm.Control.Feedback>
        </BSForm.Group>
    );
}


export default Form
