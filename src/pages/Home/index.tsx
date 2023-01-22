import { HandPalm, Play } from "phosphor-react";
import { useEffect, useState } from "react";
import {
  ButtonCountdownStart,
  HomeContainer,
  StopCountdownButton,
} from "./styles";

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { differenceInSeconds } from 'date-fns'
import { NewCycleForm } from "./Components/Countdown/NewCycleForm";
import { Countdown } from "./Components/Countdown";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount:
    zod.number()
      .min(1, 'O tempo de intervalo precisa de 5 mínutos no mínimo.')
      .max(60, 'O tempo de intervalo precisa ser de 60 mínutos no máximo.'),
})

// interface NewCycleFormData {
//   task: string
//   minutesAmount: number
// }

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)


  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0



  useEffect(() => {
    let interval: number;

    if(activeCycle) {
      interval = setInterval(() => {
          const secondsDifference = differenceInSeconds(
            new Date(), 
            activeCycle.startDate,
          )

          if(secondsDifference >= totalSeconds) {
            setCycles((state) => 
              state.map((cycle) => {
                if(cycle.id === activeCycleId) {
                  return {...cycle, finishedDate: new Date()}
                } else {
                  return cycle
                }
              })
            )

            setAmountSecondsPassed(totalSeconds)
            clearInterval(interval)
          } else {
            setAmountSecondsPassed(secondsDifference)
          }

      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle])

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id: id,
      minutesAmount: data.minutesAmount,
      task: data.task,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])

    setAmountSecondsPassed(0)
    setActiveCycleId(id)

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


  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if(activeCycle) {
      document.title = `${minutes}:${seconds}` 
    }
  }, [minutes, seconds, activeCycle])


  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>

        <NewCycleForm />
        <Countdown />

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
