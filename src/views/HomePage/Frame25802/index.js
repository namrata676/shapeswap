import React from "react";
import styled from "styled-components";
import { InterNormalWhite12px, InterNormalWhite16px, InterMediumWhite20px } from "../styledMixins";


function Frame25802(props) {
  const { className } = props;

  return (
    <Frame258021 className={`frame-25802 ${className || ""}`}>
      <Group25777 className="group-25777">
        <BitcoinBtcLogo1 className="bitcoin-btc-logo-1" src="/img/bitcoin-btc-logo-1@2x.svg" alt="bitcoin-btc-logo 1" />
        <GroupContainer className="group-container">
          <Group25776 className="group-25776">
            <Bitcoin className="bitcoin">Bitcoin</Bitcoin>
            <Price className="price">$20,732</Price>
          </Group25776>
          <Group25775 className="group-25775">
            <Polygon2 className="polygon-2" src="/img/polygon-2@2x.svg" alt="Polygon 2" />
            <Percent className="percent">2.54%</Percent>
            <X24H className="x24-h">24H</X24H>
          </Group25775>
        </GroupContainer>
      </Group25777>
    </Frame258021>
  );
}

const Frame258021 = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  align-items: flex-start;
  gap: 10px;
  padding: 12px;
  border-radius: 16px;
  border: 1px none;
  box-shadow: 0px 4px 50px #ffffff26;
  background: linear-gradient(
    180deg,
    rgb(0, 149.38752472400665, 235.87500303983688) 0%,
    rgb(21.179972290992737, 76.96958184242249, 221.00830078125) 100%
  );
`;

const Group25777 = styled.div`
  position: relative;
  min-width: 182.00001525878906px;
  height: 52.00000762939453px;
`;

const BitcoinBtcLogo1 = styled.img`
  position: absolute;
  width: 61px;
  height: 61px;
  top: 0;
  left: -8px;
`;

const GroupContainer = styled.div`
  position: absolute;
  width: 125px;
  top: 0;
  left: 61px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 52px;
  gap: 9px;
`;


const Group25776 = styled.div`
  height: 24px;
  display: flex;
  padding: 0px 0px;
  align-items: flex-start;
  min-width: 125px;
  gap: 8px;
`;

const Bitcoin = styled.div`
  ${InterMediumWhite20px}
  min-height: 24px;
  min-width: 66px;
  letter-spacing: 0;
  line-height: normal;
`;

const Price = styled.div`
  ${InterNormalWhite12px}
  min-height: 15px;
  align-self: center;
  margin-top: 1px;
  min-width: 47px;
  letter-spacing: 0;
  line-height: normal;
`;

const Group25775 = styled.div`
  height: 19px;
  display: flex;
  padding: 0px 1.8px;
  align-items: center;
  min-width: 99px;
`;

const Polygon2 = styled.img`
  width: 12px;
  height: 11px;
`;

const Percent = styled.div`
  ${InterNormalWhite16px}
  min-height: 19px;
  align-self: flex-end;
  margin-left: 6px;
  min-width: 47px;
  letter-spacing: 0;
  line-height: normal;
`;

const X24H = styled.div`
  ${InterNormalWhite12px}
  min-height: 15px;
  margin-left: 4px;
  margin-top: 2px;
  min-width: 24px;
  letter-spacing: 0;
  line-height: normal;
`;

export default Frame25802;
