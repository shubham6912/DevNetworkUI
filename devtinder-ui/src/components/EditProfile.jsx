import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserCard from "./UserCard"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";


const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [error, setError] = useState("");
    const [showToast , setShowToast] = useState(false);
    const dispatch = useDispatch();

    const saveProfile = async () => {
        setError("");
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName,
                lastName,
                photoUrl,
                age,
                gender,
                about
            }, { withCredentials: true });

            console.log(res)
            dispatch(addUser(res?.data?.data));
            setShowToast(true)
            setTimeout(() =>{
                setShowToast(false);
            },3000);

        } catch (err) {
            setError(err?.response?.data || "Something went wrong");

        }
    };



    return (
        <>
            <div className="flex justify-center my-10">
                <div className="flex justify-center mx-10">
                    <div className="card bg-base-300 w-96 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-2xl justify-center">
                                Edit Profile
                            </h2>

                            <div className="mt-4">
                                <fieldset className="fieldset mb-5">
                                    <legend className="fieldset-legend text-lg">
                                        FirstName
                                    </legend>
                                    <input
                                        type="text"
                                        value={firstName}
                                        className="input text-lg w-full"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </fieldset>

                                <fieldset className="fieldset mb-5">
                                    <legend className="fieldset-legend text-lg">
                                        LastName
                                    </legend>
                                    <input
                                        type="text"
                                        value={lastName}
                                        className="input text-lg w-full"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </fieldset>

                                <fieldset className="fieldset mb-5">
                                    <legend className="fieldset-legend text-lg">
                                        Age
                                    </legend>
                                    <input
                                        type="text"
                                        value={age}
                                        className="input text-lg w-full"
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                </fieldset>

                                <fieldset className="fieldset mb-5">
                                    <legend className="fieldset-legend text-lg">
                                        Gender
                                    </legend>
                                    <input
                                        type="text"
                                        value={gender}
                                        className="input text-lg w-full"
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                </fieldset>

                                <fieldset className="fieldset mb-5">
                                    <legend className="fieldset-legend text-lg">
                                        About
                                    </legend>
                                    <input
                                        type="text"
                                        value={about}
                                        className="input text-lg w-full"
                                        onChange={(e) => setAbout(e.target.value)}
                                    />
                                </fieldset>

                                <fieldset className="fieldset mb-5">
                                    <legend className="fieldset-legend text-lg">
                                        PhotoURL
                                    </legend>
                                    <input
                                        type="text"
                                        value={photoUrl}
                                        className="input text-lg w-full"
                                        onChange={(e) => setPhotoUrl(e.target.value)}
                                    />
                                </fieldset>

                            </div>
                            <p className='text-red-500'>{error}</p>
                            <div className="card-actions justify-center mt-6">
                                <button className="btn btn-primary text-lg px-6" onClick={saveProfile}>
                                    Save Profile
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
                <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
            </div>
            {showToast && (<div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile saved Successfully !</span>
                </div>
            </div>
            )
            }
        </>
    );
};

export default EditProfile;
