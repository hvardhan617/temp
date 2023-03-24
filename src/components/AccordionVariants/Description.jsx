import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { sendEvent } from "../../helper/EventTracker";
import ImageViewer from "../Modal/ImageViewer";

const Description = ({ productDetails }) => {
  const [showImageViewer, setImageViewer] = useState(false);
  const [hideContent, setHideContent] = useState(false);
  useEffect(() => {
    if (productDetails.parsedDetails.length > 5) {
      setHideContent(true);
    }
  }, []);

  const handleImageViewer = (toggle) => {
    document.body.style.overflow = "scroll";
    setImageViewer(toggle);
  };

  return (
    <div className="py-4">
      <div
        className="grid grid-cols-2 gap-4 place-items-stretch"
        onClick={() => {
          sendEvent("Product Desc Image", {
            view: true,
          });
          setImageViewer(true);
        }}
      >
        {productDetails.parsedImages.map((imgSrc, i) => {
          if (i > 3) return;
          return <img src={imgSrc} key={i} className="rounded-md" />;
        })}
      </div>
      <div className="mt-4">
        {productDetails.parsedDetails.map((tags) => {
          console.log("tagss", tags);
          if (tags.type === "p") {
            return tags.text.map((textString) => {
              return <p className="my-2 text-sm">{textString}</p>;
            });
          } else {
            return tags.text.map((textString) => {
              return <h1 className="my-4 text-3xl">{textString}</h1>;
            });
          }
        })}
      </div>
      <div className="mt-4">
        {hideContent ? (
          <>
            {productDetails.parsedDetails.map((tags, i) => {
              if (i > 5) return;
              if (tags.type === "p") {
                return tags.text.map((textString) => {
                  return <p className="my-2 text-sm">{textString}</p>;
                });
              } else {
                return tags.text.map((textString) => {
                  return <h1 className="my-4 text-3xl">{textString}</h1>;
                });
              }
            })}
            {productDetails.parsedDetails.length > 5 && (
              <button
                className="w-full p-4 border-2 rounded-lg cursor-pointer border-zinc-400"
                onClick={() => {
                  setHideContent(!hideContent);
                  sendEvent(
                    hideContent
                      ? "Click_Description_Less"
                      : "Click_Description_More"
                  );
                }}
              >
                {hideContent ? "Show More" : "Show Less"}
              </button>
            )}
          </>
        ) : (
          <>
            {productDetails.parsedDetails.map((tags, i) => {
              if (tags.type === "p") {
                return tags.text.map((textString) => {
                  return <p className="my-2 text-sm">{textString}</p>;
                });
              } else {
                return tags.text.map((textString) => {
                  return <h1 className="my-4 text-3xl">{textString}</h1>;
                });
              }
            })}
            {productDetails.parsedDetails.length > 5 && (
              <button
                className="w-full p-4 border-2 rounded-lg cursor-pointer border-zinc-400"
                onClick={() => {
                  setHideContent(!hideContent);
                  sendEvent(
                    hideContent
                      ? "Description Show Less"
                      : "Description Show More"
                  );
                }}
              >
                {hideContent ? "Show More" : "Show Less"}
              </button>
            )}
          </>
        )}
      </div>
      {showImageViewer ? (
        <ImageViewer
          images={productDetails.parsedImages}
          handleImageViewer={handleImageViewer}
        />
      ) : null}
    </div>
  );
};

Description.propTypes = {
  productDetails: PropTypes.object,
};

export default Description;
