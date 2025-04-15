import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyCollabrations = () => {
  const { user } = useContext(Context);
  const [collabrations, setCollabrations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Collaborator") {
        axios
          .get("http://localhost:4000/api/v1/collabration//collabrator/getAll", {
            withCredentials: true,
          })
          .then((res) => {
            setCollabrations(res.data.collabrations);
          });
      } else {
        axios
          .get("http://localhost:4000/api/v1/collabration/influencer/getAll", {
            withCredentials: true,
          })
          .then((res) => {
            setCollabrations(res.data.collabrations);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  const deleteCollabration = async (id) => {
    try {
       await axios
        .delete(`http://localhost:4000/api/v1/collabration/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setCollabrations((prevCollabration) =>
            prevCollabration.filter((collabration) => collabration._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_collabrations page">
      {user && user.role === "Influencer" ? (
        <div className="collabResume container">
          <h3>My Collabrations</h3>
          {collabrations.length <= 0 ? (
            <>
              {" "}
              <h4>No Collabrations Found</h4>{" "}
            </>
          ) : (
            collabrations.map((element) => {
              return (
                <CollabSeekerCard
                  element={element}
                  key={element._id}
                  deleteCollabration={deleteCollabration}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="collabResume container">
          <h3>Collabrations From Collab Seekers</h3>
          {collabrations.length <= 0 ? (
            <>
              <h4>No Collabrations Found</h4>
            </>
          ) : (
            collabrations.map((element) => {
              return (
                <EmployerCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyCollabrations;

const CollabSeekerCard = ({ element, deleteCollabration, openModal }) => {
  return (
    <>
      <div className="collab_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>mediaPlatforms:</span> {element.mediaPlatforms}
          </p>
          <p>
            <span>linkToPlatforms:</span> {element.linkToPlatforms}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
        <div className="btn_area">
          <button onClick={() => deleteCollabration(element._id)}>
            Delete Collabration
          </button>
        </div>
      </div>
    </>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <>
      <div className="collab_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>mediaPlatforms:</span> {element.mediaPlatforms}
          </p>
          <p>
            <span>linkToPlatforms:</span> {element.linkToPlatforms}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
      </div>
    </>
  );
};