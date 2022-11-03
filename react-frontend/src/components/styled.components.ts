import styled from "styled-components";
import { Link } from "react-router-dom";


export const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 1200px;
  min-height: calc(100vh - 69px);
  display: flex;
  flex-direction: column;
  align-items: center;
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
  padding: 16px 24px;
  text-decoration: none;
  background: #4E62C0;
  border-radius: 150px;
  color: #ffffff;
  font-size: 22px;
  cursor: pointer;
  transition: .2s ease-out;

  &:hover {
    box-shadow: 0 0 12px #4E62C0;
  }

  &:last-child {
    margin-left: auto;
  }
`

export const MenuButtonHeader = styled.button`
  padding: 16px 24px;
  text-decoration: none;
  background: #4E62C0;
  border-radius: 150px;
  color: #ffffff;
  font-size: 22px;
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
  align-items: center;
  flex: 1 2 0;
`

export const DashboardLeftMenu = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: self-start;
  justify-content: start;
`

export const DashboardRightMenu = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: self-start;
  justify-content: start;
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
  margin-top: 24px;

  &:hover {
    box-shadow: 0 0 12px #4E62C0;
  }
`
