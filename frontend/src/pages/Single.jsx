import React, { useContext, useState, useEffect } from 'react';
import sl from "../components/forestino.png";
import axios from 'axios';
import { AuthContext } from "../context/authContext.js";
import { useLocation, useNavigate, Link } from 'react-router-dom'; // Added Link import
import "./Single.css";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2"


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
  const navigate = useNavigate()
  const dateString = post.date;
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/api/posts/del/${postId}`);
      console.log("Post successfully deleted");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  

  const confirmDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete();
        Swal.fire("Deleted!", "Your post has been deleted.", "success");
        navigate("/")
      }
    });
  };
  return (
    <div className='blog2'>
      <div className="cijeli2">
        <h1 className='naslovBloga2'>{post?.naslov}</h1>
        <div className="content2">
          <div className="slikaBlog2">
            <img className="glavna2" src={`/upload/${post.slika}`} alt="" />
            <div className="admin2">
              <img src={sl} alt="" />
              <div className='info2'>
                <span>{formattedDate}</span>
                {currentUser.id === 4 && (
                  <Link to={`/dodaj`} state={post} className='editBtn'> <CiEdit /> Preuredi</Link> // Correct usage of Link
                )}
                {currentUser.id === 4 && (
                 <button className='deleteBtn' onClick={confirmDelete}><MdDelete />Izbrisi</button>
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

