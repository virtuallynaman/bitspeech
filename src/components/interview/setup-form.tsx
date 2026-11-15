"use client";

import { useState } from "react";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ChoiceGroup from "./choice-group";
import TechPicker from "./tech-picker";
import { levelOptions, roleOptions, typeOptions } from "./options";
import type { InterviewType, Level, Role, Technology } from "@/lib/constants/interview";
import { createInterview } from "@/app/interview/actions";

export default function SetupForm() {
  const [interviewType, setInterviewType] = useState<InterviewType>("technical");
  const [level, setLevel] = useState<Level>("junior");
  const [role, setRole] = useState<Role>("fullstack");
  const [technologies, setTechnologies] = useState<Technology[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isBehavioral = interviewType === "behavioral";
  const selectedType = typeOptions.find((option) => option.value === interviewType);

  const canStart = isBehavioral || technologies.length > 0;

  async function handleStart() {
    setError("");
    setLoading(true);

    const data = isBehavioral
      ? { interviewType, level }
      : { interviewType, level, role, technologies };

    const result = await createInterview(data);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">Set up your interview</CardTitle>
        <CardDescription className="text-base">Tailor your interview to your goals.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-7">
        <ChoiceGroup
          label="Interview type"
          options={typeOptions}
          value={interviewType}
          onChange={setInterviewType}
          description={selectedType?.description}
          disabled={loading}
        />

        <ChoiceGroup
          label="Experience level"
          options={levelOptions}
          value={level}
          onChange={setLevel}
          disabled={loading}
        />

        {!isBehavioral && (
          <>
            <ChoiceGroup
              label="Role"
              options={roleOptions}
              value={role}
              onChange={setRole}
              disabled={loading}
            />

            <TechPicker
              selected={technologies}
              onChange={setTechnologies}
              disabled={loading}
            />
          </>
        )}

        {error && (
          <p role="alert" className="text-sm text-red-400">
            {error}
          </p>
        )}
      </CardContent>

      <CardFooter className="flex flex-wrap items-center justify-between gap-3">
        {!canStart && (
          <p className="text-sm text-muted-foreground">
            Select at least one technology to continue.
          </p>
        )}

        <div className="ml-auto flex gap-3">
          <Button size="lg" variant="ghost" nativeButton={false} render={<Link href="/dashboard" />}>
            Cancel
          </Button>

          <Button
            size="lg"
            className="h-11 px-6 text-base"
            disabled={!canStart || loading}
            onClick={handleStart}
          >
            {loading ? (
              <>
                <LoaderCircle className="animate-spin" />
                Preparing your interview...
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
