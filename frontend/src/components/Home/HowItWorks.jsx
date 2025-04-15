import React from 'react'
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";


const HowItWorks = () => {
  return (
    <div className='howitworks'>
      <div className="container">
        <h3>How Collabify Works</h3>
        <div className="banner">
          <div className="card">
            <FaUserPlus />
            <p>Create Account</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, unde sunt! Consequatur illum porro quod. Excepturi nihil vel veritatis quibusdam dolorum quis voluptas tenetur repudiandae, minima ipsa ab itaque voluptatum officia iure minus, ratione enim et vitae obcaecati natus. Accusantium corrupti omnis aliquid voluptate ullam saepe reprehenderit, tempora fugiat repudiandae.</p>
          </div>
          <div className="card">
            <MdFindInPage/>
            <p>Find a post/Post a post</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, unde sunt! Consequatur illum porro quod. Excepturi nihil vel veritatis quibusdam dolorum quis voluptas tenetur repudiandae, minima ipsa ab itaque voluptatum officia iure minus, ratione enim et vitae obcaecati natus. Accusantium corrupti omnis aliquid voluptate ullam saepe reprehenderit, tempora fugiat repudiandae.</p>
          </div>
          <div className="card">
            <IoMdSend />
            <p>Login Account</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, unde sunt! Consequatur illum porro quod. Excepturi nihil vel veritatis quibusdam dolorum quis voluptas tenetur repudiandae, minima ipsa ab itaque voluptatum officia iure minus, ratione enim et vitae obcaecati natus. Accusantium corrupti omnis aliquid voluptate ullam saepe reprehenderit, tempora fugiat repudiandae.</p>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default HowItWorks;
