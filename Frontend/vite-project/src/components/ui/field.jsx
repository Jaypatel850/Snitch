import React from 'react'

import { Label } from '@/components/ui/label'

function Field({ label, icon: Icon, htmlFor, children }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 px-0.5">
        {Icon ? <Icon className="h-3.5 w-3.5 text-emerald-400/80" /> : null}
        <Label htmlFor={htmlFor} className="text-xs font-medium tracking-wide text-white/60">
          {label}
        </Label>
      </div>
      {children}
    </div>
  )
}

export { Field }