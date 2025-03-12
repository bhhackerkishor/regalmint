import React from "react";
import { Box, Typography ,useMediaQuery} from "@mui/material";
import { motion } from "framer-motion";
import leafUrl from "../images/Leaf_icon_15.svg"



const leaves = Array.from({ length: 10 }).map((_, index) => ({
  id: index,
  left: Math.random() * 100 + "%",
  duration: Math.random() * 3 + 2,
}));

const quotes = [
  "Shop smart, shop Regal!",
  "Luxury shopping made affordable.",
  "Your one-stop shop for everything you love!",
  "Elevate your shopping experience today.",
  "Discover deals, embrace style!",
  "Trendy, affordable, and just for you!",
  "Where quality meets unbeatable prices!",
  "Refresh your cart with exclusive finds!",
  "Step into a world of premium shopping.",
  "Style, comfort, and savings in one place!"
];

const LoadingScreen = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#fff"
      position="relative"
      overflow="hidden"
      px={2}
    >
      {leaves.map((leaf) => (
        <motion.img
          key={leaf.id}
          src={leafUrl}
          alt="Leaf"
          width={30}
          height={30}
          style={{ position: "absolute", top: "-10%", left: leaf.left }}
          animate={{ y: "110vh", rotate: [0, 360] }}
          transition={{ duration: leaf.duration, repeat: Infinity, ease: "linear" }}
        />
      ))}
      
      <Typography
        variant={isSmallScreen ? "h4" : "h3"}
        fontFamily="cursive"
        fontWeight="bold"
        color="black"
        textAlign="center"
      >
        RegalMints
      </Typography>
      
      <Typography
        variant={isSmallScreen ? "body1" : "h6"}
        color="grey"
        fontStyle="italic"
        mt={2}
        textAlign="center"
        maxWidth="80%"
      >
        {randomQuote}
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
