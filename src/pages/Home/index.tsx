import {HandPalm, Play} from 'phosphor-react' 
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {differenceInSeconds} from 'date-fns'

import {
        HomeContainer,  
        StartCountDownButton, 
        StopCountDownButton, 
    } from './styles'

import { useEffect, useState } from 'react'
import { NewCycleForm } from './Components/NewCycleForm'
import { Countdown } from './Components/Countdown'



interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptDate?: Date
    finishedDate?: Date 
}

export function Home () {
    const [cycles,setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState< string | null>(null)

    
    
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)    

    function handleCreateNewCycle(data: NewCycleFormData) {
        const id = String(new Date().getTime());

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }
        
        setCycles((state) => [...state, newCycle])
        setActiveCycleId(id)
        SetAmountSecondsPassed(0)
        reset();
    }

    function handleInterruptCycle () {
        setCycles( state =>
            state.map((cycle) => {
                if(cycle.id === activeCycleId) {
                    return {...cycle, interruptDate: new Date()}
                } else {
                    return cycle
                    
                }
            })
        )
            
        setActiveCycleId(null)
    }

   

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60)

    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2,'0')
    const seconds = String(secondsAmount).padStart(2,'0')

    useEffect(() => {
        if(activeCycle) {
            document.title = `Ignite Timer ${minutes}:${seconds}`
        }
    },[minutes,seconds,activeCycle])


    const task = watch('task')
    const isSubmitDisabled = !task;

    console.log(cycles)

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
               
                <NewCycleForm/>
                <Countdown 
                activeCycle={activeCycle} 
                setCycles={setCycles}
                activeCycleId={activeCycleId}
                />

                { activeCycle? (
                    <StopCountDownButton onClick={handleInterruptCycle} type="button">
                        <HandPalm size={24}/>
                        Interromper
                    </StopCountDownButton>
                ) : (
                    <StartCountDownButton disabled={isSubmitDisabled} type="submit">
                        <Play size={24}/>
                        Começar
                    </StartCountDownButton>
                ) }

                
            </form>

        </HomeContainer>
    )
}