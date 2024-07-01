import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const formattedDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8800/api/posts');
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const truncateText = (text, maxLength) => {
    const words = text.split(' ');
    if (words.length > maxLength) {
      return words.slice(0, maxLength).join(' ') + '...';
    }
    return text;
  };

  // Logic to paginate posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="cont">
      <div className="nasl">
      <h1>Dobrodosli na Forestino Gym!</h1>
      <h3>Budite u toku sa najnovijim blogovima!</h3>
      </div>
      <div className="blokovi">
        {currentPosts.map((post) => (
          <div className="blok" key={post.id_bloga}>
            <div className="divSlika">
              <img className="slikaBlog" src={`/upload/${post.slika}`} alt="" />
            </div>
            <div className="Opis">
              <div className="tekst">
              <h2>{post.naslov}</h2>
              <p>{truncateText(post.opis, 25)}</p>
              </div>
              
              <div className="dugme">
              <p>{formattedDate(post.date)}</p>
              <Link to={`/posts/${post.id_bloga}`}>
              <button className="saznaj">Saznaj vise</button>
              </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;