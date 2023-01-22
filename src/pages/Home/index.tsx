import { HandPalm, Play } from "phosphor-react";
import { createContext, useEffect, useState } from "react";
import {
  ButtonCountdownStart,
  HomeContainer,
  StopCountdownButton,
} from "./styles";

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { differenceInSeconds } from 'date-fns'
import { NewCycleForm } from "./Components/Countdown/NewCycleForm";
import { Countdown } from "./Components/Countdown";

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextData {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextData)

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount:
    zod.number()
      .min(5, 'O tempo de intervalo precisa de 5 mínutos no mínimo.')
      .max(60, 'O tempo de intervalo precisa ser de 60 mínutos no máximo.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)


  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) => 
        state.map((cycle) => {
          if(cycle.id === activeCycleId) {
            return {...cycle, finishedDate: new Date()}
          } else {
            return cycle
          }
        })
    )
  }


  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id: id,
      minutesAmount: data.minutesAmount,
      task: data.task,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    reset()
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if(cycle.id === activeCycleId) {
          return {...cycle, interruptedDate: new Date()}
        } else {
          return cycle
        }
      })
    )

    setActiveCycleId(null)
  }

  console.log(cycles)


  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        
        <CyclesContext.Provider 
          value={{ 
            activeCycle, 
            activeCycleId, 
            markCurrentCycleAsFinished, 
            amountSecondsPassed,
            setSecondsPassed
          }}>
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>

        { activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle} >
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
