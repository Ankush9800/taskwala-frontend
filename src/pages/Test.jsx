import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import React, { useState } from 'react'

function Test() {
    const [date, setDate] = useState(null)
    const newDate = new Date(date?.from)
    console.log(newDate.toISOString())
  return (
    <div>
        <Popover>
            <PopoverTrigger>
                <Button>Choose</Button>
            </PopoverTrigger>
            <PopoverContent>
                <Calendar mode='range' selected={date} onSelect={setDate}/>
            </PopoverContent>
        </Popover>
    </div>
  )
}

export default Test