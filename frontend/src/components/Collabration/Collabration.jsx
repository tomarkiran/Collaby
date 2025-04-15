import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";


const Collabration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mediaPlatforms, setMediaPlatforms] = useState("");
  const [linkToPlatforms, setLinkToPlatforms] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  // Function to handle file input changes
  const handleFileChange = (event) => {
    const resume = event.target.files[0];
    setResume(resume);
  };

  const { id } = useParams();
  const handleCollabration = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mediaPlatforms", mediaPlatforms);
    formData.append("linkToPlatforms", linkToPlatforms);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("resume", resume);
    formData.append("collabId", id);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/collabration/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setEmail("");
      setMediaPlatforms("");
      setLinkToPlatforms("");
      setPhone("");
      setAddress("");
      setResume("");
      toast.success(data.message);
      navigateTo("/collab/getall");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthorized || (user && user.role === "Collaborator")) {
    navigateTo("/");
  }

  return (
    <section className="collabration">
      <div className="container">
        <h3>Collabration Form</h3>
        <form onSubmit={handleCollabration}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your Social Media Platforms"
            value={mediaPlatforms}
            onChange={(e) => setMediaPlatforms(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your Social Platforms Link"
            value={linkToPlatforms}
            onChange={(e) => setLinkToPlatforms(e.target.value)}
          />
          <input
            type="number"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div>
            <label
              style={{ textAlign: "start", display: "block", fontSize: "20px" }}
            >
              Select InfluenceBio
            </label>
            <input
              type="file"
              accept=" .png, .jpg, .webp"
              onChange={handleFileChange}
              style={{ width: "100%" }}
            />
          </div>
          <button type="submit">Send Collabration</button>
        </form>
      </div>
    </section>
  );
};

export default Collabration;