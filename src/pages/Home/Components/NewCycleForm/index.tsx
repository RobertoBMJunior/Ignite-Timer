import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1,'Informe a Tarefa'),
    minutesAmount: zod.number().min(1, 'O intervalo deve ser maior que 5 minutos').max(60, 'O intervalo deve ser menor que 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function NewCycleForm () {
    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task:'',
            minutesAmount: 0,
        }
    })


    return (
        <FormContainer>
        <label htmlFor="task">Vou trabalhar em</label>
        <TaskInput 
            id="task" 
            list="task-suggestions" 
            type="text" 
            placeholder='Dê um nome para o seu projeto'
            disabled={!!activeCycle}
            {...register('task')}
        />

        <datalist id="task-suggestions">
            <option value="Projeto 1"/>
            <option value="Projeto 2"/>
            <option value="Projeto 3"/>
            <option value="Projeto 4"/>


        </datalist>

        <label htmlFor="minutesAmount">Durante</label>
        <MinutesAmountInput 
            id="minutesAmount" 
            type="number" 
            placeholder='00' 
            step={5} 
            min={1} 
            max={60}
            disabled={!!activeCycle}
            {...register('minutesAmount', {valueAsNumber:true})}
        />

        <span>minutos.</span>
    </FormContainer>
    )
}