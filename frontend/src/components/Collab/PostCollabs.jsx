import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const PostCollab = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [platform, setPlatform] = useState("");
  const [reach, setReach] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [paymentFrom, setPaymentFrom] = useState("");
  const [paymentTo, setPaymentTo] = useState("");
  const [fixedPayment, setFixedPayment] = useState("");
  const [paymentType, setPaymentType] = useState("default");

  const { isAuthorized, user } = useContext(Context);

  const handleCollabPost = async (e) => {
    e.preventDefault();

    // Reset the payment fields based on payment type
    if (paymentType === "Fixed Payment") {
      setPaymentFrom("");
      setPaymentTo("");
    } else if (paymentType === "Ranged Payment") {
      setFixedPayment("");
    } else {
      setPaymentFrom("");
      setPaymentTo("");
      setFixedPayment("");
    }

    try {
      const res = await axios.post(
        "https://collaby.onrender.com/api/v1/collab/post",
        fixedPayment.length >= 2
          ? {
              title,
              description,
              category,
              platforms: platform,
              reach,
              country,
              city,
              fixedPayment,
            }
          : {
              title,
              description,
              category,
              platforms: platform,
              reach,
              country,
              city,
              paymentFrom,
              paymentTo,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "Collaborator")) {
    navigateTo("/");
  }

  return (
    <>
      <div className="collab_post page">
        <div className="container">
          <h3>POST NEW COLLABRATION</h3>
          <form onSubmit={handleCollabPost}>
            <div className="wrapper">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Collab type/field"
              />
              <select style={{color: "grey"}}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Clothing and Apparel">Clothing and Apparel</option>
                <option value="Health and Fitness">Health and Fitness</option>
                <option value="Technology and Gadgets">Technology and Gadgets</option>
                <option value="Lifestyle and Travel">Lifestyle and Travel</option>
                <option value="Food and Beverage">Food and Beverage</option>
                <option value="Education and Learning">Education and Learning</option>
                <option value="Entertainment and Media">Entertainment and Media</option>
                <option value="Makeup and Skincare">Makeup and Skincare</option>
                <option value="Real Estate and Hotel Review">Real Estate and Hotel Review</option>
                <option value="Car and Motorcycle Reviews">Car and Motorcycle Reviews</option>
              </select>
            </div>
            <div className="wrapper">
              <input
                type="text"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                placeholder="Social Media Platform"
              />
              <input
                type="text"
                value={reach}
                onChange={(e) => setReach(e.target.value)}
                placeholder="Reach: followers/subscribers on platforms"
              />
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
              />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
            </div>
            <div className="payment_wrapper">
              <select style={{color: "grey"}}
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
              >
                <option value="default">Select Payment Type</option>
                <option value="Fixed Payment">Fixed Payment</option>
                <option value="Ranged Payment">Ranged Payment</option>
              </select>
              <div>
                {paymentType === "default" ? (
                  <p>Please provide Payment Type *</p>
                ) : paymentType === "Fixed Payment" ? (
                  <input
                    type="number"
                    placeholder="Enter Fixed Payment"
                    value={fixedPayment}
                    onChange={(e) => setFixedPayment(e.target.value)}
                  />
                ) : (
                  <div className="ranged_payment">
                    <input
                      type="number"
                      placeholder="Payment From"
                      value={paymentFrom}
                      onChange={(e) => setPaymentFrom(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Payment To"
                      value={paymentTo}
                      onChange={(e) => setPaymentTo(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
            <textarea
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Collaboration Description"
            />
            <button type="submit">Create Collab</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostCollab;
