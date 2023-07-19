import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { USER_TYPE } from "./store/UserReducer";
import UserDisplay from "./UserDisplay";

function App() {
  const [userid, setUserId] = useState(0);
  const dispatch = useDispatch();

  const onChangeUserId = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const userIdFromInput = e.target.value ? Number(e.target.value) : 0;
    console.log("userId", userIdFromInput);
    setUserId(userIdFromInput);
    const usersResponse = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (usersResponse.ok) {
      const users = await usersResponse.json();
      const usr = users.find((userItem: any) => {
        return userItem && userItem.id === userIdFromInput;
      });

      if (usr) {
        console.log("usr", usr);
        dispatch({
          type: USER_TYPE,
          payload: {
            id: usr.id,
            username: usr.username,
            email: usr.email,
            city: usr.address.city,
          },
        });
      } else {
        console.log("User not found");
        dispatch({
          type: USER_TYPE,
          payload: {
            id: 0,
            username: "",
            email: "",
            city: "",
          },
        });
      }
    } else {
      console.log("Failed to fetch users");
      dispatch({
        type: USER_TYPE,
        payload: {
          id: 0,
          username: "",
          email: "",
          city: "",
        },
      });
    }
  };

  return (
    <React.Fragment>
      <div className="App">
        <label>user id</label>
        <input value={userid} onChange={onChangeUserId} />
      </div>
      <UserDisplay />
    </React.Fragment>
  );
}

export default App;
