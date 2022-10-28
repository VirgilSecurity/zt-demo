import styled from "styled-components";

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
  display: fle;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  gap: 4px;
`;
