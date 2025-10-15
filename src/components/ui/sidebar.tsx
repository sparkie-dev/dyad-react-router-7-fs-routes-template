"use client"

import * as React from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/utils/cn"
import { Button } from "@/components/ui/button"

const sidebarVariants = cva(
  "absolute top-0 z-40 flex h-screen flex-col bg-background transition-all duration-300 ease-in-out",
  {
    variants: {
      state: {
        closed: "w-16",
        open: "w-64",
      },
    },
    defaultVariants: {
      state: "open",
    },
  }
)

interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {
  onStateChange?: (state: "open" | "closed") => void
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, state, onStateChange, ...props }, ref) => {
    const isMobile = useIsMobile()
    const [internalState, setInternalState] = React.useState<"open" | "closed">(
      isMobile ? "closed" : "open"
    )

    const currentState = state ?? internalState
    const setCurrentState = onStateChange ?? setInternalState

    React.useEffect(() => {
      setCurrentState(isMobile ? "closed" : "open")
    }, [isMobile, setCurrentState])

    return (
      <div
        ref={ref}
        className={cn(sidebarVariants({ state: currentState }), className)}
        {...props}
      >
        <div className="flex h-full flex-col">
          <div className="flex-1">{props.children}</div>
          <div className="p-4">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() =>
                setCurrentState(currentState === "open" ? "closed" : "open")
              }
            >
              {currentState === "open" ? (
                <ChevronLeft className="mr-2 h-4 w-4" />
              ) : (
                <ChevronRight className="mr-2 h-4 w-4" />
              )}
              <span
                className={cn(
                  "transition-opacity",
                  currentState === "closed" && "opacity-0"
                )}
              >
                Collapse
              </span>
            </Button>
          </div>
        </div>
      </div>
    )
  }
)
Sidebar.displayName = "Sidebar"

export { Sidebar }