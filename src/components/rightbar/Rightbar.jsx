import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_IMAGE;

  // const getUser = async (username) => {
  //   const res = await axios.get(
  //     `http://localhost:8001/api/v1/users/${username}`
  //     // `https://mo-connect.onrender.com/api/v1/users/${username}`
  //   );

  //   return res.data.data.user;
  // };
  // const user = getUser(username);

  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.friends.includes(user?._id)
  );

  console.log(user);
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await Promise.all(
          axios.get(
            "https://mo-connect.onrender.com/api/v1/users/friends/" +
              currentUser._id
          )
        );

        setFriends(friendList.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [currentUser]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(
          `https://mo-connect.onrender.com/api/v1//users/friends/${user._id}`,
          {
            senderId: currentUser._id,
            receiverId: user._id,
          }
        );
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(
          `https://mo-connect.onrender.com/api/v1//users/friends/${user._id}`,
          {
            senderId: currentUser._id,
            receiverId: user._id,
          }
        );
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {}
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };
  console.log(user);

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 1
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.length ? (
            friends.map((friend) => (
              <Link
                to={
                  "https://mo-connect.onrender.com/api/v1/users/profile/" +
                  friend.username
                }
                style={{ textDecoration: "none" }}
              >
                <div className="rightbarFollowing">
                  <img
                    src={
                      friend.profilePicture
                        ? PF + friend.profilePicture
                        : PF + "person/noAvatar.png"
                    }
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">
                    {friend.username}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <h1>no friends</h1>
          )}
        </div>
      </>
    );
  };
  const currentURL = window.location.href.split("/");
  console.log(currentURL[currentURL.length - 1]);
  console.log(currentUser);

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {currentUser.username === currentURL[currentURL.length - 1] ? (
          <ProfileRightbar />
        ) : (
          <HomeRightbar />
        )}
      </div>
    </div>
  );
}
