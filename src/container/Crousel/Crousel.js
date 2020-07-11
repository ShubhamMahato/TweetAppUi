import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import Crousel1 from "../../assets/crousel_1.PNG";
import Crousel2 from "../../assets/crousel_2.PNG";
import Crousel3 from "../../assets/crousel_3.PNG";
import styles from "./Crousel.module.css";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      className={styles.Crousel}
      activeIndex={index}
      onSelect={handleSelect}
    >
      <Carousel.Item>
        <img className="d-block w-100" src={Crousel1} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={Crousel2} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={Crousel3} alt="Third slide" />
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;
