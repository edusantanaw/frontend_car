import { IconType } from "react-icons";
import { ButtonStyle } from "../styles/button";

interface props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  Icon?: IconType;
  action: () => void;
  background?: string;
  width?: string;
}

export const Button = ({
  title,
  action,
  Icon,
  background,
  width,
  ...rest
}: props) => {
  return (
    <ButtonStyle {...rest} w={width} bg={background} onClick={action}>
      {title}
      {Icon && <Icon />}
    </ButtonStyle>
  );
};
