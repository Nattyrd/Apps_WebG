import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled, { keyframes } from "styled-components";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const slideLeftAnimation = keyframes`
  0% {transform: translateX(100%); opacity: 0%;}
  100% {transform: translateX(0px); opacity: 100%;}
`

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`

const Arrow = styled.div<{ direction: string }>`
  width: 40px;
  height: 40px;
  background-color: rgba(255,255,255,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  border-radius: 50%;
  left: ${props => props.direction === "left" && "10px"};
  right: ${props => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.7;
  z-index: 2;
`

const Wrapper = styled.div<{ slideIndex: number }>`
  height: 100%;
  display: flex;
  transition: all 1.3s ease;
  transform:translateX(${props => props.slideIndex * -100}vw);
`

const Slide = styled.div <{ bg: string }> `
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #${props => props.bg};
`

const Image = styled.img`
  height: 100%;
  padding-bottom: 100px;
  box-shadow: 10px 0 40px 10px rgba(0,0,0,.25);
`

const InfoContainer = styled.div`
  flex: 3;
  padding: 100px;
  margin-top: -200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: ${slideLeftAnimation} 1.8s;
`

const Title = styled.h1`
  font-size: 70px;
`

const Desc = styled.p`
  margin: 50px 0;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 3px;
`

const Button = styled.button`
  padding: 10px;
  width: 200px;
  font-size: 20px;
  border: none;
  background-color: #fff;
  color: #000;
  &:hover {
    box-shadow: 0 0 10px 2px rgba(0,0,0,0.2);
    cursor: pointer;
  }
`

interface SlideData {
  imageUrl: string;
  name: string;
  description: string;
  bg: string;
}

const Slider: React.FC = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [slides, setSlides] = useState<SlideData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get<SlideData[]>('http://localhost:8000/api/products')
      .then(res => {
        const products = res.data.map((p: any) => ({
          imageUrl: p.imageUrl,
          name: p.name,
          description: p.description,
          bg: 'f0f0f0'
        }));
        setSlides(products.length > 0 ? products : defaultSlides);
      })
      .catch(() => setSlides(defaultSlides));
  }, []);

  const handleClick = (direction: string) => {
    if (direction === 'left'){
        setSlideIndex(slideIndex > 0 ? slideIndex - 1 : slides.length - 1)
    } else {
        setSlideIndex(slideIndex < slides.length - 1 ? slideIndex + 1 : 0)
    }
  }

  const navigateToShop = () => {
    navigate('/shop');
    window.scrollTo(0,0);
  }

  window.scrollTo(0,0);

  return(
    <Container>
      {slides.length > 0 && (
        <>
          <Arrow direction="left" onClick={() => handleClick('left')}>
            <ArrowBackIosIcon />
          </Arrow>
          <Wrapper slideIndex={slideIndex}>
            {slides.map((slide, i) => (
              <Slide bg={slide.bg} key={i}>
                <Image src={slide.imageUrl} alt={slide.name} />
                <InfoContainer>
                  <Title>{slide.name}</Title>
                  <Desc>{slide.description}</Desc>
                  <Button onClick={navigateToShop}>SHOP NOW</Button>
                </InfoContainer>
              </Slide>
            ))}
          </Wrapper>
          <Arrow direction="right" onClick={() => handleClick('right')}>
            <ArrowForwardIosIcon />
          </Arrow>
        </>
      )}
    </Container>
  );
};

const defaultSlides: SlideData[] = [
  {
    imageUrl: "https://i.ibb.co/cQk9Z8r/slide1.png",
    name: "SUMMER SALE",
    description: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF ON NEW ARRIVALS.",
    bg: "f5fafd"
  },
  {
    imageUrl: "https://i.ibb.co/DK9qX3z/slide2.png",
    name: "AUTUMN COLLECTION",
    description: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF ON NEW ARRIVALS.",
    bg: "fcf1ed"
  },
  {
    imageUrl: "https://i.ibb.co/Dp3N7Gq/slide3.png",
    name: "LOUNGEWEAR LOVE",
    description: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF ON NEW ARRIVALS.",
    bg: "fbf0f4"
  }
];

export default Slider;
