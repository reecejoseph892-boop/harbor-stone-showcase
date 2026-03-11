import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export const PriceSlider = () => {
    const [value, setValue] = useState(750000);
    const min = 300000;
    const max = 2000000;

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(val);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(parseInt(e.target.value));
    };

    return (
        <div className="w-full max-w-md mx-auto p-4 sm:p-6 bg-card rounded-xl border border-border shadow-lg">

            <div className="text-center mb-6">
                <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-1">Estimated Value</p>
                <motion.h2
                    className="font-heading text-3xl font-bold text-primary"
                    key={value}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {formatCurrency(value)}
                </motion.h2>
            </div>

            <div className="relative h-12 flex items-center">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={10000}
                    value={value}
                    onChange={handleChange}
                    className="absolute w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-gold"
                />
                <div
                    className="absolute h-1.5 bg-gold rounded-lg pointer-events-none"
                    style={{ width: `${((value - min) / (max - min)) * 100}%` }}
                />
            </div>

            <div className="flex justify-between mt-2 text-xs text-muted-foreground font-medium">
                <span>{formatCurrency(min)}</span>
                <span>{formatCurrency(max)}</span>
            </div>

            <p className="mt-6 text-center text-xs text-muted-foreground italic">
                *Based on recent comparable sales in your area.
            </p>
        </div>
    );
};
