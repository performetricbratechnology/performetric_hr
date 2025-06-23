import { useEffect, useState } from "react";
import { ControlButtons } from "../control-buttons";
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Description,
} from "../ui";
import { USERS_GET } from "@/api";
import type { UProps, UserProps } from "@/types/registrations";
import useFetch from "@/lib/hooks/useFetch";

export function UsersList() {
  const [users, setUsers] = useState<UserProps[]>([]);
  const { request, error, loading } = useFetch<UserProps[]>();

  useEffect(() => {
    const fetchUsers = async () => {
      const { url, options } = USERS_GET();
      const { response, json } = await request(url, options);

      if (!response?.ok || !json) return;
      setUsers(
        (json as unknown as UProps[]).map((user) => ({
          id: user.id,
          FullName: user.full_name || user.FullName,
          Email: user.Email || user.email,
          Position: user.Position || user.position,
          Team: user.Team || user.team,
        }))
      );
    };

    fetchUsers();
  }, [request]);

  if (loading)
    return (
      <div className="bg-accent/30 w-full h-60 rounded-lg animate-pulse"></div>
    );
  if (error) return <p className="text-destructive">{error}</p>;
  return (
    <Card>
      <CardHeader>
        <CardTitle aria-label="Usuários Cadastrados" role="heading">
          Usuários Cadastrados
        </CardTitle>
        <CardDescription
          aria-label={`Total: ${
            users.length === 1
              ? users.length + " usuário"
              : users.length + " usuários"
          }`}
          role="paragraph"
        >
          Total:{" "}
          {users.length === 1
            ? `${users.length} usuário`
            : `${users.length} usuários`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id || user.Email}
            className="flex max-sm:flex-col sm:justify-between items-start sm:items-center gap-4 p-3 bg-background text-foreground rounded-lg"
          >
            <div className="flex flex-col-reverse sm:flex-col">
              <p className="text-md font-medium" aria-label={user.FullName}>
                {user.FullName}
              </p>
              <div>
                <Description aria={user.Email}>{user.Email}</Description>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-bold my-1">
                <Badge aria-label={user.Position} role="status">
                  {user.Position}
                </Badge>
                <Badge variant="outline" aria-label={user.Team} role="status">
                  {user.Team}
                </Badge>
              </div>
            </div>
            <ControlButtons tab="users" id="" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
