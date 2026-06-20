import type { ReactNode } from "react"

export enum ROUTES {
    MAIN = '/',
}
export type routerConfigType = {
    path: string,
    element: ReactNode
}