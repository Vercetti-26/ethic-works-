"use client";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X } from "lucide-react";

const multiStepFormVariants = cva(
  "flex flex-col bg-neutral-950/80 border border-neutral-900 rounded-2xl text-white shadow-2xl backdrop-blur-md",
  {
    variants: {
      size: {
        default: "md:w-[700px] w-full",
        sm: "md:w-[550px] w-full",
        lg: "md:w-[850px] w-full",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface MultiStepFormProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof multiStepFormVariants> {
  currentStep: number;
  totalSteps: number;
  title: string;
  description: string;
  onBack: () => void;
  onNext: () => void;
  onClose?: () => void;
  backButtonText?: string;
  nextButtonText?: string;
  footerContent?: React.ReactNode;
}

const MultiStepForm = React.forwardRef<HTMLDivElement, MultiStepFormProps>(
  ({
    className,
    size,
    currentStep,
    totalSteps,
    title,
    description,
    onBack,
    onNext,
    onClose,
    backButtonText = "Back",
    nextButtonText = "Next Step",
    footerContent,
    children,
    ...props
  }, ref) => {
    const progress = Math.round((currentStep / totalSteps) * 100);

    const variants = {
      hidden: { opacity: 0, x: 50 },
      enter: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -50 },
    };

    return (
      <Card ref={ref} className={cn(multiStepFormVariants({ size }), className)} {...props}>
        <CardHeader className="border-b border-neutral-900/50 pb-6">
          <div className="flex items-start justify-between">
            <CardTitle className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-100 to-neutral-400">{title}</CardTitle>
            {onClose && (
              <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close" className="text-neutral-400 hover:text-white hover:bg-neutral-900/50">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <CardDescription className="text-neutral-400 text-sm mt-1">{description}</CardDescription>
          <div className="flex items-center gap-4 pt-4">
            <Progress value={progress} className="w-full bg-neutral-900 h-2 [&>div]:bg-[#3ca2fa]" />
            <p className="text-xs text-neutral-400 whitespace-nowrap font-mono">
              {currentStep}/{totalSteps} completed
            </p>
          </div>
        </CardHeader>

        <CardContent className="min-h-[300px] overflow-hidden pt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={variants}
              initial="hidden"
              animate="enter"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </CardContent>

        <CardFooter className="flex justify-between border-t border-neutral-900/50 pt-6">
          <div>{footerContent}</div>
          <div className="flex gap-2">
            {currentStep > 1 && (
              <Button variant="outline" onClick={onBack} className="border-neutral-800 text-white hover:bg-neutral-900 hover:text-white">
                {backButtonText}
              </Button>
            )}
            <Button onClick={onNext} className="bg-white text-black hover:bg-neutral-200 font-semibold shadow-lg">
              {nextButtonText}
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }
);

MultiStepForm.displayName = "MultiStepForm";

export { MultiStepForm };
