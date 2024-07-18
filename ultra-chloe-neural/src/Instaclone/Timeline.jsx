import React, { useState } from "react";
import "./Timeline.css";
import Suggestions from './Suggestions'
import Post from "./Post";

function Timeline() {
  const [posts, setPosts] = useState([
    {
      user: "Daniel",
      postImage: "https://i.ibb.co/RcPLnkd/Wormhole-Anamoly345345.jpg",
      likes: 12,
      timestamp: " 222d",
    },
    {
      user: "taniel",
      postImage: "https://i.ibb.co/RcPLnkd/Wormhole-Anamoly345345.jpg",
      likes: 12,
      timestamp: " 222d",
    },
    {
      user: "waniel",
      postImage: "https://i.ibb.co/RcPLnkd/Wormhole-Anamoly345345.jpg",
      likes: 12,
      timestamp: " 222d",
    },
    {
      user: "tyaniel",
      postImage: "https://i.ibb.co/RcPLnkd/Wormhole-Anamoly345345.jpg",
      likes: 12,
      timestamp: " 222d",
    },
  ]);

  return (
    <div className="timeline">
      <div className="timeline__left">
        <div className="timeline__posts">
          {posts.map((post) => (
            <Post
              user={post.user}
              postImage={post.postImage}
              likes={posts.likes}
              timestamp={posts.timestamp}
            />
          ))}
        </div>
      </div>
      <div className="timeline__right">
        <Suggestions/>
      </div>
    </div>
  );
}

export default Timeline;
