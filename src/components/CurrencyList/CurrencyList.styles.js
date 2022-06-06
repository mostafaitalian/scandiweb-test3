import styled from "styled-components"

export const StyledCurrencyList = styled.ul`
  list-style-type: none;
  list-style-position: inside;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4px;
  font-family: Raleway;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 160%;
`

export const CurrencyListItem = styled.li`
  width: 100%;
  margin: auto;
  padding: 0px 10px !important;

  &:hover {
    box-shadow: 1px 0px 20px lightgray;
  }
`
