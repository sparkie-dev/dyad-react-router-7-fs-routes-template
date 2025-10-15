"use client"

import * as React from "react"
import {
  Area,
  Bar,
  Cell,
  Line,
  Pie,
  RadialBar,
  Scatter,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  type TooltipProps as RechartsTooltipProps,
  type LegendProps as RechartsLegendProps,
} from "recharts"

import { cn } from "@/utils/cn"
import { ChartContext, useChart, type ChartConfig } from "./chart.context"

// #region Chart Style
const ChartStyle = ({ id, css }: { id: string; css: string }) => {
  return <style dangerouslySetInnerHTML={{ __html: `[data-chart=${id}] { ${css} }` }} />
}
// #endregion

// #region Chart Container
const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ReactNode
  }
>(({ config, children, className, ...props }, ref) => {
  const chartId = React.useId()
  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn("flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line]:stroke-border/50 [&_.recharts-curve]:stroke-primary [&_.recharts-dot_icon]:fill-primary [&_.recharts-label_text]:fill-foreground [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-reference-line_line]:stroke-border [&_.recharts-sector_path]:fill-primary [&_.recharts-sector]:stroke-border [&_.recharts-surface]:outline-none", className)}
        {...props}
      >
        <ResponsiveContainer width="100%" height="100%">
          {children as React.ReactElement}
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"
// #endregion

// #region Chart Tooltip
const ChartTooltip = RechartsTooltip;

type ChartTooltipContentProps = React.ComponentProps<'div'> & {
  active?: boolean
  payload?: any[]
  label?: string
};

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  ChartTooltipContentProps
>(({ active, payload, className, label }, ref) => {
  const { config } = useChart()

  if (!active || !payload || payload.length === 0) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn(
        "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
    >
      <div className="font-medium">{label}</div>
      <div className="grid gap-1.5">
        {payload.map((item, i) => {
          const key = `${item.dataKey}`
          const itemConfig = config[key]
          const { color, name } = item

          return (
            <div
              key={i}
              className="flex items-center gap-2 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
            >
              {itemConfig?.icon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{ backgroundColor: color }}
                />
              )}
              <div className="flex flex-1 justify-between leading-none">
                <p className="text-muted-foreground">{itemConfig?.label || name}</p>
                <p className="font-medium">{item.value}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"
// #endregion

// #region Chart Legend
const ChartLegend = RechartsLegend;

type ChartLegendContentProps = React.ComponentProps<'div'> & { payload?: any[] };

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  ChartLegendContentProps
>(({ payload, className }, ref) => {
  const { config } = useChart()

  if (!payload || !payload.length) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-center gap-4", className)}
    >
      {payload.map((item) => {
        const key = `${item.dataKey}`
        const itemConfig = config[key]

        return (
          <div
            key={item.value}
            className={cn(
              "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
            )}
          >
            {itemConfig?.icon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{ backgroundColor: item.color }}
              />
            )}
            {itemConfig?.label}
          </div>
        )
      })}
    </div>
  )
})
ChartLegendContent.displayName = "ChartLegendContent"
// #endregion

// #region Higher Order Components
const ChartArea = React.forwardRef<
  React.ElementRef<typeof Area>,
  React.ComponentProps<typeof Area> & { color?: string; name?: string }
>(({ color, name, ...props }, ref) => {
  const { config } = useChart();
  const colorValue = color || (name && config[name]?.color) || 'var(--color-area)';

  return (
    <Area
      {...props}
      fill={colorValue}
      stroke={colorValue}
    />
  );
});
ChartArea.displayName = 'ChartArea';

const ChartBar = React.forwardRef<
  React.ElementRef<typeof Bar>,
  React.ComponentProps<typeof Bar> & { color?: string; name?: string }
>(({ color, name, ...props }, ref) => {
  const { config } = useChart();
  const colorValue = color || (name && config[name]?.color) || 'var(--color-bar)';

  return (
    <Bar
      {...props}
      fill={colorValue}
      stroke={colorValue}
    />
  );
});
ChartBar.displayName = 'ChartBar';

const ChartLine = React.forwardRef<
  React.ElementRef<typeof Line>,
  React.ComponentProps<typeof Line> & { color?: string; name?: string }
>(({ color, name, ...props }, ref) => {
  const { config } = useChart();
  const colorValue = color || (name && config[name]?.color) || 'var(--color-line)';

  return (
    <Line
      {...props}
      stroke={colorValue}
    />
  );
});
ChartLine.displayName = 'ChartLine';

const ChartPie = React.forwardRef<
  React.ElementRef<typeof Pie>,
  React.ComponentProps<typeof Pie> & { color?: string; name?: string }
>(({ color, name, ...props }, ref) => {
  const { config } = useChart();
  const colorValue = color || (name && config[name]?.color) || 'var(--color-pie)';

  return (
    <Pie
      {...props}
      fill={colorValue}
      stroke={colorValue}
    />
  );
});
ChartPie.displayName = 'ChartPie';

const ChartRadialBar = React.forwardRef<
  React.ElementRef<typeof RadialBar>,
  React.ComponentProps<typeof RadialBar> & { color?: string; name?: string }
>(({ color, name, ...props }, ref) => {
  const { config } = useChart();
  const colorValue = color || (name && config[name]?.color) || 'var(--color-radial)';

  return (
    <RadialBar
      {...props}
      fill={colorValue}
      stroke={colorValue}
    />
  );
});
ChartRadialBar.displayName = 'ChartRadialBar';

const ChartScatter = React.forwardRef<
  React.ElementRef<typeof Scatter>,
  React.ComponentProps<typeof Scatter> & { color?: string; name?: string }
>(({ color, name, ...props }, ref) => {
  const { config } = useChart();
  const colorValue = color || (name && config[name]?.color) || 'var(--color-scatter)';

  return (
    <Scatter
      {...props}
      fill={colorValue}
      stroke={colorValue}
    />
  );
});
ChartScatter.displayName = 'ChartScatter';
// #endregion

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartArea,
  ChartBar,
  ChartLine,
  ChartPie,
  ChartRadialBar,
  ChartScatter,
  Cell,
}