import React from 'react';
import {Link} from 'react-router-dom';
import { Formik, Form, Field } from 'formik';

const SignIn = ({setIsSignedIn, loadUser}) => (

        <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset className="ba b--transparent ph0 mh0">
                        <Formik
                            initialValues={{email:'',password:''}} 
                            onSubmit={ async (data) => {
                                await fetch('https://smart-chip-api.herokuapp.com/signin',{
                                    method: 'post',
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify({
                                        email:data.email,
                                        password:data.password
                                    })
                                })
                                .then(response=>response.json())
                                .then(user=>{
                                    if(user[0].id){
                                        setIsSignedIn(true);
                                        loadUser(user[0]);
                                    }
                                })
                            }}
                        >
                            <Form>
                                <legend className="f1 fw6 ph0 mh0 center">Sign In</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6">Email</label>
                                    <Field 
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        type="email"
                                        name="email" 
                                        required
                                    />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6">Password</label>
                                    <Field 
                                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        type="password" 
                                        name="password"
                                        required
                                    />
                                </div>
                                <button
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                    type="submit" 
                                > Sign in </button>
                                <div className="mt4"/>
                                <Link 
                                    className="f6 link dim black db pointer underline"
                                    to='/register'
                                >Register</Link>
                            </Form>
                        </Formik>
                    </fieldset>
                </div>
            </main>
        </article>
    )

export default SignIn;