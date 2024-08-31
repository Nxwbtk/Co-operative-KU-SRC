'use client'

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { CreateEditOneDialog } from "./create-btn"
import { PencilIcon } from "lucide-react"
import { TOutStandingData } from "../types"

export type TEditBtnOStdprops = {
  data: TOutStandingData;
}

export const EditBtn = (props: TEditBtnOStdprops) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  return (
    <>
    <Button size="icon" variant="outline" onClick={() => setOpen(!open)}><PencilIcon size={16} /></Button>
    <CreateEditOneDialog open={open} setOpen={setOpen} isEdit editData={data} />
    </>
  )
}