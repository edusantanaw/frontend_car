import styled from "styled-components";

const FormStyle = styled.div`
  width: 30em;
  min-height: 32em;
  align-self: center;
  margin-inline: auto;
  background-color: #262627;
  padding: 2em 2em;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 2px 2px 5px 1px #686869be;
  select {
    width: 100%;
    padding: 1em;
  }

  #error {
    color: #e40c0c;
  }
`;

const Cars = styled.ul`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  gap: 1.5em;
  width: 100%;
`;


const CarItemStyle = styled.li`
  border: 1px solid #c3c3c3;
  list-style: none;
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  font-weight: 300;
  font-size: 0.9em;
  border-radius: 10px;
  box-shadow: 0px 0px 2px 1px #ee0571;
  position: relative;
  span {
    color: #ee0571;
    font-weight: 500;
    font-size: 1.1em;
  }

  .action {
    position: absolute;
    right: 1em;
    display: flex;
    gap: 0.5em;
  }
  .icon {
    font-size: 1.05em;
    cursor: pointer;
  }
`;


export {
    FormStyle,
    Cars,
    CarItemStyle
}