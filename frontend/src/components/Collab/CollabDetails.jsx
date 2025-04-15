import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams , Link } from 'react-router-dom';
import { Context } from "../../main";
import axios from "axios";


const CollabDetails = () => {
  const {id} = useParams();
  const [collab, setCollab] =  useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user  } = useContext( Context );

  useEffect(()=> {
    axios
    .get(`http://localhost:4000/api/v1/collab/${id}`, { withCredentials: true, }).then((res)=> {
      setCollab(res.data.Collabs);
    }).catch((err)=> {
      console.log(err.response.data.message);
    });

  }, []);

  if(!isAuthorized){
    navigateTo("/login");
  }
  return (

  <section className="collabDetail page">
    <div className="container">
      <h3>Post Details</h3>
      <div className="banner">
        <p>
          Title: <span>{collab.title}</span>
        </p>
        <p>
          Category: <span>{collab.category}</span>
        </p>
        <p>
          Platforms: <span>{collab.platforms}</span>
        </p>
        <p>
          Reach: <span>{collab.reach}</span>
        </p>
        <p>
          Country: <span>{collab.country}</span>
        </p>
        <p>
          City: <span>{collab.city}</span>
        </p>
        <p>
          Description: <span>{collab.description}</span>
        </p>
        <p>
          Posted On: <span>{collab.rolepostedOn}</span>
        </p>
      <p>
        Payment: {collab.fixedPayment ? (<span>{collab.fixedPayment}</span>) : (<span>{collab.paymentFrom} - {collab.paymentTo}</span>)}
      </p>
      <p>
        {
          user && user.role === "Collaborator" ? (<></>) : (<Link to={`/collabration/${collab._id}`}>Apply Now</Link>)
        }
      </p>
    </div>
  </div>
      
    </section>
  );
};

export default CollabDetails;
