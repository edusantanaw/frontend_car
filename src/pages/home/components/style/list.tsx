import styled from "styled-components";

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const ListItem = styled.li`
  width: 100%;
  list-style: none;
  width: 100%;
  border: 1px solid #c3c3c3;
  padding: 1em 1.3em;
  border-radius: 4px;
`;

export { List, ListItem };
