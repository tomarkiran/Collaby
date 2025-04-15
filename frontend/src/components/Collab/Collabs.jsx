import React, { useContext, useEffect , useState } from 'react';
import { Context } from "../../main";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// const Collabs = () => {
//   const [collabs, setCollabs] = useState([]);
//   const { isAuthorized } = useContext( Context );
//   const navigateTo = useNavigate();

//   useEffect(()=> {
//     try {
//       axios.get("http://localhost:4000/api/v1/collab/getAll", {withCredentials: true}).then((res) => {
//         setCollabs(res.data);
//       });
      
//     } catch (error) {
//       console.log(error);      
//     }

//   }, []);

//   if(!isAuthorized){
//     navigateTo("/login");
//   }







//ectraaa
const Collabs = () => {
  const [collabs, setCollabs] = useState([]);
  // const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
    }
  }, [isAuthorized, navigateTo]);

  const fetchCollabs = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/collab/getAll", {
        params: {
          country,
          city,
        },
        withCredentials: true,
      });
      setCollabs(response.data);
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    fetchCollabs();
  }, [ country, city]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'country') setCountry(value);
    if (name === 'city') setCity(value);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchCollabs();
  };

  return (
    <>
      <section className="collabs page">
        <div className="container">
          <h1>ALL AVAILABLE COLLAB</h1>
          <form onSubmit={handleFilterSubmit}>
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={country}
              onChange={handleFilterChange}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={city}
              onChange={handleFilterChange}
            />
            <button type="submit">Filter</button>
          </form>
          <div className="banner">
       {collabs.Collabs  && collabs.Collabs.map((element)=> {
         return (
               <div className="card" key= {element._id}>
                <p>{element.title}</p>
                 <p>{element.category}</p>
                   <p>{element.country}</p>
                   <Link to={`/collab/${element._id}`}>Post Details</Link>
                </div>
             );

            })}
       </div>
        </div>
      </section>
    </>
  );
};

export default Collabs;


{/* <input
type="text"
name="category"
placeholder="Category"
value={category}
onChange={handleFilterChange}
/> */}


//   return (
//     <section className="collabs page">
//       <div className="container">
//         <h1>ALL AVAILABLE COLLAB</h1>
//         <div className="banner">
//           {collabs.Collabs  && collabs.Collabs.map((element)=> {
//               return (
//                 <div className="card" key= {element._id}>
//                   <p>{element.title}</p>
//                   <p>{element.category}</p>
//                   <p>{element.country}</p>
//                   <Link to={`/collab/${element._id}`}>Post Details</Link>
//                 </div>
//               );

//             })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Collabs;
