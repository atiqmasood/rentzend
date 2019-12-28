import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_AGENT } from "../../graphql/CreateAgent";

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
    button: {
        width: '30%'
    }
}));

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Minimum 2 characters!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    phone: Yup.string()
        .min(2, 'Minimum 2 characters!')
        .max(50, 'Too Long!')
        .required('Required'),
    address: Yup.string()
        .required('Required'),
    zipcode: Yup.string()
        .required('Required'),
});

export default function MuiForm() {
    const [state, setState] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        zipcode: '',
    });
    const [isSuccess, setSuccess] = useState(false);
    const [createAgent, { data }] = useMutation(CREATE_AGENT);

    function onChange(e, setFieldValue) {
        const { id, value } = e.target;
        setFieldValue(id, value);
        setState(prev => ({
            ...prev,
            [id]: value,
        }));
    }

    const classes = useStyles();
    const {name, email, phone, address, zipcode} = state;
    if (isSuccess){
        return (
            <Fragment>
                <Button
                    type={'button'}
                    variant="contained"
                    color="secondary"
                    onClick={() => setSuccess(false)}
                >
                    Create New
                </Button>
                <h3 id={'success'} >Agent Register Successfully</h3>
            </Fragment>
        )
    }
    return (
        <Formik
            initialValues={state}
            validationSchema={SignupSchema}
            onSubmit={ () => {
                createAgent({ variables: state }).then(() => {
                    setSuccess(true);
                    setState({
                        name: '',
                        email: '',
                        phone: '',
                        address: '',
                        zipcode: '',
                    })
                })
            }}
        >
            {({ errors, touched, handleSubmit, setFieldValue }) => {
                return (
                    <Form className={classes.root} onSubmit={handleSubmit} >
                        <Field
                            value={name}
                            component={TextField}
                            onChange={(e) => onChange(e, setFieldValue)}
                            id="name"
                            label="Name"
                            autoComplete="off"
                        />
                        <ErrorMessage message={errors.name && touched.name ? errors.name : null}/>
                        <Field
                            value={email}
                            component={TextField}
                            onChange={(e) => onChange(e, setFieldValue)}
                            id="email"
                            type="email"
                            label="Email"
                            autoComplete="off"
                        />
                        <ErrorMessage message={errors.email && touched.email ? errors.email : null}/>
                        <Field
                            value={phone}
                            component={TextField}
                            onChange={(e) => onChange(e, setFieldValue)}
                            id="phone"
                            label="Phone number"
                            autoComplete="off"
                        />
                        <ErrorMessage message={errors.phone && touched.phone ? errors.phone : null}/>
                        <Field
                            value={address}
                            component={TextField}
                            onChange={(e) => onChange(e, setFieldValue)}
                            id="address"
                            label="address"
                            autoComplete="off"
                        />
                        <ErrorMessage message={errors.address && touched.address ? errors.address : null}/>
                        <Field
                            value={zipcode}
                            component={TextField}
                            onChange={(e) => onChange(e, setFieldValue)}
                            id="zipcode"
                            label="Zip code"
                            autoComplete="off"
                        />
                        <ErrorMessage message={errors.zipcode && touched.zipcode ? errors.zipcode : null}/>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload
                        </Button>
                        <Button
                            type={'submit'}
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </Form>

                )
            }}
        </Formik>
    );
}
