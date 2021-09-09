import React from "react";
import styled from "styled-components";

const MainPageWrapper = styled.div`
  background-color: #d0e2f2;

  .mainbox {
    max-width: 500px;
  }
`;

const MainLayout = () => {
  return (
    <MainPageWrapper>
      <div className="body">
        <div className="mainbox">
          Main area box
          <h2 className="city_name">City Name</h2>
          <input type number id="input" />
          <button> Check </button>
        </div>
      </div>
      <div className="footer"></div>
    </MainPageWrapper>
  );
};

export default MainLayout;
