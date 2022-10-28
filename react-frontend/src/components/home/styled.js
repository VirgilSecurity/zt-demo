import styled from "styled-components";
import { Link } from "react-router-dom";

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