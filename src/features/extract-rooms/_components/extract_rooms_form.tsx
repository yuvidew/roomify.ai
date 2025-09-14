"use client"
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'
import { Room } from '@/types/type';
import { ScanSearch } from 'lucide-react';
import React, { useState } from 'react'
import { useGenerateImages } from '../api/use-generate-image';
import Spinner from '@/components/Spinner';

interface Props {
  rooms: Room[]
  extract_room_id: string
}

export const ExtractRoomsForm = ({ rooms, extract_room_id }: Props) => {
  const { mutate, isPending } = useGenerateImages();
  const [value, setValue] = useState("");

  const onSubmit = () => {
    mutate({
      form: {
        rooms: JSON.stringify(rooms),
        extract_room_id,
        prompt: value
      }
    })
  }

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

      <Button
        disabled={isPending}
        className=' mt-3'
        onClick={onSubmit}
      >
        {isPending ? (
          <>
            <Spinner color="default"/>
            Generating rooms images...
          </>
        ) : (<>
          <ScanSearch />
          Generate room styles
        </>)}
      </Button>
    </div>
  )
}
