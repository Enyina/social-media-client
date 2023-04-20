import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  const userId = user._id;

  useEffect(() => {
    const fetchPosts = async () => {
      // console.log(userId);
      const res = await axios.get(
        `http://localhost:8001/api/v1/posts/timeline?userId=${userId}`
      );
      const timeline = res.data.timelime;
      // console.log(timeline);
      // const images = await axios.get(`http://localhost:8001/api/images`);

      // console.log(images);
      setPosts(
        timeline.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [userId]);
  console.log(username);
  // console.log(user.username);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
