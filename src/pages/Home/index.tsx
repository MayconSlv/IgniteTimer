import { HandPalm, Play } from "phosphor-react";
import { useContext} from "react";
import {
  ButtonCountdownStart,
  HomeContainer,
  StopCountdownButton,
} from "./styles";

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { NewCycleForm } from "./Components/Countdown/NewCycleForm";
import { Countdown } from "./Components/Countdown";
import { CyclesContext } from "../../contexts/CyclesContext";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount:
    zod.number()
      .min(5, 'O tempo de intervalo precisa de 5 mínutos no mínimo.')
      .max(60, 'O tempo de intervalo precisa ser de 60 mínutos no máximo.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { createNewCycle, interruptCurrentCycle, activeCycle } = 
    useContext(CyclesContext)  

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  const { handleSubmit, watch, /*reset*/ } = newCycleForm

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(createNewCycle)}>
        
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        { activeCycle ? (
          <StopCountdownButton type="button" onClick={interruptCurrentCycle} >
            <HandPalm />Interromper
        </StopCountdownButton>
        ) : (
          <ButtonCountdownStart type="submit" disabled={isSubmitDisabled} >
            <Play />Começar
          </ButtonCountdownStart>
        )}
      </form>
    </HomeContainer>
  )
}
