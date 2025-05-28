import React from "react";
import "./Description.css";

const Description = (props) => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-navigator-box">Description</div>
        <div className="descriptionbox-navigator-box fade">Reviews</div>
      </div>
      <div className="descriptionbox-content">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
          reprehenderit quis, similique nihil error consectetur sequi fuga
          doloremque. Rerum incidunt cupiditate nihil nemo.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
          in eligendi natus quisquam hic? Nemo!
        </p>
      </div>
    </div>
  );
};

export default Description;
