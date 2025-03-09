import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Typography, Box, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { fetchProducts } from "../ProductApi";

const RelatedProducts = ({ currentProduct }) => {
  const [products, setProducts] = useState([]);
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const CARD_GAP = 16;

  // Dynamic width function for different screen sizes
  const getCardWidth = () => {
    if (typeof window === 'undefined') return 280;  // Default width if no window object (e.g., during SSR)
    const screenWidth = window.innerWidth;
    if (screenWidth < 600) return 180;  // Mobile
    if (screenWidth < 960) return 240;  // Tablet
    return 280;  // Desktop
  };
   const getBoxWidth = () => {
    if (typeof window === 'undefined') return 280;  // Default width if no window object (e.g., during SSR)
    const screenWidth = window.innerWidth;
    if (screenWidth < 600) return 300;  // Mobile
    if (screenWidth < 960) return 500;  // Tablet
    return 100%;  // Desktop
  };

  // Scroll functions to move horizontally in the slider
  const scrollLeft = () => {
    const cardWidth = getCardWidth();
    sliderRef.current?.scrollBy({
      left: -(cardWidth + CARD_GAP),
      behavior: 'smooth'
    });
  };

  const scrollRight = () => {
    const cardWidth = getCardWidth();
    sliderRef.current?.scrollBy({
      left: cardWidth + CARD_GAP,
      behavior: 'smooth'
    });
  };

  // Fetch related products
  const fetchAllProducts = async () => {
    try {
      const response = await fetchProducts(currentProduct?.category?._id);
      const filteredProducts = response.data.filter(
        product => product._id !== currentProduct?._id
      );
      setProducts(filteredProducts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentProduct?.category?._id) fetchAllProducts();
  }, [currentProduct?.category?._id]);

  const relatedProducts = useMemo(() => 
    products.filter(product => product._id !== currentProduct?._id), 
    [products, currentProduct]
  );

  if (relatedProducts.length === 0) return null;

  // Get the width for the container dynamically
  const containerWidth = getBoxWidth();

  return (
    <Box sx={{ position: 'relative', width: '100%', mx: 'auto', maxWidth: 1200 }}>
      <Typography variant="h5" sx={{ 
        mt: 4, 
        mb: 2, 
        px: 2,
        fontSize: { xs: '1.25rem', sm: '1.5rem' },
        fontWeight: 600,
        textAlign: 'center'
      }}>
        Related Products
      </Typography>

      <Box ref={containerRef} sx={{ 
        position: 'relative',
        overflow: 'hidden',
        width: containerWidth,  // Dynamically set width based on screen size
        '&:hover .nav-button': { opacity: 1 }
      }}>
        <IconButton 
          onClick={scrollLeft} 
          className="nav-button"
          sx={{ 
            position: 'absolute', 
            left: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            bgcolor: 'background.paper',
            boxShadow: 3,
            width: 40,
            height: 40,
            opacity: 0.9,
            transition: 'all 0.3s',
            '&:hover': { 
              bgcolor: 'primary.main',
              transform: 'translateY(-50%) scale(1.1)',
              '& svg': { color: 'common.white' }
            }
          }}
        >
          <ArrowBackIos sx={{ fontSize: '1.2rem' }} />
        </IconButton>

        <Box
          ref={sliderRef}
          sx={{
            display: 'flex',
            overflowX: 'auto',  // Ensure horizontal scrolling
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            width: '100%',
            px: 2,
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none'
          }}
        >
          {relatedProducts.map(product => (
            <Box
              component={Link}
              to={`/product-details/${product.slug}`}
              key={product._id}
              sx={{
                flex: '0 0 auto',
                minWidth: { xs: '45%', sm: '30%', md: '23%' },
                maxWidth: 'calc(33.333% - 10.666px)',
                mx: 1,
                p: 1.5,
                boxSizing: 'border-box',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                scrollSnapAlign: 'start',
                height: 320,
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                transition: 'transform 0.2s',
                '&:hover': { 
                  transform: 'translateY(-4px)',
                  boxShadow: 2 
                }
              }}
            >
              <Box sx={{
                width: '100%',
                height: 180,
                borderRadius: 1,
                overflow: 'hidden',
                bgcolor: 'white',
                position: 'relative'
              }}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',  // Adjust image fitting
                  }}
                />
              </Box>
              <Box sx={{ mt: 1, flexGrow: 1 }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    color: 'text.primary',
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }}
                >
                  {product.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ mt: 0.5, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                >
                  {product.brand?.name}
                </Typography>
              </Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  mt: 1,
                  color: 'primary.main',
                  fontWeight: 'bold',
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}
              >
                ₹{Math.round(product.price - (product.price * product.discountPercentage / 100))}
              </Typography>
            </Box>
          ))}
        </Box>

        <IconButton
          onClick={scrollRight}
          className="nav-button"
          sx={{ 
            position: 'absolute', 
            right: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            bgcolor: 'background.paper',
            boxShadow: 3,
            width: 40,
            height: 40,
            opacity: 0.9,
            transition: 'all 0.3s',
            '&:hover': { 
              bgcolor: 'primary.main',
              transform: 'translateY(-50%) scale(1.1)',
              '& svg': { color: 'common.white' }
            }
          }}
        >
          <ArrowForwardIos sx={{ fontSize: '1.2rem' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default RelatedProducts;
