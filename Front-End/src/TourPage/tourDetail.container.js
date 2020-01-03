import React, { Component } from "react";

import { Link } from "react-router-dom";

import { Typography, Rate, Tag, Button, Carousel } from "antd";
import TourDetailImages from "./tourDetailImages";

import * as INDEX_CONSTANTS from "../_constants/index.constants";
import funcLoadJs from "../_constants/loadJs.constants";

import moment from "moment";

const { Text, Title, Paragraph } = Typography;

export default class TourDetailContainer extends Component {
   fetch = async () => {
      await funcLoadJs(INDEX_CONSTANTS.CustomerArrayExternalScript);
   };

   componentDidMount() {
      this.fetch();
      this.props.loaded();
   }

   renderImage() {
      const { listImageTour } = this.props;
      let result = null;
      result = listImageTour.map((imageTour, index) => {
         return (
            <TourDetailImages
               {...this.props}
               srcImage={imageTour.url}
               key={index}
            />
         );
      });
      return result;
   }
   //Dữ liệu từ ngoài truyền vô ở đây chỉ có việc load lên thôi
   render() {
      const { tour } = this.props;
      if (tour.departureDay.length > 22)
         tour.departureDay = moment(tour.departureDay)
            .utc()
            .format("lll");
      return (
         <div className="right-tour-detail-page mb-4">
            <div className="tour-content">
               <div className="row justify-conten-center">
                  <div className="col-md-12 col-lg-4 ftco-animate ht-boder-radius-1">
                     {/* Render Image of Tour */}
                     <Link
                        to={{
                           pathname: `/tour-single/${tour.idTour}`,
                           state: {
                              tour: tour
                           }
                        }}
                     >
                        <Carousel
                           autoplay
                           dotPosition={`top`}
                           className="ht-carousel-all-tour"
                        >
                           {this.renderImage()}
                        </Carousel>
                     </Link>
                     {/* end Render Image of Tour */}
                  </div>
                  <div className="col-md-12 col-lg-5 ftco-animate">
                     <Link
                        to={{
                           pathname: `/tour-single/${tour.idTour}`,
                           state: {
                              tour: tour
                           }
                        }}
                     >
                        <Title level={4}>{tour.titleTour}</Title>
                     </Link>
                     <Rate disabled defaultValue={4} /> ({tour.idTour})
                     <br />
                     <Paragraph className="mt-1" ellipsis>
                        {tour.describe}
                     </Paragraph>
                     <div className="">
                        <Tag color="#f50">
                           Khuyễn mãi miễn phí {tour.sale}% luôn á nè
                        </Tag>
                        <Link
                           to={{
                              pathname: `/tour-single/${tour.idTour}`,
                              state: {
                                 tour: tour
                              }
                           }}
                        >
                           <Button type="dashed">More</Button>
                        </Link>
                     </div>
                     <div className="mt-1">
                        <Paragraph className="mt-1" ellipsis>
                           Time: {tour.vocationTime}
                           {"  "}
                           <br></br>
                           Deparure: {tour.departureDay}
                        </Paragraph>
                     </div>
                  </div>
                  <div className="col-md-12 col-lg-3 ftco-animate right-detail-tour">
                     <div className="mt-2">
                        <Tag color="#87d068">Nhiều người đi nhất</Tag>
                     </div>
                     <div className="mt-1">
                        <Text>(233) Reviews</Text>
                     </div>
                     <div className="mt-1 text-price-tour-detail">
                        {tour.price} VNĐ
                     </div>
                     <div className="mt-1">
                        <Text delete>
                           {tour.price - tour.price * tour.sale * 0.01} VNĐ
                        </Text>
                     </div>
                     <div>
                        <Link
                           to={{
                              pathname: `/book-tour/${tour.idTour}`,
                              state: {
                                 tour: tour
                              }
                           }}
                        >
                           <Button type="primary">BOOK NOW</Button>
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}
