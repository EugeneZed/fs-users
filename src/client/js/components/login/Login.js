import React from 'react';
import Box from 'grommet/components/Box'
import {TextInput,MaskedInput} from 'reduxform-grommet-bindings'
import {Field, reduxForm} from 'redux-form';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import Button from 'grommet/components/Button';
import LoginIcon from 'grommet/components/icons/base/Login';

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  }
  if (!values.email) {
    errors.email = 'Required'
  }
  // console.log(errors);
  return errors
}
class LoginForm extends React.Component{
  static publicComponent = true;
  render(){
    return(
      <Form >
        <FormFields>
          <Field
              placeholder="email"
              name="email"
              component={TextInput}
              type="text"/>
          <Field
              placeholder="password"
              name="password"
              component={TextInput}
              type="password"/>
          <div style={{padding: "16px 24px", textAlign:"center"}}>
            <Button icon={<LoginIcon />}
              label="Login"
              href="#"
              primary={true}
              type="submit"/>
          </div>
        </FormFields>
      </Form>
    )
  }
}

LoginForm = reduxForm({
  form: 'login', // a unique name for this form
  validate
})(LoginForm)


export default class Login extends React.Component{
  render(){
    return(
      <Box style={{
        height:"95vh",
        background:"linear-gradient("+
                      "rgba(255, 255, 255, 0.61),"+
                      "rgba(255, 255, 255, 0.37)), "+
                      "url(/img/office.jpg)",
        backgroundSize:"cover"}}>

        <div id="loginForm" style={{
            margin: "auto",
            width: "500px",
            height: "400px",
            border: "0px solid black",
            padding: "23px",
            marginTop: "100px",
            backgroundColor:"transparent"}}>
          <h1 style={{textAlign: "center",fontFamily: "Arvo, serif"}}>Login</h1>
          <LoginForm />
        </div>
      </Box>
    )
  }
}
