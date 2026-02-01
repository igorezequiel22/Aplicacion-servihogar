import {
  Star,
  Briefcase,
  Calendar,
  TrendingUp,
  Clock,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Professional } from "../App";

type DashboardProps = {
  professional: Professional;
  onNavigate: (view: string) => void;
};

export default function Dashboard({
  professional,
  onNavigate,
}: DashboardProps) {
  // Mock data for dashboard
  const stats = {
    totalRequests: 12,
    pendingRequests: 3,
    completedJobs: 45,
    monthlyEarnings: 25680,
  };

  const recentRequests = [
    {
      id: "1",
      client: "María González",
      service: "Instalación Eléctrica",
      date: "2025-10-22",
      status: "pending" as const,
    },
    {
      id: "2",
      client: "Carlos Rodríguez",
      service: "Reparación de Plomería",
      date: "2025-10-23",
      status: "pending" as const,
    },
    {
      id: "3",
      client: "Ana Martínez",
      service: "Pintura de Interior",
      date: "2025-10-25",
      status: "accepted" as const,
    },
  ];

  const upcomingAppointments = [
    {
      id: "1",
      client: "Roberto Silva",
      service: "Instalación de Luz",
      date: "2025-10-22",
      time: "10:00 AM",
    },
    {
      id: "2",
      client: "Laura Fernández",
      service: "Reparación de Techo",
      date: "2025-10-23",
      time: "14:00 PM",
    },
  ];

  return (
    <div className="p-4 space-y-4 bg-zinc-950 min-h-screen">
      {/* Welcome Section */}
      <div>
        <h2 className="text-white text-xl">
          Hola, {professional.name.split(" ")[0]}
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Resumen de tu actividad
        </p>
      </div>

      {/* Stats Cards - Mobile optimized */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-zinc-800 border-zinc-700">
          <CardContent className="pt-4 pb-3">
            <div className="flex flex-col items-center text-center">
              <MessageSquare className="w-6 h-6 text-orange-500 mb-2" />
              <p className="text-2xl text-white">
                {stats.totalRequests}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Solicitudes
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700">
          <CardContent className="pt-4 pb-3">
            <div className="flex flex-col items-center text-center">
              <Briefcase className="w-6 h-6 text-orange-500 mb-2" />
              <p className="text-2xl text-white">
                {stats.completedJobs}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Completados
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700">
          <CardContent className="pt-4 pb-3">
            <div className="flex flex-col items-center text-center">
              <Star className="w-6 h-6 text-orange-500 fill-orange-500 mb-2" />
              <p className="text-2xl text-white">4.8</p>
              <p className="text-xs text-gray-400 mt-1">
                Valoración
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700">
          <CardContent className="pt-4 pb-3">
            <div className="flex flex-col items-center text-center">
              <TrendingUp className="w-6 h-6 text-orange-500 mb-2" />
              <p className="text-lg text-white">
                ${(stats.monthlyEarnings / 1000).toFixed(0)}k
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Este mes
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-3">
        <Button
          className="h-auto py-4 justify-start gap-3 bg-orange-500 hover:bg-orange-600"
          onClick={() => onNavigate("services")}
        >
          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <div className="text-left flex-1">
            <p className="text-sm text-white">
              Publicar Servicio
            </p>
            <p className="text-xs text-white opacity-80">
              Agregar nueva oferta
            </p>
          </div>
        </Button>

        <Button
          variant="outline"
          className="h-auto py-4 justify-start gap-3 border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-white"
          onClick={() => onNavigate("requests")}
        >
          <div className="w-10 h-10 rounded-lg bg-zinc-700 flex items-center justify-center relative">
            <MessageSquare className="w-5 h-5 text-white" />
            {stats.pendingRequests > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center">
                {stats.pendingRequests}
              </div>
            )}
          </div>
          <div className="text-left flex-1">
            <p className="text-sm text-white">
              Ver Solicitudes
            </p>
            <p className="text-xs text-gray-400">
              {stats.pendingRequests} pendientes
            </p>
          </div>
        </Button>
      </div>

      {/* Recent Requests */}
      <Card className="bg-zinc-800 border-zinc-700">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base text-white">
              Solicitudes Recientes
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-8 text-orange-500 hover:text-orange-600 hover:bg-orange-950/50"
              onClick={() => onNavigate("requests")}
            >
              Ver todas
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-start gap-3 p-3 rounded-lg border border-zinc-700 bg-zinc-900"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white shrink-0 text-sm">
                  {request.client.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm text-white">
                      {request.client}
                    </p>
                    <Badge
                      variant="secondary"
                      className="text-[10px] py-0 bg-orange-500/20 text-orange-500 border-0"
                    >
                      {request.status === "pending"
                        ? "Pendiente"
                        : "Aceptado"}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {request.service}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(request.date).toLocaleDateString(
                      "es-ES",
                      {
                        day: "numeric",
                        month: "short",
                      },
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Profile Completion Alert */}
      {(!professional.photo ||
        !professional.description ||
        professional.services.length === 0) && (
        <Card className="border-orange-500 bg-orange-950/20">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-white">
                  Completa tu perfil
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {!professional.photo && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-7 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                      onClick={() => onNavigate("profile")}
                    >
                      Agregar foto
                    </Button>
                  )}
                  {!professional.description && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-7 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                      onClick={() => onNavigate("profile")}
                    >
                      Descripción
                    </Button>
                  )}
                  {professional.services.length === 0 && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-7 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                      onClick={() => onNavigate("services")}
                    >
                      Publicar servicios
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}