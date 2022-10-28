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

export const MenuButtonLink = styled(Link)`
  padding: 8px 16px;
  text-decoration: none;
  background: #4E62C0;
  border-radius: 150px;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  transition: .2s ease-out;

  &:hover {
    box-shadow: 0 0 12px #4E62C0;
  }

  &:last-child {
    margin-left: auto;
  }
`

export const MenuButton = styled.button`
  padding: 8px 16px;
  text-decoration: none;
  background: #4E62C0;
  border-radius: 150px;
  color: #ffffff;
  font-size: 16px;
  margin-left: auto;
  cursor: pointer;
  transition: .2s ease-out;

  &:hover {
    box-shadow: 0 0 12px #4E62C0;
  }
`
