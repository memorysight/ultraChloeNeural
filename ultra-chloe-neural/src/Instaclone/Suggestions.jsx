import React from "react";
import { Avatar } from "@mui/material";
import "./Suggestions.css";

function Suggestions() {
  return (
    <div className="suggestions">
      <div className="suggestions__title">Suggestions for you</div>

      <div className="suggestions__usernames">
        <div className="suggestions__username">
          <div userName="suggestions__left">
            <span className="avatar">
              <Avatar> Daniel</Avatar>
            </span>
            <div className="username__info">
              <span className="username">Jennifer</span>

              <span className="relation">New To IG</span>
            </div>
          </div>
          <button className="follow__button">Follow</button>
        </div>


        
      </div>
    </div>
  );
}

export default Suggestions;
