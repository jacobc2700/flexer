import {
    Box,
    Paper,
    TypographyProps,
} from '@mui/material';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';

/**
 * Higher Order Component
 *
 * Converts a custom component to a motion component using "motion(Component)"
 *
 * https://v4.mui.com/guides/typescript/
 */
const MotionBuilder = <H extends HTMLElement, C extends React.ElementType>(
    Component: React.ElementType,
    displayName: string
) => {
    const c = forwardRef<H, TypographyProps<C, { component?: C }>>(
        ({ children, ...rest }, ref) => (
            <Component {...rest} ref={ref}>
                {children}
            </Component>
        )
    );
    c.displayName = displayName;

    return motion(c);
};

// MUI components that have motion added.
export const AnimatableBox = MotionBuilder<HTMLDivElement, typeof Box>(
    Box,
    'AnimatableBox'
);

export const AnimatablePaper = MotionBuilder<HTMLDivElement, typeof Paper>(
    Paper,
    'AnimatablePaper'
);

export default MotionBuilder;
