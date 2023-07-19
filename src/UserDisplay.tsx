import { useRef } from "react";
import { useSelector } from "react-redux";
import React from "react";

const UserDisplay = () => {
  const renderCount = useRef(0);
  console.log("renders UserDisplay", renderCount.current++);
  const user = useSelector((state: any) => state.user);

  if (user) {
    console.log("user", user);
    return (
      <React.Fragment>
        <div>
          <label>username:</label>&nbsp;{user.username}
        </div>
        <div>
          <label>email:</label>&nbsp;{user.email}
        </div>
        <div>
          <label>city:</label>&nbsp;{user.city}
        </div>
      </React.Fragment>
    );
  } else {
    return null;
  }
};

export default UserDisplay;
