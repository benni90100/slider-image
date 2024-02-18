import { useEffect } from "react";
import { useState } from "react";
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from "react-icons/bs";
import "./imageSlider.css";

export function ImageSlider({ url }) {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImages(url) {
    try {
      setLoading(true);
      const req = await fetch(url);
      const res = await req.json();

      if (res) {
        setImages(res);
        setLoading(false);
      }
    } catch (error) {
      setErrorMsg(error.message);
      setLoading(false);
    }
  }
  useEffect(() => {
    if (url !== "") {
      fetchImages(url);
    }
  }, [url]);
  function handlePrevius() {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  }
  function handleNext() {
    setCurrentSlide(currentSlide === images.length ? 0 : currentSlide + 1);
  }

  if (loading) {
    return <div>Loading data, please wait</div>;
  }
  if (errorMsg !== null) {
    return <div className="error">error fecht</div>;
  }
  return (
    <div className="container">
      <BsArrowRightCircleFill
        className="arrow arrow-right"
        onClick={handlePrevius}
      />
      {images &&
        images.map((imageItem, index) => {
          return (
            <img
              key={imageItem.id}
              src={imageItem.image}
              alt=""
              className={
                currentSlide === index
                  ? "current-image"
                  : "current-image hide-current-image"
              }
            />
          );
        })}
      <BsArrowLeftCircleFill
        className="arrow arrow-left"
        onClick={handleNext}
      />
      <span className="circle-indicator">
        {images &&
          images.map((_, index) => {
            return <button key={index} className={
                currentSlide===index ? "current-indicator" :"current-indicator update-current-indicator"
            } onClick={()=>setCurrentSlide(index)}></button>;
          })}
      </span>
    </div>
  );
}
