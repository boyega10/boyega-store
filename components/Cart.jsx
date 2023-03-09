import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { useStateContext } from 'context/StateContext';
import { urlFor } from 'lib/client';
import getStripe from 'lib/getStripe';
import { PaystackButton } from 'react-paystack';
import Success from '@/pages/success';

const publicKey = 'pk_test_a3be32a60f18e6f064caa9426ff16407cf622f89';
const phone = '+2349033461851';
const email = 'adeniyibusiness@gmail.com';
const name = 'gideon nnalue';
const amount = 1000000;

const Cart = () => {
  const router = useRouter();
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: 'Pay Now',
    onSuccess: () => {
      setShowCart(false);
      router.push('/success');
    },
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  };

  const handleCheckout = async () => {
    // const stripe = await getStripe();
    // const response = await fetch('/api/stripe', {
    //   method: 'POST',
    //   headers: { 'content-type': 'application/json' },
    //   body: JSON.stringify(cartItems),
    // });
    // if (response.statusCode === 500) return;
    // const data = await response.json();
    // toast.loading('Redirecting...');
    // stripe.redirectToCheckout({ sessionId: data.id });
  };

  // const handleCheckout = async () => {
  //   const stripe = await getStripe();

  //   const response = await fetch('/api/stripe', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(cartItems),
  //   });

  //   if (response.statusCode === 500) return;

  //   const data = await response.json();

  //   toast.loading('Redirecting...');

  //   stripe.redirectToCheckout({ sessionId: data.id });
  // };

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button
          type='button'
          className='cart-heading'
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities})</span>
        </button>
        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3>Your Shopping bag is empty</h3>
            <Link href='/'>
              <button
                type='button'
                onClick={() => setShowCart(false)}
                className='btn'
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        <div className='product-container'>
          {cartItems.length >= 1 &&
            cartItems.map((item, index) => (
              <div className='product' key={item._id}>
                <img
                  src={urlFor(item?.image[0])}
                  className='cart-product-image'
                />
                <div className='item-desc'>
                  <div className='flex top'>
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className='flex bottom'>
                    <div>
                      <p className='quantity-desc'>
                        <span
                          className='minus'
                          onClick={() =>
                            toggleCartItemQuantity(item._id, 'dec')
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className='num' onClick=''>
                          {item.quantity}
                        </span>
                        <span
                          className='plus'
                          onClick={() =>
                            toggleCartItemQuantity(item._id, 'inc')
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type='button'
                      className='remove-item'
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className='btn-container'>
              <PaystackButton {...componentProps} className='btn' />
              {/* <button type='button' className='btn' onClick={handleCheckout}>
                PAY WITH STRIPE
              </button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
