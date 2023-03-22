import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FeedCard from '../../components/FeedCard';
import Loader from '../../components/Loader';
import './Feed.css';
import InfiniteScroll from 'react-infinite-scroll-component';

const Feed = () => {
  const [feedData, setFeedData] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  let url = `https://api.realworld.io/api/articles?limit=10&offset=${pageNumber}`;

  useEffect(() => {
    try {
      const getFeedData = async () => {
        const res = await axios.get(url);
        setFeedData(res.data.articles);
        setPageNumber(pageNumber + 1);
      };

      getFeedData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchMoreData = async () => {
    try {
      setPageNumber(pageNumber + 1);
      const res = await axios.get(url);
      setFeedData(feedData.concat(res.data.articles));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='feed-container'>
      <InfiniteScroll
        dataLength={feedData.length}
        next={fetchMoreData}
        hasMore={feedData.length !== feedData.articlesCount}
        loader={<Loader />}
      >
        <div className='feed-container'>
          {feedData ? (
            feedData.map((feed, index) => (
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
