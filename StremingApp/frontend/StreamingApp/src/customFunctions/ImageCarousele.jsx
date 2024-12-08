import { useState, useEffect } from "react";
import Image1 from "../assets/images/img.png";
import Image2 from "../assets/images/register.jpg";
import Image3 from "../assets/images/img_1.png";

export function ImageCarousel() {
    const images = [Image1, Image2, Image3];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(intervalId);
    }, [images]);

    return (
        <div>
            <img
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                }}
            />
        </div>
    );
}
