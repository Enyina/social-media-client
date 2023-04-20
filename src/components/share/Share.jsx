import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@mui/icons-material";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);

  const uploadImage = async (file) => {
    if (!file) return;
    function getBase64(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        setFileName(reader.result);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
      console.log({ fileName });
    }
    getBase64(file);
    try {
      // await axios.post("https://mo-connect.onrender.com/api/upload", fileName);
      const res = await axios.post(
        "https://mo-connect.onrender.com/api/upload",
        {
          fileName,
        }
      );
      console.log(res.data);
      return res;
    } catch (err) {
      console.log(err);
    }

    // try {

    //   // await axios.post("https://mo-connect.onrender.com/api/v1/posts", newPost);
    //   await axios.post("http://localhost:8001/api/v1/posts", newPost);
    //   // window.location.reload();
    // } catch (err) {
    //   console.log(err);
    // }
  };
  const createPost = async (file, newPost) => {
    if (newPost.desc && newPost.img) return;
    console.log("clicking submit");
    const res = uploadImage(file).then((res) => {
      console.log({ res });

      newPost.img = res.data.uploadResponse.url;
      console.log(newPost.img);

      // await axios.post("https://mo-connect.onrender.com/api/v1/posts", newPost);
      axios.post("https://mo-connect.onrender.comapi/v1/posts", newPost);
      window.location.reload();
    });
    if (res === undefined) {
      // await axios.post("https://mo-connect.onrender.com/api/v1/posts", newPost);
      axios.post("https://mo-connect.onrender.com/api/v1/posts", newPost);
      window.location.reload();
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    console.log("clicking submit");
    createPost(file, newPost);
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/2.jpeg"
            }
            alt=""
          />
          <input
            placeholder={"What's in your mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
