import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyCollabs = () => {
  const [mycollabs, setMyCollabs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();
  //Fetching all collabs
  useEffect(() => {
    const fetchCollabs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/collab/getmyPosts",
          { withCredentials: true }
        );
        setMyCollabs(data.myCollabs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyCollabs([]);
      }
    };
    fetchCollabs();
  }, []);
  if (!isAuthorized || (user && user.role !== "Collaborator")) {
    navigateTo("/");
  }

  //Function For Enabling Editing Mode
  const handleEnableEdit = (collabId) => {
    //Here We Are Giving Id in setEditingMode because We want to enable only that collab whose ID has been send.
    setEditingMode(collabId);
  };

  //Function For Disabling Editing Mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  //Function For Updating The Collab
  const handleUpdateCollab = async (collabId) => {
    const updatedCollab = mycollabs.find((collab) => collab._id === collabId);
    await axios
      .put(`http://localhost:4000/api/v1/collab/update/${collabId}`, updatedCollab, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  //Function For Deleting Collab
  const handleDeleteCollab = async (collabId) => {
    await axios
      .delete(`http://localhost:4000/api/v1/collab/delete/${collabId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyCollabs((prevCollabs) => prevCollabs.filter((collab) => collab._id !== collabId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (collabId, field, value) => {
    // Update the collab object in the collabs state with the new value
    setMyCollabs((prevCollabs) =>
      prevCollabs.map((collab) =>
        collab._id === collabId ? { ...collab, [field]: value } : collab
      )
    );
  };

  return (
    <>
      <div className="myCollabs page">
        <div className="container">
          <h1>Your Posted Collabs</h1>
          {mycollabs.length > 0 ? (
            <>
              <div className="banner">
                {mycollabs.map((element) => (
                  <div className="card" key={element._id}>
                    <div className="content">
                      <div className="short_fields">
                        <div>
                          <span>Title:</span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.title}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "title",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <span>Platforms:</span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.platforms}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "platforms",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <span>Reach:</span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.reach}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "reach",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          {" "}
                          <span>Country:</span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.country}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "country",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <span>City:</span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.city}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "city",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <span>Category:</span>
                          <select
                            value={element.category}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "category",
                                e.target.value
                              )
                            }
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                          >
                              <option value="">Select Category</option>
                              <option value="Clothing and Apparel">Clothing and Apparel</option>
                              <option value="Health and Fitness">
                              Health and Fitness
                              </option>
                              <option value="Technology and Gadgets">
                              Technology and Gadgets
                              </option>
                              <option value="Lifestyle and Travel">
                              Lifestyle and Travel
                              </option>
                              <option value="Food and Beverage">Food and Beverage</option>
                              <option value=" Education and Learning">
                              Education and Learning
                              </option>
                              <option value="Entertainment and Media">Entertainment and Media</option>
                              <option value="Makeup and Skincare">
                              "Makeup and Skincare"                
                              </option>
                              <option value="Realstate and Hotel review">
                               Realstate and Hotel review
                              </option>
                              <option value="Car and Motorcycle Reviews">Car and Motorcycle Reviews</option>
                          </select>
                        </div>
                        <div>
                          <span>
                            Payment:{" "}
                            {element.fixedPayment ? (
                              <input
                                type="number"
                                disabled={
                                  editingMode !== element._id ? true : false
                                }
                                value={element.fixedPayment}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "fixedPayment",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              <div>
                                <input
                                  type="number"
                                  disabled={
                                    editingMode !== element._id ? true : false
                                  }
                                  value={element.paymentFrom}
                                  onChange={(e) =>
                                    handleInputChange(
                                      element._id,
                                      "paymentFrom",
                                      e.target.value
                                    )
                                  }
                                />
                                <input
                                  type="number"
                                  disabled={
                                    editingMode !== element._id ? true : false
                                  }
                                  value={element.paymentTo}
                                  onChange={(e) =>
                                    handleInputChange(
                                      element._id,
                                      "paymentTo",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            )}
                          </span>
                        </div>
                        <div>
                          {" "}
                          <span>Expired:</span>
                          <select
                            value={element.expired}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "expired",
                                e.target.value
                              )
                            }
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                          >
                            <option value={true}>TRUE</option>
                            <option value={false}>FALSE</option>
                          </select>
                        </div>
                      </div>
                      <div className="long_field">
                        <div>
                          <span>Description:</span>{" "}
                          <textarea
                            rows={5}
                            value={element.description}
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "description",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {/* Out Of Content Class */}
                    <div className="button_wrapper">
                      <div className="edit_btn_wrapper">
                        {editingMode === element._id ? (
                          <>
                            <button
                              onClick={() => handleUpdateCollab(element._id)}
                              className="check_btn"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => handleDisableEdit()}
                              className="cross_btn"
                            >
                              <RxCross2 />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleEnableEdit(element._id)}
                            className="edit_btn"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteCollab(element._id)}
                        className="delete_btn"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>
              You've not posted any collab or may be you deleted all of your collabs!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyCollabs;