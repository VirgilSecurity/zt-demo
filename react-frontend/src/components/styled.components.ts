import styled from "styled-components";
import { Link } from "react-router-dom";


export const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 1200px;
  min-height: calc(100vh - 192px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 0;
`

export const DivFlexBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin: 0 auto;
`

export const DivFlexJustify = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-self: center;
`

export const DivFlexBoxColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  padding: 10px;
  margin: 0 auto;
`

export const MenuButtonLinkHeader = styled(Link)`
  padding: 8px 24px;
  text-decoration: none;
  background: #4E62C0;
  border-radius: 150px;
  color: #ffffff;
  font-size: 18px;
  cursor: pointer;
  transition: .2s ease-out;

  &:hover {
    box-shadow: 0 0 12px #4E62C0;
  }
`;

export const LogoLink = styled(Link)`
  margin-right: auto;
`

export const MenuButtonHeader = styled.button`
  padding: 8px 24px;
  text-decoration: none;
  background: #4E62C0;
  border-radius: 150px;
  color: #ffffff;
  font-size: 18px;
  margin-left: auto;
  cursor: pointer;
  transition: .2s ease-out;

  &:hover {
    box-shadow: 0 0 12px #4E62C0;
  }
`

export const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 16px 24px;
  justify-content: center;
  background-color: #141B41;
  gap: 24px;
`;

export const HomeWrapper = styled.div`
  max-width: 1200px;
  padding: 120px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 72px;
    line-height: 88px;
    text-transform: uppercase;
    text-align: center;
    color: #ffffff;
    margin-bottom: 48px;
  }
`;

export const MenuButtonLink = styled(Link)`
  padding: 16px 24px;
  text-decoration: none;
  background: #4E62C0;
  border-radius: 150px;
  color: #ffffff;
  font-size: 22px;
  font-weight: medium;
  cursor: pointer;
  transition: .2s ease-out;
  min-width: 320px;

  &:hover {
    box-shadow: 0 0 12px #4E62C0;
  }
`

export const MenuButton = styled.button`
  padding: 16px 24px;
  text-decoration: none;
  background: #4E62C0;
  border-radius: 150px;
  color: #ffffff;
  font-size: 22px;
  font-weight: medium;
  cursor: pointer;
  transition: .2s ease-out;
  min-width: 320px;

  &:hover {
    box-shadow: 0 0 12px #4E62C0;
  }
`

export const TransactionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 350px;
  align-items: center;
  padding: 16px;
  background-color: #141B41;
  gap: 16px;

  button {
    width: 100%;
    margin-top: 24px;
  }
`;

export const TransactionsItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;

  input,
  select {
    border-radius: 40px;
    height: 40px;
    padding: 0 16px;
    height: 40px;
    border: 1px solid #4E62C0;
    outline: 0;
    transition: .2s ease-out;

    &:focus {
      box-shadow: 0 0 12px #4e62c0;
    }
  }
`;

export const TransactionsLabel = styled.span`
  color: #ffffff;
  font-size: 18px;
`;

export const TransactionInfo = styled.div`
  margin-top: 32px;
  color: #ffffff;
  font-size: 24px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  gap: 4px;
`;

export const DashboardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: flex-start;
  flex: 1 2 0;
`

export const DashboardLeftMenu = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: self-start;
  justify-content: start;
  gap: 16px;
`

export const DashboardRightMenu = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: self-start;
  justify-content: start;
  background-color: #141B41;
  border-radius: 24px;
  padding: 24px;
  color: #ffffff;

  & > div {
    width: 100%;
  }

  table {
    width: 100%;
  }

  th {
    text-align: left;
    padding: 8px 0;
  }

  td {
    padding: 8px 0;
  }

  img {
    max-width:32px;
  }
`

export const DashboardButton = styled.button`
  padding: 8px 16px;
  text-decoration: none;
  background: #4E62C0;
  border-radius: 150px;
  color: #ffffff;
  font-size: 22px;
  font-weight: medium;
  cursor: pointer;
  transition: .2s ease-out;
  min-width: 180px;

  &:hover {
    box-shadow: 0 0 12px #4E62C0;
  }
`

export const DevicesWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #ffffff;

  &:last-child {
    border-bottom: 0;
  }

  & > div {
    display: flex;
    padding: 16px 0;
    width: 33.33%;
  }
`;

export const Tags = styled.div`
  display: flex;
  background-color: grey;
  padding: 8px;
  border-radius: 25px;
  margin-left: 4px;
`

export const Logo = styled.div`
  max-width: 120px;
  display: flex;
  margin-right: 24px;

  img {
    max-width: 100%;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
`;

export const AuthBody = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  z-index: 1100;
  width: 100%;
  max-width: 370px;
  border-radius: 25px;
  padding: 20px 25px;
  box-shadow: 0 0 24px rgba(255, 255, 255, 0.5);
`;

export const ModalDiv = styled.div``;

export const ModalHeader = styled.div`
  font-size: 24px;
  text-align: center;
  margin-bottom: 24px;
`;

export const CloseModal = styled.div``;

export const ModalForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  input,
  select {
    border-radius: 40px;
    height: 40px;
    padding: 0 16px;
    height: 40px;
    border: 1px solid #4E62C0;
    outline: 0;
    transition: .2s ease-out;

    &:focus {
      box-shadow: 0 0 12px #4e62c0;
    }    
  }

  & > label {
    border-color: #4E62C0;
    height: 40px;
    max-width: 100%;

    svg {
      margin-right: 8px;
    }
  }
`;

export const AuthButton = styled.button`
  padding: 8px 16px;
  text-decoration: none;
  background: #4E62C0;
  border-radius: 150px;
  color: #ffffff;
  font-size: 18px;
  font-weight: medium;
  cursor: pointer;
  transition: .2s ease-out;
  min-width: 180px;

  &:hover {
    box-shadow: 0 0 12px #4E62C0;
  }
`;

export const PassButton = styled.button`
  padding: 4px 8px;
  text-decoration: none;
  background: #4E62C0;
  border-radius: 150px;
  color: #ffffff;
  font-size: 11px;
  font-weight: medium;
  cursor: pointer;
  transition: .2s ease-out;
  min-width: 100px;

  &:hover {
    box-shadow: 0 0 12px #4E62C0;
  }
`;

export const ProfileWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 120px 0;
  max-width: 1200px;
  width: 100%;
`;

export const Title = styled.h1`
  color: #ffffff;
  font-size: 36px;
  line-height: 44px;
  margin-bottom: 24px;
  color: #ffffff;
  letter-spacing: 4px;
  width: 100%;
  text-align: center;
`;

export const ProfileInfo = styled.div`
  border-radius: 24px;
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 24px;
  margin-right: 48px;
  flex-shrink: 0;
`;

export const ProfileAvatar = styled.div`
  width: 140px;
  height: 140px;
  margin-bottom: 32px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const ProfileName = styled.div`
  font-size: 24px;
  color: #000000;
  font-weight: bold;
`;

export const ProfileList = styled.ul`
  flex-grow: 1;
  border-radius: 24px;
  padding: 24px;
  background-color: #141B41;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ProfileListItem = styled.li`
  font-size: 18px;
  color: #ffffff;
`;

export const ProfileCell = styled.div`
  display: flex;
  justify-content: center;
`;

export const ProfileUnverified = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -16px;
  border-radius: 12px;
  background-color: #f71d1d;
  color: #ffffff;
  padding: 4px 8px;
  font-weight: 600;
`;

export const ProfileVerifyPending = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -16px;
  border-radius: 12px;
  background-color: #f7ec1d;
  color: #ffffff;
  padding: 4px 8px;
  font-weight: 600;
`;


export const ProfileVerified = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -16px;
  border-radius: 12px;
  background-color: #31ca31;
  color: #ffffff;
  padding: 4px 8px;
  font-weight: 600;
`;



