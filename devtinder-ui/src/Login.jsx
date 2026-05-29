import axios from 'axios';
import React, { useState } from 'react'

const Login = () => {
    const [emailId , setEmailId] = useState();
    const [password , setPassword] = useState();

    const handleLogin = async() =>{
        const res = await axios.post("http://localhost:7777/login" , {
            emailId : emailId,
            password : password
        });
    }

    return (
        <div className="flex justify-center mt-10">
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl justify-center">
                        Login
                    </h2>

                    <div className="mt-4">

                        <fieldset className="fieldset mb-5">
                            <legend className="fieldset-legend text-lg">
                                Email
                            </legend>
                            <input
                                type="text"
                                value={emailId}
                                className="input text-lg w-full"
                                placeholder="Enter email"
                                onChange={ (e) => setEmailId(e.target.value)}
                            />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-lg">
                                Password
                            </legend>
                            <input
                                type="password"
                                value={password}
                                className="input text-lg w-full"
                                placeholder="Enter password"
                                onChange={ (e) => setPassword(e.target.value)}
                            />
                        </fieldset>

                    </div>

                    <div className="card-actions justify-center mt-6">
                        <button className="btn btn-primary text-lg px-6">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login