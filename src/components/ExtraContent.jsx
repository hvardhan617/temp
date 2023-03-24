import Accordion from "./MicroUI/Accordion";
import Featured from "./MicroUI/Featured";
import Overview from "./AccordionVariants/Overview";
import Description from "./AccordionVariants/Description";
import Basic from "./AccordionVariants/Basic";
import AboutCard from "./Layout/AboutCard";
import Reviews from "./AccordionVariants/Reviews";
import PropTypes from "prop-types";
import CheckoutCard from "./MicroUI/CheckoutCard";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const ExtraContent = ({ featured }) => {
  const { globalState } = useContext(ProductContext);
  // const productDetails = globalState.productDetails;
  const brandData = globalState.brandData;
  const selectedVariant = globalState.selectedVariant;
  const getAccordion = (type, content) => {
    if (type === "overview") return <Overview data={content} />;
    if (type === "description") return <Description productDetails={content} />;
    if (type === "reviews") return <Reviews data={content} />;
    if (type === "basic") return <Basic data={content} />;
  };

  return (
    <div className="flex flex-col gap-5 mt-4 lg:gap-5">
      <CheckoutCard />
      <Featured data={featured} />
      <div>
        <Accordion title="Description" type={"description"}>
          {getAccordion("description", globalState.productDetails.description)}
        </Accordion>

        {selectedVariant.amazonDetails &&
          selectedVariant.amazonDetails.bulletPoint.length > 0 && (
            <Accordion title="Overview" type={"overview"}>
              {getAccordion(
                "overview",
                selectedVariant.amazonDetails.bulletPoint
              )}
            </Accordion>
          )}

        <Accordion title="Shipping Policy" type={"basic"}>
          {getAccordion("basic", brandData.shipping.shippingPolicy)}
        </Accordion>

        <Accordion title="Returns Policy" type={"basic"}>
          {getAccordion("basic", brandData.shipping.returnsPolicy)}
        </Accordion>
      </div>
      <AboutCard />
    </div>
  );
};

ExtraContent.propTypes = {
  extraContent: PropTypes.array,
  featured: PropTypes.object,
};
export default ExtraContent;
