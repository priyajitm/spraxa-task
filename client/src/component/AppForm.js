import React, { useContext, useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  FormFeedback,
} from "reactstrap";
import { GlobalContext } from "../context/appState";

const AppForm = () => {
  const initialState = {
    name: null,
    email: null,
    dob: null,
    gender: null,
    address: null,
    error: [],
  };

  const [state, setstate] = useState(initialState);
  const [checked, setChecked] = useState({male: false, female: false})
  const {storeData} = useContext(GlobalContext)
  

  const gotError = (fieldName) => {
    return state['error'].indexOf(fieldName) !== -1;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setstate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckbox = (e) => {
    setChecked((prevState) => ({
      ...prevState,
      'male': false,
      'female': false,
      [e.target.name]: true
    })) 
    setstate((prevState) => ({
      ...prevState,
      'gender': e.target.name,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = [];
    
    const isEmpty = Object.values(state).some((x) => x === null);
    isEmpty && Object.keys(state).forEach((key) => {state[key] === null && errors.push(key)})
    console.log(errors)

    const validateEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        state["email"]
      );
    !validateEmail && errors.push('email')

    const compareDate = new Date(state.dob) < new Date();
    !compareDate && errors.push('dob')

    if (!validateEmail) errors.push("email");
    if (!compareDate) errors.push("dob");

    setstate((prevState) => ({
      ...prevState,
      'error': errors,
    }));
    if (errors.length === 0) storeData(state)
  };


  return (
    <div className='col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4'>
      <Container>
      <Form onSubmit={handleSubmit} >
        <FormGroup className='formGroup'>
          <Label for="name" className='sr-only'>Name</Label>
          <Input type="text" name="name" onChange={handleChange} className={gotError('name') ? 'is-invalid' : null} />
          <FormFeedback className={gotError('name') ? 'is-invalid' : null}>Please add value</FormFeedback>
        </FormGroup>
        <FormGroup className='formGroup'>
          <Label for="email">Email</Label>
          <Input type="text" name="email" id="email" onChange={handleChange} className={gotError('email')? 'is-invalid' : null} />
          <FormFeedback className={gotError('email') ? 'is-invalid' : null}>Invalid Email Address</FormFeedback>
        </FormGroup>
        <FormGroup className='formGroup'>
          <Label for="dob">Date of Birth</Label>
          <Input type="date" name="dob" id="dob" onChange={handleChange} className={gotError('dob') ? 'is-invalid' : null} />
          <FormFeedback className={gotError('dob') ? 'is-invalid' : null}>Invalid Date Of birth</FormFeedback>
        </FormGroup>
        <FormGroup className='formGroup'>
        <Label for="gender">Gender</Label>
        <Input type="checkbox" name="male" id="male" onChange={handleCheckbox} checked={checked.male} className={gotError('gender') ? 'is-invalid' : null}/> Male
        <Input type="checkbox" name="female" id="female" onChange={handleCheckbox} checked={checked.female} className={gotError('gender') ? 'is-invalid' : null}/> Female
        <FormFeedback className={gotError('gender') ? 'is-invalid' : null}>Please specify gender</FormFeedback>
      </FormGroup>
        <FormGroup className='formGroup'>
          <Label for="address">Address</Label>
          <Input
            type="textarea"
            name="address"
            id="address"
            onChange={handleChange}
            className={gotError('address') ? 'is-invalid' : null}
          />
          <FormFeedback className={gotError('address') ? 'is-invalid' : null}>Please add value</FormFeedback>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </Container>
    </div>
    
  );
};

export default AppForm;
