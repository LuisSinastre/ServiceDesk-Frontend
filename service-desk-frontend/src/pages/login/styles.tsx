import styled from "styled-components";

export const Container = styled.div`
  background-color: red;
  padding: 20px;
  height: 100%;
  /* min-height: 500px; */
  
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  background-color: #fff;
  /* width: 20px; */
  min-height: 100px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
`;
