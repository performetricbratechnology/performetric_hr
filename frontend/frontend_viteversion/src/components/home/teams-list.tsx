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
import type { TeamProps, TProps } from "@/types/registrations";
import { TEAMS_GET } from "@/api";
import useFetch from "@/lib/hooks/useFetch";

export function TeamsList() {
  const [teams, setTeams] = useState<TeamProps[]>([]);
  const { request, error, loading } = useFetch<TeamProps[]>();

  useEffect(() => {
    const fetchTeams = async () => {
      const { url, options } = TEAMS_GET();
      const { response, json } = await request(url, options);

      if (!response?.ok || !json) return;
      setTeams(
        (json as unknown as TProps[]).map((team) => ({
          id: team.id,
          name: team.team_name || team.TeamName,
          description: team.description || team.Description,
          members: team.members || team.Members || 0,
        }))
      );
    };

    fetchTeams();
  }, [request]);

  if (loading) return <p>Carregando</p>;
  if (error) return <p className="text-destructive">{error}</p>;
  return (
    <Card>
      <CardHeader>
        <CardTitle aria-label="Times Cadastrados" role="heading">
          Times Cadastrados
        </CardTitle>
        <CardDescription
          aria-label={`Total:
            ${
              teams.length === 1
                ? teams.length + " time"
                : teams.length + " times"
            }`}
          role="paragraph"
        >
          Total:{" "}
          {teams.length === 1
            ? `${teams.length} time`
            : `${teams.length} times`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {teams.map((team) => (
          <div
            key={team.id}
            className="flex max-sm:flex-col sm:justify-between items-start sm:items-center gap-4 p-3 bg-background text-foreground  rounded-lg"
          >
            <div className="flex flex-col-reverse sm:flex-col">
              <p className="text-lg font-medium" aria-label={team.name}>
                {team.name}
              </p>
              <div>
                <Description aria={team.description}>
                  {team.description}
                </Description>
              </div>
              <div className="flex gap-2 text-xs font-bold my-1">
                <Badge
                  variant="secondary"
                  aria-label={`
                    ${
                      team.members === 1
                        ? team.members + " membro"
                        : team.members + " membros"
                    }`}
                  role="status"
                >
                  {team.members === 1
                    ? `${team.members} membro`
                    : `${team.members} membros`}
                </Badge>
              </div>
            </div>
            <ControlButtons />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
