import React from 'react';
import './FeedCard.css';
import LikeIcon from '../../assets/Like';
import CommentIcon from '../../assets/Comment';
import ShareIcon from '../../assets/Share';
import RepostIcon from '../../assets/Repost';
import { Link } from 'react-router-dom';

const FeedCard = props => {
  return (
    <div className='card-container'>
      <div className='wrapper'>
        <div className='user-info'>
          <img
            className='avatar'
            src={props.feed.author.image}
            alt={props.feed.author.username}
          />
          <div className='user-text'>
            <p className='user-title'>
              {props.feed.author.username} <span className='time-ago'>1h</span>
            </p>
            <p className='user-headline'>{props.feed.author.bio}</p>
          </div>
        </div>

        <Link to={`/post/${props.feed.slug}`} className='link'>
          <div className='post-title'>
            <p>{props.feed.title}</p>
          </div>

          <div>
            <img
              className='post-image'
              src='https://torum-bucket.s3.us-east-2.amazonaws.com/5f0c4fd61039e53f6a231082/post/media/4dea2bacbe4b62820c6a5de9f3a05c9a_post_1679284976383.gif'
              alt='cat in car'
            />
          </div>
        </Link>

        <div className='social-bar'>
          <div className='social-options'>
            <div className='flex gap-8'>
              <LikeIcon />
              {props.feed.favoritesCount && (
                <p className='likes-count'>{props.feed.favoritesCount}</p>
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
            src={props.feed.author.image}
            alt={props.feed.author.username}
          />
          <input type='text' placeholder='Comment on this...' />
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
