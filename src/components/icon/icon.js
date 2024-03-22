import { styled } from "styled-components";

const IconContainer = ({ className, id, ...prop }) => (
  <div className={className} {...prop}>
    <i class={`fa ${id}`} aria-hidden="true"></i>
  </div>
);

export const Icon = styled(IconContainer)`
  font-size: ${({ size = "24px" }) => size};
  margin: ${({ margin = "0" }) => margin};
`;
