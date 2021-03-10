import React from 'react';
import { Formik, Form, Field } from 'formik';

const Register = ({loadUser, setIsSignedIn}) =>(

        <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
            <main className="pa4 black-80">
                <div className="measure ">
                    <fieldset className="ba b--transparent ph0 mh0">
                        <Formik 
                            initialValues={{name:'', email:'',password:''}} 
                            onSubmit={async (data,{setSubmitting})  => {
                                setSubmitting(true);
                                await fetch('https://smart-chip-api.herokuapp.com/register',{
                                    method: 'post',
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify({
                                        name:data.name,
                                        email:data.email,
                                        password:data.password
                                    })
                                })
                                .then(response=>response.json())
                                .then(user=>{
                                    if(user.id){
                                        setIsSignedIn(true);
                                        loadUser(user);
                                    }
                                })
                                .catch(console.log);
                                setSubmitting(false);
                            }}
                        >
                            {({isSubmitting})=>(
                                <Form>
                                    <legend className="f1 fw6 ph0 mh0 center">Register</legend>
                                    <div className="mt3">
                                        <label className="db fw6 lh-copy f6">Name</label>
                                        <Field 
                                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                            type="text" 
                                            name="name"
                                            required
                                        />
                                    </div>
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
                                            disabled={isSubmitting}
                                        > Register </button>
                                </Form>
                            )}
                        </Formik>
                    </fieldset>
                </div>
            </main>
        </article>
)

export default Register;