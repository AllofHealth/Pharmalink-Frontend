import { getChildId } from "@/utils/getChildId"
import { join } from "@/utils/joinClassNames"
import { type ReactElement } from "react"

interface FieldProps {
  className?: string
  id?: string
  children: ReactElement
  label: string | React.ReactNode
  error?: any
  required?: boolean
}

const Field = ({
  id,
  children,
  label,
  error,
  className,
  required,
}: FieldProps) => {
  const fieldId = getChildId(children) || id

  return (
    <div className="relative flex flex-col gap-1">
      <label
        className={join(
          "block text-sm font-semibold text-bca-grey-8",
          className
        )}
        htmlFor={fieldId}
      >
        {label} {required && <span className="text-bca-red-failure8">*</span>}
      </label>
      {children}
      {error && (
        <small className="absolute right-0 top-0 text-xs text-red-500">
          {error}
        </small>
      )}
    </div>
  )
}

export { Field }
