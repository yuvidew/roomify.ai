"use client"
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'
import { ScanSearch } from 'lucide-react';
import React, { useState } from 'react'


export const ExtractRoomsForm = () => {
  const [value , setValue] = useState("");

  // TODO : submit the prompt with extract rooms array

  return (

    <div className=' flex flex-col gap-2'>
      <Label className=' mb-2 text-lg'>
        Describe your desired room styles
      </Label>
      <Textarea
        className=' h-64 resize-none'
        placeholder='e.g., Modern bedroom with warm tones and wood accents'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <Button className=' mt-3'>
        <ScanSearch />
        Generate room styles
      </Button>
    </div>
  )
}
