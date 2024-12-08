import React from "react";
import Frame25802 from "../Frame25802";
import styled from "styled-components";


function Frame25801(props) {
  const { frame258021Props2, frame258022Props, frame258023Props, frame258024Props } = props;

  return (
    <Frame258011>
      <Frame25802 />
      <Frame25802 className={frame258021Props2.className} />
      <Frame25802 className={frame258022Props.className} />
      <Frame25802 className={frame258023Props.className} />
      <Frame25802 className={frame258024Props.className} />
    </Frame258011>
  );
}

const Frame258011 = styled.div`
  position: absolute;
  width: 1440px;
  height: 200px;
  top: 626px;
  left: 193px;
  display: flex;
  padding: 58px 98px;
  align-items: flex-start;
  gap: 51px;
  border: 1px none;
  opacity: 0.8;
`;

export default Frame25801;
