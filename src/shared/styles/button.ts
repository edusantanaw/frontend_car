import styled from "styled-components";

export const ButtonStyle = styled.button<{ bg?: string; w?: string }>`
  width: ${(p) => p?.w ?? "10em"};
  height: 3.4em;
  font-size: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
  border: none;
  flex-wrap: wrap;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
  color: #fff;
  background: ${(p) => p.bg ?? "#f38508"};
  &:active {
    transform: scale(1.02);
  }

  &:disabled {
    opacity: 0.6;
  }

  &:active:disabled {
    transform: scale(1);
  }
`;
