"use client";

import * as React from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  Globe,
  Info,
  Layers,
  Sparkles,
  DollarSign,
  Calendar,
  CheckCircle,
} from "lucide-react";

import { MultiStepForm } from "@/components/ui/multi-step-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TooltipIcon = ({ text }: { text: string }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className="h-4 w-4 text-neutral-400 hover:text-white cursor-pointer" />
      </TooltipTrigger>
      <TooltipContent className="bg-neutral-900 border border-neutral-800 text-xs text-neutral-300">
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export function ContactFormDemo() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const totalSteps = 3;

  // Form states
  const [brandName, setBrandName] = React.useState("");
  const [projectType, setProjectType] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [budget, setBudget] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const handleNext = () => {
    setErrorMsg("");
    if (currentStep === 1) {
      if (!brandName || !projectType) {
        setErrorMsg("Please provide your Brand Name and select a Project Category.");
        return;
      }
    } else if (currentStep === 2) {
      if (!startDate || !budget || !email) {
        setErrorMsg("Please fill out the Launch Quarter, Budget, and your Contact Email.");
        return;
      }
      if (!email.includes("@")) {
        setErrorMsg("Please enter a valid email address.");
        return;
      }
    } else if (currentStep === 3) {
      setIsSubmitted(true);
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setErrorMsg("");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-4xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center justify-center text-center">
        <div className="p-4 bg-emerald-950/40 border border-emerald-800/40 rounded-full text-emerald-400 mb-6 animate-pulse">
          <CheckCircle size={48} />
        </div>
        <h3 className="text-3xl font-bold text-white mb-4">Project Blueprint Registered!</h3>
        <p className="text-neutral-400 max-w-lg leading-relaxed text-sm md:text-base">
          Thank you for choosing **Ethic Works**. We have queued your project details. Our elite design and engineering leads will analyze your scope and get back to you within 24 hours.
        </p>
        <Button
          onClick={() => {
            setIsSubmitted(false);
            setCurrentStep(1);
            setBrandName("");
            setProjectType("");
            setStartDate("");
            setBudget("");
            setEmail("");
            setDescription("");
          }}
          className="mt-8 bg-[#3ca2fa] hover:bg-[#2563eb] text-white font-semibold rounded-full px-6 py-3 shadow-lg"
        >
          Submit Another Blueprint
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-16 md:py-24 relative z-20 flex flex-col items-center">
      <div className="text-center mb-12 select-none pointer-events-none">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#3ca2fa] mb-2 block">
          Elite Project Planner
        </span>
        <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          Launch Your Concept
        </h3>
        <p className="mt-4 text-neutral-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Provide your specifications in this multi-step planner to generate your project's digital blueprint instantly.
        </p>
      </div>

      <MultiStepForm
        currentStep={currentStep}
        totalSteps={totalSteps}
        title="Project Blueprint Planner"
        description="Crafting ethical engineering solutions tailored specifically to your business goals."
        onBack={handleBack}
        onNext={handleNext}
        nextButtonText={currentStep === totalSteps ? "Generate Blueprint" : "Next Step"}
        footerContent={
          <a href="mailto:hello@ethicworks.com" className="flex items-center gap-1 text-xs md:text-sm text-[#3ca2fa] hover:text-[#2563eb] transition-colors font-medium">
            Need urgent assistance? <ArrowUpRight className="h-4 w-4" />
          </a>
        }
      >
        {/* STEP 1: Basic project classification */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="brand-name" className="text-neutral-200">Brand / Company Name</Label>
                  <TooltipIcon text="Your official company or project name." />
                </div>
                <Input
                  id="brand-name"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="e.g. Acme Inc"
                  className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-600 focus-visible:ring-[#3ca2fa]/20 focus-visible:border-[#3ca2fa]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="project-type" className="text-neutral-200">Project Category</Label>
                  <TooltipIcon text="Select the primary area of development." />
                </div>
                <Select value={projectType} onValueChange={(val) => setProjectType(val)}>
                  <SelectTrigger id="project-type" className="bg-neutral-900 border-neutral-800 text-white focus:ring-[#3ca2fa]/20 focus:border-[#3ca2fa]">
                    <Layers className="h-4 w-4 mr-2 text-[#3ca2fa]" />
                    <SelectValue placeholder="Select classification..." />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-950 border-neutral-800 text-white">
                    <SelectItem value="saas">SaaS Incubator / App</SelectItem>
                    <SelectItem value="design">Design & Visual Motion</SelectItem>
                    <SelectItem value="architecture">Enterprise System Architecture</SelectItem>
                    <SelectItem value="automation">AI-Driven System Automation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="p-4 bg-[#3ca2fa]/5 border border-[#3ca2fa]/10 rounded-xl flex gap-3 text-sm text-[#3ca2fa] items-start mt-6">
              <Sparkles className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block mb-0.5">Brand Incubation Support Included</span>
                All projects classified at Ethic Works receive complimentary high-performance hosting consultation and full SEO blueprint mapping.
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Budgeting and timelines */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="start-quarter" className="text-neutral-200">Target Launch Quarter</Label>
                  <TooltipIcon text="When do you expect the system to roll out?" />
                </div>
                <Select value={startDate} onValueChange={(val) => setStartDate(val)}>
                  <SelectTrigger id="start-quarter" className="bg-neutral-900 border-neutral-800 text-white focus:ring-[#3ca2fa]/20 focus:border-[#3ca2fa]">
                    <Calendar className="h-4 w-4 mr-2 text-[#3ca2fa]" />
                    <SelectValue placeholder="Select launch quarter..." />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-950 border-neutral-800 text-white">
                    <SelectItem value="q1">Q1 (Jan - Mar)</SelectItem>
                    <SelectItem value="q2">Q2 (Apr - Jun)</SelectItem>
                    <SelectItem value="q3">Q3 (Jul - Sep)</SelectItem>
                    <SelectItem value="q4">Q4 (Oct - Dec)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="budget-range" className="text-neutral-200">Target Budget Range</Label>
                  <TooltipIcon text="Provide an approximate budget to align team resourcing." />
                </div>
                <Select value={budget} onValueChange={(val) => setBudget(val)}>
                  <SelectTrigger id="budget-range" className="bg-neutral-900 border-neutral-800 text-white focus:ring-[#3ca2fa]/20 focus:border-[#3ca2fa]">
                    <DollarSign className="h-4 w-4 mr-2 text-[#3ca2fa]" />
                    <SelectValue placeholder="Select budget..." />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-950 border-neutral-800 text-white">
                    <SelectItem value="tier1">$5k - $15k</SelectItem>
                    <SelectItem value="tier2">$15k - $40k</SelectItem>
                    <SelectItem value="tier3">$40k - $100k</SelectItem>
                    <SelectItem value="tier4">$100k+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="contact-email" className="text-neutral-200">Contact Email</Label>
                  <TooltipIcon text="The direct email where we should send your project blueprint proposal." />
                </div>
                <Input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-600 focus-visible:ring-[#3ca2fa]/20 focus-visible:border-[#3ca2fa]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Detailed blueprint review */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="project-desc" className="text-neutral-200">Describe Your Objective</Label>
                <TooltipIcon text="Provide details on project features, goals, or references to help us prepare your strategy." />
              </div>
              <textarea
                id="project-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Give us a quick look at your product goals, must-have features, or aesthetic expectations..."
                rows={5}
                className="flex w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white placeholder:text-neutral-600 focus-visible:border-[#3ca2fa] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#3ca2fa]/20 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              />
            </div>

            <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl space-y-2 text-sm text-neutral-300">
              <span className="font-semibold block text-white">Summary of Specifications</span>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>Brand Name: <span className="text-[#3ca2fa] font-mono">{brandName}</span></li>
                <li>Classification: <span className="text-[#3ca2fa] font-mono">{projectType.toUpperCase()}</span></li>
                <li>Launch Target: <span className="text-[#3ca2fa] font-mono">{startDate.toUpperCase()}</span></li>
                <li>Resourcing: <span className="text-[#3ca2fa] font-mono">{budget}</span></li>
                <li>Send Blueprint to: <span className="text-[#3ca2fa] font-mono">{email}</span></li>
              </ul>
            </div>
          </div>
        )}

        {/* Error notification display */}
        {errorMsg && (
          <Alert variant="destructive" className="mt-4 bg-red-950/20 border-red-800/40 text-red-400">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              {errorMsg}
            </AlertDescription>
          </Alert>
        )}
      </MultiStepForm>
    </div>
  );
}
