import styled from "styled-components";

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

const BaseInput = styled.input`
  background: transparent;
  height: 4rem;

  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};

  font-size: inherit;
  font-weight: bold;

  color: ${(props) => props.theme['gray-100']};
  padding: 0 0.8rem;

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['green-500']}
  }

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinutesAmountInput = styled(BaseInput)`
  width: 5.5rem;
`


export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.8rem;
  color: ${(props) => props.theme['gray-100']};

  font-size: 1.8rem;
  font-weight: bold;
  flex-wrap: wrap;
`

export const CountdownContainer = styled.div`
  font-family: 'Roboto Mono', sans-serif;
  font-size: 16rem;
  line-height: 18.8rem;

  display: flex;
  gap: 1.6rem;

  color: ${(props) => props.theme['gray-100']};

  span {
    background-color: ${(props) => props.theme['gray-700']};
    border-radius: 8px;
    padding: 3.2rem 1.6rem;
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

export const ButtonCountdownStart = styled.button`
  width: 100%;
  padding: 1.7rem;

  border-radius: 8px;
  border: none;

  display: flex;
  justify-content: center;
  gap: .8rem;

  color: ${(props) => props.theme['gray-100']};
  background-color: ${(props) => props.theme['green-500']};
  
  cursor: pointer;
  transition: .2s;


  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-300']};
  }

  &:disabled {
    background: ${(props) => props.theme['green-700']};
    cursor: not-allowed;
  }
`