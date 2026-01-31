"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: 1,
    title: "Identity Details",
    description: "These fields establish legal and operational responsibility.",
  },
  {
    id: 2,
    title: "Role & Accountability",
    description: "Define your operational role and infrastructure responsibility.",
  },
  {
    id: 3,
    title: "Verification",
    description: "Verification is required before access can be reviewed.",
  },
  {
    id: 4,
    title: "Security Setup",
    description: "Minimum 8 characters. Use a strong combination.",
  },
];

export default function AdminRegistrationPage() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col">
      {/* Header / Back Button */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center bg-background/80 backdrop-blur-md border-b border-border/40">
        <Link href="/" className="group flex items-center gap-2 text-sm uppercase tracking-widest hover:opacity-70 transition-opacity">
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>
        <div className="text-sm font-bold tracking-widest uppercase">
          Admin Registration
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 pt-24">
        <AdminStepper />
      </div>
    </div>
  );
}

function AdminStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [form, setForm] = useState<any>({});

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
        // Handle submit
        console.log("Form submitted:", form);
    }
  };

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const [isDesktop, setIsDesktop] = useState(false);

  React.useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative w-full max-w-7xl px-4 md:px-8"
    >
      <div className="flex w-full flex-col md:flex-row items-center justify-center gap-6">
        {steps.map((step, index) => {
          const isActive = activeStep === index;
          return (
            <motion.div
              key={step.id}
              className={cn(
                "relative flex flex-col justify-between rounded-3xl bg-card border border-border/50 shadow-2xl overflow-hidden cursor-pointer md:cursor-default",
                isActive ? "ring-1 ring-primary/20" : ""
              )}
              initial={false}
              animate={{
                width: isDesktop 
                  ? (isActive ? "36rem" : "6rem") 
                  : "100%", 
                height: isDesktop 
                  ? "38rem" 
                  : (isActive ? "auto" : "6rem"),
              }}
              layout
              transition={{ type: "spring", stiffness: 80, damping: 20, mass: 1 }}
              onClick={() => setActiveStep(index)}
              onHoverStart={() => setHoveredStep(index)}
              onHoverEnd={() => setHoveredStep(null)}
            >
            {/* COLLAPSED VIEW: BIG NUMBER ONLY */}
            {!isActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center z-10 overflow-hidden"
              >
                <TextRoll
                  active={hoveredStep === index}
                  className="text-6xl md:text-8xl font-custom text-foreground select-none"
                  baseDelay={0.1}
                >
                  {step.id.toString()}
                </TextRoll>
              </motion.div>
            )}

            {/* EXPANDED VIEW: CONTENT */}
            <motion.div
              className="flex flex-col h-full w-full"
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.4, delay: isActive ? 0.5 : 0 }}
            >
              {/* STEP HEADER */}
              <div className="p-6 shrink-0">
                <p className="text-xs font-semibold tracking-wide text-muted-foreground">
                  STEP {step.id}
                </p>
                <h2 className="mt-2 text-xl md:text-2xl font-semibold text-foreground whitespace-nowrap">
                  {step.title}
                </h2>
                <motion.p 
                  className="mt-2 text-sm text-muted-foreground line-clamp-2"
                  animate={{ opacity: isActive ? 1 : 0 }}
                >
                  {step.description}
                </motion.p>
              </div>

              {/* STEP CONTENT */}
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-4 px-6 pb-6 w-full"
                  >
                    <div className="flex flex-col gap-4">
                      {renderStepFields(index, handleChange)}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                      className="mt-4 w-full rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 uppercase tracking-widest"
                    >
                      {index === steps.length - 1
                        ? "Submit Application"
                        : "Continue"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function renderStepFields(
  stepIndex: number,
  onChange: (k: string, v: string) => void
) {
  switch (stepIndex) {
    case 0:
      return (
        <>
          <Input label="Full Name" onChange={onChange} name="name" />
          <Input label="Phone Number" onChange={onChange} name="phone" />
          <Input label="Email Address" onChange={onChange} name="email" />
          <Input label="Residential Address" onChange={onChange} name="address" />
        </>
      );

    case 1:
      return (
        <>
          <Input label="Designation" onChange={onChange} name="designation" />
          <Input label="Organization Name" onChange={onChange} name="org" />
          <Input label="Office / Employee ID" onChange={onChange} name="officeId" />
        </>
      );

    case 2:
      return (
        <>
          <Input label="Phone OTP" onChange={onChange} name="phoneOtp" />
          <Input label="Email OTP" onChange={onChange} name="emailOtp" />
        </>
      );

    case 3:
      return (
        <>
          <Input
            label="Set Password"
            type="password"
            onChange={onChange}
            name="password"
            />
          <Input
            label="Confirm Password"
            type="password"
            onChange={onChange}
            name="confirmPassword"
          />
        </>
      );

    default:
      return null;
  }
}

function Input({
  label,
  name,
  type = "text",
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  onChange: (k: string, v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </label>
      <input
        type={type}
        className="w-full rounded-none border-b border-input bg-transparent px-0 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
        onChange={(e) => onChange(name, e.target.value)}
        onClick={(e) => e.stopPropagation()} // Prevent triggering step click
      />
    </div>
  );
}

const STAGGER = 0.035;

const TextRoll: React.FC<{
  children: string;
  className?: string;
  center?: boolean;
  active?: boolean;
  baseDelay?: number;
}> = ({ children, className, center = false, active = false, baseDelay = 0 }) => {
  return (
    <motion.span
      initial="initial"
      animate={active ? "hovered" : "initial"}
      className={cn("relative block overflow-hidden", className)}
      style={{
        lineHeight: 0.75,
      }}
    >
      <div>
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: {
                  y: 0,
                },
                hovered: {
                  y: "-115%",
                },
              }}
              transition={{
                ease: "easeInOut",
                delay: baseDelay + delay,
              }}
              className="inline-block"
              key={i}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          );
        })}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: {
                  y: "115%",
                },
                hovered: {
                  y: 0,
                },
              }}
              transition={{
                ease: "easeInOut",
                delay: baseDelay + delay,
              }}
              className="inline-block"
              key={i}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          );
        })}
      </div>
    </motion.span>
  );
};
