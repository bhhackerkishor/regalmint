import React, { useMemo, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Box, Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const NewArrivalsCarousel = ({ products }) => {
  // Compute the latest four products based on createdAt date
  const latestFourProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    return [...products]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 4);
  }, [products]);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleStepChange = (step) => {
    setActiveIndex(step);
  };

  return (
    <Box sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        New Arrivals
      </Typography>
      <AutoPlaySwipeableViews
        index={activeIndex}
        onChangeIndex={handleStepChange}
        interval={4000}
        enableMouseEvents
      >
        {latestFourProducts.map((product, index) => (
          <Box key={product._id} sx={{ display: "flex", justifyContent: "center" }}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea component={Link} to={`/product-details/${product.slug}`}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.thumbnail}
                  alt={product.title}
                />
                <CardContent>
                  <Typography variant="h6" noWrap>
                    {product.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        ))}
      </AutoPlaySwipeableViews>
    </Box>
  );
};

export default NewArrivalsCarousel;
