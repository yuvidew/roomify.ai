"use client"
// ExtractRoomsForm: Handles room style prompt input and image generation.
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'
import { Room } from '@/types/type';
import { ScanSearch } from 'lucide-react';
import React, { useState } from 'react'
import { useGenerateImages } from '../api/use-generate-image';
import Spinner from '@/components/Spinner';
import { ParsedFormValue } from 'hono/types';

interface Props {
  rooms: Room[]
  extract_room_id: string
}

/**
 * ExtractRoomsForm component.
 * Handles room style prompt input and image generation.
 *
 * @param rooms - Rooms to generate images for.
 * @param extract_room_id - Identifier for the extract-room operation.
 * @returns JSX element rendering the prompt and action.
 */
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

    <div className=' flex flex-col w-full gap-2'>
      <Label className=' mb-2 text-lg'>
        Describe your desired room styles
      </Label>
      <Textarea
        className=' h-64 w-full resize-none'
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
