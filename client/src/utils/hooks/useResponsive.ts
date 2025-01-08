import { useEffect, useState } from "react"
import tailwindConfig from '../../../tailwind.config'

interface ResponsiveState {
    width: number;
    smaller: IScreen;
    larger: IScreen;
}

interface IScreen {
    xs?: boolean,
    sm?: boolean,
    md?: boolean,
    lg?: boolean,
    xl?: boolean,
    '2xl'?: boolean,
}

const breakpointInt = (str = '') => {
    return parseInt(str.replace('px', ''))
}

const useResponsive = () => {

    const [responsive, setResponsive] = useState<ResponsiveState>({ width: window.innerWidth, smaller: {}, larger: {} })

    const resizeHandler = () => {
        const responsive = getResponsiveState();
        setResponsive(responsive);
    }

    const getAllSizes = (comparator = 'smaller') => {
        const currentWindowWidth = window.innerWidth;

        return Object.fromEntries(
            Object.entries(tailwindConfig.theme.screens).map(([key, value]): [string, boolean] => [
                key,
                comparator === 'larger' ? currentWindowWidth > breakpointInt(value as string) : currentWindowWidth < breakpointInt(value as string)
            ])
        )
    }

    const getResponsiveState = () => {
        const currentWindowWidth = window.innerWidth;
        return {
            width: currentWindowWidth,
            smaller: getAllSizes('smaller'),
            larger: getAllSizes('larger')
        }
    }

    useEffect(() => {

        window.addEventListener('resize', resizeHandler);

        return () => window.removeEventListener('resize', resizeHandler);

    }, [responsive.width])

    return responsive
}

export default useResponsive