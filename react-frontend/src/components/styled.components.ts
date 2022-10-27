import styled from "styled-components";
import { Link } from "react-router-dom";


export const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 1200px;
  height: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

export const DivFlexBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;
  padding: 10px;
  margin: 0 auto;
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
  margin-left: 25px;
  padding: 25px;
  text-decoration: none;
  background: radial-gradient(circle, hsla(120, 88%, 73%, 1) 17%, hsla(159, 55%, 44%, 1) 75%);
  box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.6);
  border-radius: 150px;
`

export const MenuButton = styled.button`
  margin-left: 25px;
  padding: 25px;
  text-decoration: none;
  background: radial-gradient(circle, hsla(120, 88%, 73%, 1) 17%, hsla(159, 55%, 44%, 1) 75%);
  box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.6);
  border-radius: 150px;
`
