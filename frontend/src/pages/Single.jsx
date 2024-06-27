import React, { useContext, useState, useEffect } from 'react';
import sl from "../components/forestino.png";
import axios from 'axios';
import { AuthContext } from "../context/authContext.js";
import { useLocation, useNavigate, Link } from 'react-router-dom'; // Added Link import
import "./Single.css";

const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const dateString = post.date;
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  return (
    <div className='blog2'>
      <div className="cijeli2">
        <h1 className='naslovBloga2'>{post?.naslov}</h1>
        <div className="content2">
          <div className="slikaBlog2">
            <img className="glavna2" src={post?.slika} alt="" />
            <div className="admin2">
              <img src={sl} alt="" />
              <div className='info2'>
                <span>{formattedDate}</span>
                {currentUser.ime === "admin" && (
                  <Link to={`/edit/${postId}`}>Preuredi</Link> // Correct usage of Link
                )}
              </div>
            </div>
          </div>
          <p className="tekst2">
            {post.tekst}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Single;

