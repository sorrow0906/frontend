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

      if (!sno) {
        console.warn("sno가 존재하지 않아 데이터를 요청할 수 없습니다.");
        return; // sno가 없으면 요청을 보내지 않음
      }
      try {
        setLoading(true);
        const response = await axios.get("/api/review", {
          params: { sno, sortBy },
        });
        setReviews(response.data.reviews);
        setTags(response.data.tags);
      } catch (err) {
        setError(err.message || "데이터를 불러오는데 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sno, sortBy]); // sno나 sortBy가 변경될 때마다 fetchData 호출

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생: {error}</p>;

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
