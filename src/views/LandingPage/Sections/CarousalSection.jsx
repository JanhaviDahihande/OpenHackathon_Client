import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";

// material-ui components
// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";

import image1 from "assets/img/carousal_img.jpg";

class CarousalSection extends React.Component {
  render() {
    const settings = {
    //   dots: true,
      infinite: true,
      speed: 500,
    //   slidesToShow: 1,
    //   slidesToScroll: 1,
    //   autoplay: true
    };
    return (
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <Carousel {...settings}>
                  <div>
                    <img
                      src={image1}
                      alt="First slide"
                      className="slick-image"
                    />
                    <div className="slick-caption">
                    <h1>Annual Hackathon For Devs</h1>
                <h4>
                For the last 20 years the Codathon hackathon’s been the main staple for coders from across the niches and different parts of the US. This year, with more than 2500 tickets sold out already, it looks to be the biggest one!
                </h4>
                    </div>
                  </div>
                </Carousel>
              </Card>
            </GridItem>
          </GridContainer>
    );
  }
}

export default CarousalSection;