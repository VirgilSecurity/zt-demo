import styled from "styled-components";
import { Link } from "react-router-dom";

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
  margin-bottom: 24px;

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