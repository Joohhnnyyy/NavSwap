"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Check, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

// --- Schema Definition ---
const stationFormSchema = z.object({
  // Section 1: Station Identity
  stationName: z.string().min(3, "Station name required."),
  stationId: z.string().min(1, "Station ID is required."),
  address: z.string().min(5, "Address is required."),
  city: z.string().min(2, "City is required."),
  state: z.string().min(2, "State is required."),
  pincode: z.string().min(4, "Pincode is required."),
  // Mock map picker coordinates
  latitude: z.string().optional(),
  longitude: z.string().optional(),

  // Section 2: Station Infrastructure Details
  numChargers: z.coerce.number().min(1, "At least 1 charger required."),
  chargerType: z.string().min(1, "Select charger type."),
  batteryCapacity: z.coerce.number().min(1, "Capacity required (kWh)."),
  swapCapacity: z.coerce.number().min(1, "Daily swap capacity required."),
  operatingHours: z.string().optional(),

  // Section 3: Partner Details
  numPartners: z.coerce.number().min(0),
  partnerName: z.string().optional(),
  partnerLocation: z.string().optional(),
  partnerDistance: z.coerce.number().optional(),

  // Section 4: Initial Staff Summary
  numStaff: z.coerce.number().min(1, "At least 1 staff member required."),
  staffRoles: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Select at least one staff role.",
  }),

  // Section 5: Compliance
  confirmAccuracy: z.boolean().refine((val) => val === true, {
    message: "You must confirm the details are accurate.",
  }),
});

type StationFormValues = z.infer<typeof stationFormSchema>;

const steps = [
  {
    id: 1,
    title: "Station Identity",
    description: "Basic identification and location details.",
    fields: ["stationName", "stationId", "address", "city", "state", "pincode"] as const,
  },
  {
    id: 2,
    title: "Infrastructure",
    description: "Chargers, capacity, and operational parameters.",
    fields: ["numChargers", "chargerType", "batteryCapacity", "swapCapacity", "operatingHours"] as const,
  },
  {
    id: 3,
    title: "Partner Network",
    description: "Tie-up partners and overflow storage.",
    fields: ["numPartners", "partnerName", "partnerLocation", "partnerDistance"] as const,
  },
  {
    id: 4,
    title: "Staffing & Compliance",
    description: "Staff roles and final verification.",
    fields: ["numStaff", "staffRoles", "confirmAccuracy"] as const,
  },
];

import TerritoryFooter from "@/components/sections/territory-footer";
import { FadeInSection } from "@/components/ui/fade-in-section";

export default function StationRegistrationPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<StationFormValues>({
    resolver: zodResolver(stationFormSchema) as any,
    defaultValues: {
      stationName: "",
      stationId: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      numChargers: "" as any,
      chargerType: "",
      batteryCapacity: "" as any,
      swapCapacity: "" as any,
      operatingHours: "",
      numPartners: 0,
      partnerName: "",
      partnerLocation: "",
      partnerDistance: "" as any,
      numStaff: "" as any,
      staffRoles: [],
      confirmAccuracy: false,
    },
  });

  function onSubmit(data: StationFormValues) {
    console.log("Station Registration Data:", data);
    setTimeout(() => setIsSubmitted(true), 1500);
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full space-y-6"
        >
          <div className="w-20 h-20 bg-foreground text-background rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10" />
          </div>
          <h1 className="text-3xl md:text-4xl font-custom tracking-tighter uppercase">
            Station Submitted
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Station registration submitted. Verification is now in progress. You will be notified once the infrastructure is approved for operation.
          </p>
          <Link href="/">
            <Button variant="outline" className="mt-8 w-full uppercase tracking-widest">
              Return to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col">
      {/* Header / Back Button */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center bg-background/80 backdrop-blur-md border-b border-border/40">
        <Link href="/" className="group flex items-center gap-2 text-sm uppercase tracking-widest hover:opacity-70 transition-opacity">
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>
        <div className="text-sm font-bold tracking-widest uppercase">
          Station Registration
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 pt-24 pb-24">
        <Form {...form}>
          <StationStepper form={form} onSubmit={onSubmit} />
        </Form>
      </div>

      <FadeInSection>
        <TerritoryFooter />
      </FadeInSection>
    </div>
  );
}

