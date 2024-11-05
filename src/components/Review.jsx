import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Review.css"

const Review = ({ sno }) => {
  const [reviews, setReviews] = useState([]);
  const [tags, setTags] = useState([]);
  const [sortBy, setSortBy] = useState("latest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/review", {
          params: { sno, sortBy },
        });
        setReviews(response.data.reviews);
        setTags(response.data.tags);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sno, sortBy]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // 로딩때문에 화면이 안 바뀌는 문제때문에 어쩔 수 없이 추가 수정 필요
  if (loading) return;

  return (
    <div className="all-review-div">
      <div className="sort-area">
        <select value={sortBy} onChange={handleSortChange} className="sort-element">
          <option value="latest">최신순</option>
          <option value="oldest">작성순</option>
          <option value="highest">별점 높은 순</option>
          <option value="lowest">별점 낮은 순</option>
        </select>
      </div>
      <div id="review-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-container">
            <div className="review-item review-item-left">{review.dateToString}</div>
            <div className="review-item-content">{review.rcomm}</div>
          </div>
        ))}
      </div>
      <div className="tag-buttons" id="tagList">
        {tags.map((tag) => (
          <button key={tag.tno} type="button" className="tag-button">
            <img src={`/images/tag_images/${tag.tno}.svg`} alt={tag.ttag} />
            {tag.ttag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Review;
