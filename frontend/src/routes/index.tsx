import { Songs } from "../pages/songs"
import { ROUTES } from "./types"
import type { routerConfigType } from "./types"



export const routerConfig: routerConfigType[] = [
    {
        path: ROUTES.MAIN,
        element: <Songs></Songs>
    },
    
]