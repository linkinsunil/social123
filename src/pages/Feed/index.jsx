import axios from 'axios';
import React, { useEffect } from 'react';
import FeedCard from '../../components/FeedCard';
import Loader from '../../components/Loader';
import './Feed.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector, useDispatch } from 'react-redux';
import { getData, loadMoreData } from '../../features/feed/feedSlice';

const Feed = () => {
  const myFeedData = useSelector(state => state.feed.feedData);
  const pageNumber = useSelector(state => state.feed.pageNumber);
  const dispatch = useDispatch();
  let url = `https://api.realworld.io/api/articles?limit=10&offset=${pageNumber}`;

  useEffect(() => {
    try {
      const getFeedData = async () => {
        const res = await axios.get(url);
        dispatch(getData(res.data.articles));
      };

      getFeedData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchMoreData = async () => {
    try {
      const res = await axios.get(url);
      dispatch(loadMoreData(res.data.articles));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='feed-container'>
      <InfiniteScroll
        dataLength={myFeedData.length}
        next={fetchMoreData}
        hasMore={myFeedData.length !== myFeedData.articlesCount}
        loader={<Loader />}
      >
        <div className='feed-container'>
          {myFeedData ? (
            myFeedData.map((feed, index) => (
              <div key={index}>
                <FeedCard feed={feed} />
              </div>
            ))
          ) : (
            <div className='feed-container'></div>
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Feed;
