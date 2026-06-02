import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";


const DEFAULT_PHOTO =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });

      console.log(res.data.data)

      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return <div className="text-center mt-10">Loading...</div>;
  }


  if (!connections) return;

  if (connections.length === 0) {
    return <h1 className="text-bold text-2xl">No Connections Found</h1>
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-black text-3xl">Connections</h1>

      {connections.map((connection) => {
        const { firstName, lastName, photoUrl, age, gender, about } = connection
        return (
          <div className="flex m-4 p-4  rounded-full bg-base-300 w-1/2 mx-auto">
            <div><img alt="photo" className="w-20 h-20" src={photoUrl} /></div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">{firstName + " " + lastName} </h2>
              {age && gender && <p> {age +" "+ gender} </p>}
              <h2>{about}</h2>
            </div>
          </div>
        )
      }

      )}
    </div>
  );
};

export default Connections;