import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import {  ImageIcon, ScanSearch, Upload } from "lucide-react";
import { useExtractRooms } from '../../../app/(root)/dashboard/hooks/useDashboard';
import { useStoreRooms } from '@/zustand/useStoreRooms';
import { Room } from '@/types/type';

export const ExtractImageFrom = () => {
  const { rooms , setRooms} = useStoreRooms()
  const {mutate , data , isPending} = useExtractRooms();
  const [image , setImage] = useState<File | null>()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const fd = new FormData(e.currentTarget);

      mutate(fd);


  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  useEffect(() => {
    if (data) {
      setRooms(data?.rooms as Room[]);
    }
  } , [data , setRooms])

  return (
    <div className=" h-full flex justify-center flex-col gap-8 w-[35%] border-r py-3 px-6">
      <div className=" flex flex-col gap-3">
        <h1 className="text-xl font-bold text-center">👋 Hey, <span className=" text-primary">Yuvi dew</span></h1>
        <p className="text-center text-sm">
          Upload your dream home floor-plan image
        </p>
      </div>

      <form onSubmit={onSubmit} className=" flex flex-col gap-3">
        <input onChange={onFileChange} id="uploader" className=" hidden" name="blueprint" type="file" accept="image/*,.pdf" />
        <label htmlFor="uploader" className="border cursor-pointer rounded-md h-44 bg-sidebar-accent ">
          {image ? <div className="h-full flex flex-col items-center justify-center">
            <ImageIcon className=" text-primary size-8" />
            <p className='text-center text-sm truncate w-[40%]'>{image.name}</p>
          </div> : (
          <div className="h-full flex flex-col items-center justify-center">
            <Upload className=" text-primary size-8" />
            <p>Upload</p>
          </div>
          )}
        </label>

        <Button 
          className="w-full"
          disabled = {!image && rooms.length !== 0}
        >
          <ScanSearch /> {!isPending ? "Extract rooms" : "Analysis a floor plan..."}
        </Button>

      </form>
    </div>
  )
}
