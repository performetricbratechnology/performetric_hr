import { useEffect, useState } from "react";
import { ControlButtons } from "../control-buttons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Description,
  Badge,
} from "../ui";
import type { SProps, SkillsProps } from "@/types/registrations";
import { SKILLS_GET } from "@/api";
import useFetch from "@/lib/hooks/useFetch";

export function SkillsList() {
  const [skills, setSkills] = useState<SkillsProps[]>([]);
  const { request, error, loading } = useFetch<SkillsProps[]>();

  useEffect(() => {
    const fetchSkills = async () => {
      const { url, options } = SKILLS_GET();
      const { response, json } = await request(url, options);

      if (!response?.ok || !json) return;
      setSkills(
        (json as unknown as SProps[]).map((skill) => ({
          id: skill.id,
          name: skill.skillName || skill.skill_name,
          description: skill.skillDescription || skill.skill_description,
          category: skill.category || "Não especificada",
        }))
      );
    };
    fetchSkills();
  }, [request]);

  if (loading) return <p>Carregando</p>;
  if (error) return <p className="text-destructive">{error}</p>;
  return (
    <Card>
      <CardHeader>
        <CardTitle aria-label="Competências Cadastradas" role="heading">
          Competências Cadastradas
        </CardTitle>
        <CardDescription
          aria-label={`Total:
            ${
              skills.length === 1
                ? skills.length + " competência"
                : skills.length + " competências"
            }`}
          role="paragraph"
        >
          Total:{" "}
          {skills.length === 1
            ? `${skills.length} competência`
            : `${skills.length} competências`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="flex max-sm:flex-col sm:justify-between items-start sm:items-center gap-4 p-3 bg-background text-foreground  rounded-lg"
          >
            <div className="flex flex-col-reverse sm:flex-col">
              <p className="text-md font-medium" aria-label={skill.name}>
                {skill.name}
              </p>
              <div>
                <Description aria={skill.description}>
                  {skill.description}
                </Description>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-bold my-1">
                <Badge aria-label={skill.category} role="status">
                  {skill.category}
                </Badge>
              </div>
            </div>
            <ControlButtons skill={skill} tab="skills" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
