import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const [emailId, setEmailId] = useState("shubhamg@gmail.com");
    const [password, setPassword] = useState("Aca#c@12333312");
    const [error , setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL+"/login", {
                emailId: emailId,
                password: password
            }, { withCredentials: true });

           
            dispatch(addUser(res.data));
            return navigate("/");
        } catch (err) {
            setError(err?.response?.data || "Something went wrong");
        }
    };

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
                                onChange={(e) => setEmailId(e.target.value)}
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
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </fieldset>

                    </div>
                    <p className='text-red-500'>{error}</p>
                    <div className="card-actions justify-center mt-6">
                        <button className="btn btn-primary text-lg px-6" onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login