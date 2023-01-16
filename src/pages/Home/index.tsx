import { Play } from "phosphor-react";
import { useState } from "react";
import { ButtonCountdownStart, CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, TaskInput } from "./styles";

import { useForm } from 'react-hook-form'

export function Home() {

  const { register, handleSubmit, watch } = useForm()  

  function handleCreateNewCycle(data: any) {
    console.log(data)
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="text">Vou trabalhar em</label>
          <TaskInput 
            id="text" 
            placeholder="Dê um nome para o seu projeto" 
            list="taskSuggestion"
            {...register('task')}
          />

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
            {...register('minutesAmount', { valueAsNumber: true })}
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

        <ButtonCountdownStart type="submit" disabled={isSubmitDisabled} >
          <Play />Começar
        </ButtonCountdownStart>
      </form>
    </HomeContainer>
  )
}