function StationStepper({ form, onSubmit }: { form: any; onSubmit: (data: any) => void }) {
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  React.useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const handleNext = async () => {
    const fields = steps[activeStep].fields;
    const isValid = await form.trigger(fields);
    
    if (isValid) {
      if (activeStep < steps.length - 1) {
        setActiveStep(activeStep + 1);
      } else {
        form.handleSubmit(onSubmit)();
      }
    }
  };

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
                      className="flex flex-col gap-8 px-8 pb-8 w-full overflow-y-auto"
                    >
                      <div className="flex flex-col gap-8">
                        {renderStepFields(index, form)}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNext();
                        }}
                        className="mt-4 w-full rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 uppercase tracking-widest"
                      >
                        {index === steps.length - 1
                          ? "Submit Station"
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

function renderStepFields(stepIndex: number, form: any) {
  switch (stepIndex) {
    case 0: // Identity
      return (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="stationName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Station Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Tokyo Central Hub" {...field} className="rounded-none border-x-0 border-t-0 border-b border-input bg-transparent px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Station ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Auto-generated or Custom ID" {...field} className="rounded-none border-x-0 border-t-0 border-b border-input bg-transparent px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Station Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Physical location address" {...field} className="rounded-none border-x-0 border-t-0 border-b border-input bg-transparent px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-3 gap-6 md:col-span-2">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} className="rounded-none border-x-0 border-t-0 border-b border-input bg-transparent px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="State" {...field} className="rounded-none border-x-0 border-t-0 border-b border-input bg-transparent px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pincode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pincode</FormLabel>
                    <FormControl>
                      <Input placeholder="Zip" {...field} className="rounded-none border-x-0 border-t-0 border-b border-input bg-transparent px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="md:col-span-2 mt-4">
            <Button type="button" variant="outline" className="w-full flex gap-2 items-center justify-center py-6 border-dashed">
              <MapPin className="w-4 h-4" />
              Select Location on Map
            </Button>
          </div>
        </>
      );

    case 1: // Infrastructure
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="numChargers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Chargers</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} className="rounded-none border-x-0 border-t-0 border-b border-input bg-transparent px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="chargerType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Charger Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="rounded-none border-x-0 border-t-0 border-b border-input bg-transparent px-0 focus-visible:ring-0 focus-visible:border-foreground shadow-none">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="fast">Fast Charging (DC)</SelectItem>
                    <SelectItem value="standard">Standard Charging (AC)</SelectItem>
                    <SelectItem value="hybrid">Hybrid Setup</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="batteryCapacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Battery Capacity (kWh)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} className="rounded-none border-x-0 border-t-0 border-b border-input bg-transparent px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="swapCapacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avg. Daily Swap Capacity</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} className="rounded-none border-x-0 border-t-0 border-b border-input bg-transparent px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="operatingHours"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Operating Hours (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 06:00 - 22:00" {...field} className="rounded-none border-x-0 border-t-0 border-b border-input bg-transparent px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      );

    case 2: // Partners
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="numPartners"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tie-Up Partners</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} className="rounded-none border-x-0 border-t-0 border-b border-input bg-transparent px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors" />
                </FormControl>
                <FormDescription className="min-h-[20px]">Partners for overflow storage.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="partnerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Partner</FormLabel>
                <FormControl>
                  <Input placeholder="Partner Entity (Optional)" {...field} className="rounded-none border-x-0 border-t-0 border-b border-input bg-transparent px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors" />
                </FormControl>
                <FormDescription className="invisible min-h-[20px]">Placeholder for alignment</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      );

    case 3: // Staffing & Compliance
      return (
        <div className="space-y-8">
          <FormField
            control={form.control}
            name="numStaff"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Station Staff</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} className="rounded-none border-x-0 border-t-0 border-b border-input bg-transparent px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors" />
                </FormControl>
                <FormDescription>Does not create staff accounts immediately.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="staffRoles"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>Staff Roles Required</FormLabel>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {["Operator", "Technician", "Maintenance"].map((role) => (
                    <FormField
                      key={role}
                      control={form.control}
                      name="staffRoles"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={role}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(role)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, role])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value: string) => value !== role
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {role}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pt-4 border-t border-border">
            <FormField
              control={form.control}
              name="confirmAccuracy"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-muted/30">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I confirm that the details provided above are accurate and I am authorized to register this infrastructure.
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
      );

    default:
      return null;
  }
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
