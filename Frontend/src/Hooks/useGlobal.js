import axios from "axios";
import { useState } from "react";
import countryCode from "../Features/Checkout/Data/countryCode.json";
const useGlobal = () => {
  const [open, setOpen] = useState(false);
  const [mbCode, setMbCode] = useState(countryCode[15]);
  const [totalPrice, setTotalPrice] = useState(0);


  const toggleModal = () => setOpen(!open);

  const getPayment = async (body) => {
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/bkash/createPayment`, { ...body, totalPrice });
      window.location.href = data.bkashURL
    } catch (error) {
      console.log(error);
    }
  }

  return {
    toggleModal,
    open,
    setMbCode,
    mbCode,
    getPayment,
    totalPrice,
    setTotalPrice,
    setOpen
  };
};
export default useGlobal;
