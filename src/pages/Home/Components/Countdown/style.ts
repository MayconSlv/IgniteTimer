import styled from "styled-components"

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