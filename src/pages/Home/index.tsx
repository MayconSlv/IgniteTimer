import { Play } from "phosphor-react";
import { ButtonCountdownStart, CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, TaskInput } from "./styles";

export function Home() {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="text">Vou trabalhar em</label>
          <TaskInput id="text"placeholder="Dê um nome para o seu projeto" list="taskSuggestion" />

          <datalist id="taskSuggestion">
            <option value="Projeto 1"/>
            <option value="Projeto 2"/>
            <option value="Projeto 3"/>
            <option value="Projeto 4"/>
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput 
            type="number" 
            id="minutesAmount" 
            placeholder="00" 
            step={5}
            max={60}
            min={5}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <ButtonCountdownStart type="submit" disabled>
          <Play />Começar
        </ButtonCountdownStart>
      </form>
    </HomeContainer>
  )
}
