import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentIcon from '../../assets/Comment';
import LikeIcon from '../../assets/Like';
import RepostIcon from '../../assets/Repost';
import ShareIcon from '../../assets/Share';
import Loader from '../../components/Loader';
import AddComment from '../../assets/AddComment';
import './Post.css';
import Delete from '../../assets/Delete';

const Post = () => {
  let { slug } = useParams();
  const [feedData, setFeedData] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  // FETCH FEED DATA FROM API
  useEffect(() => {
    const getFeedData = async () => {
      const res = await axios.get(
        `https://api.realworld.io/api/articles/${slug}`
      );
      setFeedData(res.data.article);
    };
    getFeedData();
  }, []);

  // POST NEW COMMENT
  const postComments = async () => {
    const token = localStorage.getItem('token');
    const url = `https://api.realworld.io/api/articles/${slug}/comments`;
    const data = {
      comment: {
        body: comment,
      },
    };
    const config = {
      headers: {
        authorization: `Token ${token}`,
      },
    };

    try {
      const res = await axios.post(url, data, config);
      console.log('RES-DATA COMMENT', res.data);
      setComments(prev => [...prev, res.data.comment]);
      setComment('');
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE A COMMENT
  const deleteComment = async comment => {
    const token = localStorage.getItem('token');
    const url = `https://api.realworld.io/api/articles/${slug}/comments/${comment.id}`;

    const config = {
      headers: {
        authorization: `Token ${token}`,
      },
    };

    try {
      await axios.delete(url, config);
      setComments(prev => prev.filter(item => item.id !== comment.id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='card-container'>
      {feedData ? (
        <div className='wrapper'>
          <div className='user-info'>
            <img
              className='avatar'
              src={feedData.author.image}
              alt={feedData.author.username}
            />
            <div className='user-text'>
              <p className='user-title'>
                {feedData.author.username} <span className='time-ago'>1h</span>
              </p>
              <p className='user-headline'>{feedData.author.bio}</p>
            </div>
          </div>

          <div>
            <p>{feedData.title}</p>
          </div>

          <div>
            <img
              className='post-image'
              src='https://torum-bucket.s3.us-east-2.amazonaws.com/5f0c4fd61039e53f6a231082/post/media/4dea2bacbe4b62820c6a5de9f3a05c9a_post_1679284976383.gif'
              alt='cat in car'
            />
          </div>

          <div className='social-bar'>
            <div className='social-options'>
              <div className='flex gap-8'>
                <LikeIcon />
                {feedData.favoritesCount && (
                  <p className='likes-count'>{feedData.favoritesCount}</p>
                )}
              </div>
              <div>
                <CommentIcon />
              </div>
              <div>
                <ShareIcon />
              </div>
              <div>
                <RepostIcon />
              </div>
            </div>
            <div></div>
          </div>

          <div className='comment-box'>
            <img
              className='avatar'
              src={feedData.author.image}
              alt={feedData.author.username}
            />
            <input
              type='text'
              placeholder='Comment on this...'
              name='comment'
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
            <div className='btn-comment' onClick={postComments}>
              <AddComment />
            </div>
          </div>
          <div className='comments-container'>
            {comments.reverse().map(comment => (
              <div key={comment.id} className='comments'>
                <img
                  className='avatar'
                  src={comment.author.image}
                  alt={comment.author.username}
                />
                <p>{comment.body}</p>
                <div className='delete' onClick={() => deleteComment(comment)}>
                  <Delete />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Post;
