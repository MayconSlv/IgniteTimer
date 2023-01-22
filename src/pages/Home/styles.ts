import styled from "styled-components"

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    font-size: 1.8rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 5.6rem;
  }
  
`

export const Separator = styled.div`
  padding: 3.2rem 0;
  color: ${(props) => props.theme['green-500']};

  width: 6.4rem;
  overflow: hidden;

  display: flex;
  justify-content: center;
`

export const BaseCountdownButton = styled.button`
  width: 100%;
  padding: 1.7rem;

  border-radius: 8px;
  border: none;

  display: flex;
  justify-content: center;
  gap: .8rem;

  color: ${(props) => props.theme['gray-100']};
  
  cursor: pointer;
  transition: .2s;
`

export const ButtonCountdownStart = styled(BaseCountdownButton)`
  background-color: ${(props) => props.theme['green-500']};

  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-300']};
  }

  &:disabled {
    background: ${(props) => props.theme['green-700']};
    cursor: not-allowed;
  }
`

export const StopCountdownButton = styled(BaseCountdownButton)`
  background-color: ${(props) => props.theme['red-500']};

  &:hover {
    background: ${(props) => props.theme['red-700']};
  }
`