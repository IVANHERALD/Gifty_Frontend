import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import reviews from './reviewData'; // Import the review data

const ReviewCarousel = () => {
  const [index, setIndex] = useState(0);

  // Function to advance to the next review
  const nextReview = () => {
    if (index === reviews.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  // Automatically advance to the next review every 5 seconds (5000 ms)
  useEffect(() => {
    const interval = setInterval(nextReview, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [index]);

  return (
    <Carousel
      activeIndex={index}
      onSelect={setIndex}
      controls={false}  // Hide previous/next controls
      indicators={false} // Hide slide indicators
    >
      {reviews.map((review) => (
        <Carousel.Item key={review.id}>
          <p>{review.text}</p>
         <center><p>-{review.name}</p></center>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ReviewCarousel;
