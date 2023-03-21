import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FeedCard from '../../components/FeedCard';
import Loader from '../../components/Loader';
import './Feed.css';

const Feed = () => {
  const [feedData, setFeedData] = useState('');
  useEffect(() => {
    const getFeedData = async () => {
      const res = await axios.get(
        'https://api.realworld.io/api/articles?limit=10&offset=0'
      );

      setFeedData(res.data.articles);
    };

    getFeedData();
  }, []);

  return (
    <div>
      {feedData ? (
        feedData.map(feed => (
          <div key={feed.slug}>
            <FeedCard feed={feed} />
          </div>
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Feed;
