import styled from "styled-components";

export const LayoutContainer = styled.div`
  max-width: 112rem;
  height: calc(100vh - 8rem);

  margin: 4rem auto;
  padding: 4rem;

  background: ${(props => props.theme['gray-800'])};
  border-radius: 8px;

  display: flex;
  flex-direction: column;
`