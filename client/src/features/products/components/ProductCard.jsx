import { FormHelperText, Paper, Stack, Typography, useMediaQuery, useTheme} from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { selectWishlistItems } from '../../wishlist/WishlistSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { addToCartAsync,selectCartItems } from '../../cart/CartSlice';
import {motion} from 'framer-motion'

export const ProductCard = ({id,productId,title,price,thumbnail,brand,stockQuantity,discountPercentage,handleAddRemoveFromWishlist,isWishlistCard,isAdminCard}) => {

    const navigate=useNavigate()
    const wishlistItems=useSelector(selectWishlistItems)
    const loggedInUser=useSelector(selectLoggedInUser)
    const cartItems=useSelector(selectCartItems)
    const dispatch=useDispatch()
    
    
    const theme=useTheme()
    const is408=useMediaQuery(theme.breakpoints.down(408))
    const is488=useMediaQuery(theme.breakpoints.down(488))

    const isProductAlreadyinWishlist = wishlistItems.some((item)=>item.product.slug===id)
    const isProductAlreadyInCart = cartItems.some((item)=>item.product.slug===id)

    const handleAddToCart = async(e) => {
        e.stopPropagation()
        const data = { user: loggedInUser?._id, product: id }
        dispatch(addToCartAsync(data))
    }

    return (
        <Stack component={isAdminCard?"":isWishlistCard?"":is408?'':Paper} mt={is408?2:0} elevation={1} p={2} width={'300px'} sx={{cursor:"pointer"}} onClick={()=>navigate(`/product-details/${id}`)}>
            <Stack>
                <img width={'100%'} style={{aspectRatio:1/1,objectFit:"contain"}} height={'100%'} src={thumbnail} alt={`${title} photo unavailable`} />
            </Stack>

            <Stack flex={2} justifyContent={'flex-end'} spacing={1} rowGap={2}>
                <Stack>
                    <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography variant='h6' fontWeight={400}>{title}</Typography>
                        {
                            !isAdminCard && 
                            <motion.div whileHover={{scale:1.3,y:-10,zIndex:100}} whileTap={{scale:1}} transition={{duration:.4,type:"spring"}}>
                                <Checkbox onClick={(e)=>e.stopPropagation()} checked={isProductAlreadyinWishlist} onChange={(e)=>handleAddRemoveFromWishlist(e,productId)} icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{color:'red'}} />} />
                            </motion.div>
                        }
                    </Stack>
                    <Typography color={"text.secondary"}>{brand}</Typography>
                </Stack>

                <Stack sx={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                    <Typography>₹{Math.round(price - (price * discountPercentage / 100))}}</Typography>
                    {
                        !isWishlistCard && !isAdminCard && (
                            loggedInUser ? (
                                isProductAlreadyInCart ? 
                                    'Added to cart' 
                                    :
                                    <motion.button whileHover={{scale:1.030}} whileTap={{scale:1}} onClick={(e)=>handleAddToCart(e)} style={{padding:"10px 15px",borderRadius:"3px",outline:"none",border:"none",cursor:"pointer",backgroundColor:"black",color:"white",fontSize:is408?'.9rem':is488?'.7rem':'.9rem'}}>
                                        <p>Add To Cart</p>
                                    </motion.button>
                            ) : (
                                <Typography color="error" fontSize={is408?'.9rem':is488?'.7rem':'.9rem'}>Please login to purchase</Typography>
                            )
                        )
                    }
                </Stack>

                {stockQuantity <= 20 && (
                    <FormHelperText sx={{fontSize:".9rem"}} error>
                        {stockQuantity === 1 ? "Only 1 stock is left" : "Only few are left"}
                    </FormHelperText>
                )}
            </Stack>
        </Stack>
    )
}
