import type { ReactNode } from "react"

export enum ROUTES {
    MAIN = '/songs',
}
export type routerConfigType = {
    path: string,
    element: ReactNode
}