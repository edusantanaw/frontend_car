import styled from "styled-components";

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2em;
`;

const ListItem = styled.li`
  width: 100%;
  list-style: none;
  width: 100%;
  border: 1px solid #c3c3c3;
  padding: 2em 3em;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 0px 1px 1px #ee0571;
`;


export { List, ListItem };
