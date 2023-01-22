import { FormContainer, MinutesAmountInput,  } from "../style"

export function NewCycleForm() {
  return (
    <FormContainer>
          <label htmlFor="text">Vou trabalhar em</label>
          <TaskInput
            id="text"
            placeholder="Dê um nome para o seu projeto"
            list="taskSuggestion"
            disabled={!!activeCycle}
            {...register('task')}
          />

          <datalist id="taskSuggestion">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={1}
            max={60}
            min={1}
            disabled={!!activeCycle}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>
  )
}