import React, {useState, useEffect} from "react";
import axios from "axios";
import './Cards.scss'

const Cards = () => {
    const [flowersData, setFlowersData] = useState([]);
    const Api = "https://flowrspot-api.herokuapp.com/api/v1/flowers";
  
    const FlowerCall = async () => {
      try {
        const response = await axios.get(Api, {
          headers: {
            Authorization: localStorage.getItem("auth_token"),
            "Content-Type": "application/json",
          },
        });
        console.log(response.data.flowers);
        const results = response.data.flowers;
        setFlowersData(results);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      setTimeout(() => {
        FlowerCall();
      }, 100);
    }, []);
  
    return (
      <section className="container">
        <div className="banner-content">
          <div className="cards_container">
              <div className="cp-row">
            {flowersData.map((item, i) => {
              return (
                <div className="cards col-3" key={i}>
                  <img src={item.profile_picture} />
                  <div className="content_card">
                    <h6>{item.latin_name}</h6>
                    <p>{item.name}</p>
                    <span>{item.sightings}sightings</span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="none"
                  >
                    <g filter="url(#filter0_d_54781_547)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M30 40C38.2843 40 45 33.2843 45 25C45 16.7157 38.2843 10 30 10C21.7157 10 15 16.7157 15 25C15 33.2843 21.7157 40 30 40Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_d_54781_547"
                        x="0"
                        y="0"
                        width="60"
                        height="60"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="5" />
                        <feGaussianBlur stdDeviation="7.5" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_54781_547"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_54781_547"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                  <svg
                  className="star_icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="12"
                    viewBox="0 0 13 12"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.7184 5.43853C12.9739 5.19714 13.064 4.84571 12.9537 4.51748C12.8431 4.18925 12.5557 3.95538 12.2011 3.90647L9.05377 3.4657C8.91905 3.44595 8.80354 3.36538 8.74366 3.24876L7.33663 0.500967C7.17881 0.192173 6.85731 0 6.50034 0C6.14305 0 5.82286 0.192173 5.66374 0.500967L4.2567 3.24876C4.19683 3.36538 4.08131 3.4472 3.94659 3.4657L0.799306 3.90647C0.444619 3.95538 0.155987 4.18925 0.0456762 4.51748C-0.0636588 4.84571 0.0264775 5.19839 0.281918 5.43853L2.55973 7.57657C2.65637 7.66843 2.70095 7.79947 2.67785 7.928L2.14029 10.9479C2.09343 11.2138 2.16567 11.4733 2.34366 11.6765C2.62221 11.995 3.1064 12.0919 3.49396 11.8947L6.30836 10.4692C6.42648 10.409 6.57388 10.4103 6.69201 10.4692L9.50771 11.8947C9.64372 11.9643 9.78983 12 9.94114 12C10.2158 12 10.4774 11.8824 10.6567 11.6765C10.8347 11.4733 10.9073 11.2138 10.8601 10.9479L10.3225 7.928C10.2994 7.79947 10.344 7.66843 10.4406 7.57657L12.7184 5.43853Z"
                      fill="#D4D8D9"
                    />
                  </svg>
                </div>
              );
            })}
  
              </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Cards;