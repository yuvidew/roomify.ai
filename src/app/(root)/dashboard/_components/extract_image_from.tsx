import React from 'react'
import { Button } from "@/components/ui/button";
import { ScanSearch, Upload } from "lucide-react";

export const ExtractImageFrom = () => {
  return (
    <div className=" h-full flex justify-center flex-col gap-8 w-[34rem] border-r py-3 px-6">
      <div className=" flex flex-col gap-3">
        <h1 className="text-xl font-bold text-center">👋 Hey, <span className=" text-primary">Yuvi dew</span></h1>
        <p className="text-center text-sm">
          Upload your dream home floor-plan image
        </p>
      </div>

      <div className=" flex flex-col gap-3">
        <input id="uploader" className=" hidden" name="blueprint" type="file" accept="image/*,.pdf" />
        <label htmlFor="uploader" className="border cursor-pointer rounded-md h-44 bg-sidebar-accent ">
          <div className="h-full flex flex-col items-center justify-center">
            <Upload className=" text-primary size-8" />
            <p>Upload</p>
          </div>
        </label>

        <Button className="w-full">
          <ScanSearch /> Extract rooms
        </Button>

      </div>
    </div>
  )
}
