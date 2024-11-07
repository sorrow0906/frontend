import React, { useState, useEffect } from "react";
import { Input } from 'antd';
import axios from "axios";
import { Rate } from 'antd';
import { Button, Flex } from 'antd';
import "./Review.css"

const { TextArea } = Input;

const Review = ({ sno }) => {
  const [reviews, setReviews] = useState([]);
  const [tags, setTags] = useState([]);
  const [sortBy, setSortBy] = useState("latest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null); // 로그인된 사용자 정보

  useEffect(() => {

    const checkLoginStatus = async () => {
      try {
        const sessionResponse = await axios.get("/api/session-user");
        if (sessionResponse.data.loggedIn) {
          setLoggedInUser(sessionResponse.data.user);
        } else {
          setLoggedInUser(null);
        }
      } catch (err) {
        console.error("로그인 확인 중 오류 발생:", err);
      }
    };

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

    checkLoginStatus();

    fetchData();
  }, [sno, sortBy]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // 로딩 때문에 화면이 안 바뀌는 문제때문에 어쩔 수 없이 추가. 차후 수정 필요
  if (loading) return;

  return (
    <div className="all-review-div">
      <div className="form-group">
      {loggedInUser ? (
      <Flex vertical gap="middle">
      <Rate allowHalf defaultValue={2.5} />
      <TextArea size="large" rows={4} placeholder="리뷰내용을 입력해주세요." maxLength={3} />
      <Button size="large" style={{ backgroundColor: "#8b4513" }} type="primary">리뷰 작성</Button>
      </Flex>
      ) : (
        // 로그인되지 않은 사용자에게 표시할 메시지
        <p>로그인 후 리뷰 작성이 가능합니다.</p>
      )}
      </div>
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
            <div className="review-item review-item-left" style={{ top: "35px" }}><strong>{review.member.mnick}</strong></div>
            <div class="review-item review-item-left" style={{ top: "60px" }}><Rate disabled defaultValue={review.rstar} /></div>
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
