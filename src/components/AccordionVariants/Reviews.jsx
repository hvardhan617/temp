import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import CommentCard from '../MicroUI/CommentCard';
import ImageViewer from '../Modal/ImageViewer';
import { getReviewsData } from '../../dummyBrand';
import { ProductContext } from '../../context/ProductContext';
import Spinner from '../Icons/Spinner';
import { sendEvent } from '../../helper/EventTracker';

const Reviews = () => {
  const { globalState } = useContext(ProductContext);

  const [reviews, setReviews] = useState(null);
  const [allImages] = useState([]);
  const [showImageViewer, setImageViewer] = useState(false);
  const [openReview, setOpenReview] = useState({
    id: 0,
    review: null,
  });

  const [showAllImages, setShowAllImages] = useState(false);
  const [hideContent, setHideContent] = useState(false);

  const handleImageViewer = (toggle) => {
    document.body.style.overflow = 'scroll';
    setShowAllImages(toggle);
  };

  const handleImageViewer2 = (toggle) => {
    document.body.style.overflow = 'scroll';
    setImageViewer(toggle);
  };

  const handleReviewsData = async () => {
    let reviewsData = await getReviewsData(globalState.productDetails._id);
    console.log('ssss', reviewsData);
    setReviews(reviewsData.data);

    if (reviewsData.data.length > 3) {
      setHideContent(true);
    }
  };

  useEffect(() => {
    // let tempImages = [];
    handleReviewsData();
    // data.content.map((review) => {
    //   if (review.images) {
    //     tempImages = [...tempImages, ...review.images];
    //   }
    // });

    // setAllImages(tempImages);
  }, []);

  useEffect(() => {}, [reviews]);
  const handleReview = (id, review) => {
    sendEvent('Review Image Viewed', {
      view: true,
    });
    setOpenReview({ id, review });
    setImageViewer(true);
    document.body.style.overflow = 'scroll';
  };

  if (!reviews) {
    return (
      <div className="flex justify-center py-3">
        <Spinner className="w-4 h-4 animate-spin" />
      </div>
    );
  }

  if (reviews.length === 0) {
    return <div className="flex justify-center py-3 text-sm">No Reviews Found</div>;
  }

  return (
    <div className="py-3">
      <div className="flex gap-2 overflow-scroll">
        {allImages.map((url, i) => {
          return (
            <img
              src={url}
              className="object-contain w-20 h-20 rounded-lg"
              key={i}
              onClick={() => setShowAllImages(true)}
            />
          );
        })}
      </div>
      {/* <div className="my-3 text-sm text-zinc-400">
        <span className="font-semibold">{allImages.length}</span> images uploaded by customers
      </div> */}
      <div className="flex flex-col gap-4 py-1">
        {hideContent
          ? reviews.slice(0, 3).map((r, i) => {
              return <CommentCard {...r} key={i} handleReview={handleReview} index={i} />;
            })
          : reviews.map((r, i) => {
              return <CommentCard {...r} key={i} handleReview={handleReview} index={i} />;
            })}
        {reviews.length > 3 && (
          <button
            className="w-full p-4 border-2 rounded-lg cursor-pointer border-zinc-400"
            onClick={() => {
              setHideContent(!hideContent);
              sendEvent(hideContent ? 'Click_Reviews_Less' : 'Click_Reviews_More');
            }}
          >
            {hideContent ? 'View More' : 'View Less'}
          </button>
        )}
      </div>
      {showAllImages ? (
        <ImageViewer images={allImages} handleImageViewer={handleImageViewer} />
      ) : null}
      {showImageViewer ? (
        <ImageViewer
          images={openReview.review.images}
          handleImageViewer={handleImageViewer2}
          handleReview={handleReview}
          review={openReview}
        />
      ) : null}
    </div>
  );
};

Reviews.propTypes = {
  data: PropTypes.object,
};

export default Reviews;
