import { useState, useCallback } from "react";
import {
  Plus,
  Clock,
  MapPin,
  Edit2,
  Trash2,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner@2.0.3";
import { Professional } from "../App";

type CalendarViewProps = {
  professional: Professional;
};

type Appointment = {
  id: string;
  date: string;
  time: string;
  duration: string;
  clientName: string;
  service: string;
  location: string;
  notes: string;
  status: "scheduled" | "completed" | "cancelled";
};

export default function CalendarView({
  professional,
}: CalendarViewProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] =
    useState<Appointment | null>(null);

  const [appointments, setAppointments] = useState<
    Appointment[]
  >([
    {
      id: "1",
      date: "2025-10-22",
      time: "10:00",
      duration: "2 horas",
      clientName: "Roberto Silva",
      service: "Instalación de Luz",
      location: "Av. Corrientes 1234, CABA",
      notes: "Llevar escalera",
      status: "scheduled",
    },
    {
      id: "2",
      date: "2025-10-23",
      time: "14:00",
      duration: "3 horas",
      clientName: "Laura Fernández",
      service: "Reparación de Techo",
      location: "Calle Falsa 123, Zona Norte",
      notes: "Cliente tiene perro",
      status: "scheduled",
    },
    {
      id: "3",
      date: "2025-10-25",
      time: "09:00",
      duration: "4 horas",
      clientName: "Ana Martínez",
      service: "Pintura de Interior",
      location: "San Martín 456, Centro",
      notes: "",
      status: "scheduled",
    },
  ]);

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    duration: "",
    clientName: "",
    service: "",
    location: "",
    notes: "",
  });

  const handleOpenDialog = useCallback(
    (appointment?: Appointment) => {
      if (appointment) {
        setEditingAppointment(appointment);
        setFormData({
          date: appointment.date,
          time: appointment.time,
          duration: appointment.duration,
          clientName: appointment.clientName,
          service: appointment.service,
          location: appointment.location,
          notes: appointment.notes,
        });
      } else {
        setEditingAppointment(null);
        const today = new Date().toISOString().split("T")[0];
        setFormData({
          date: today,
          time: "",
          duration: "",
          clientName: "",
          service: "",
          location: "",
          notes: "",
        });
      }
      setIsDialogOpen(true);
    },
    [],
  );

  const handleCloseDialog = useCallback(() => {
    setIsDialogOpen(false);
    setEditingAppointment(null);
    setFormData({
      date: "",
      time: "",
      duration: "",
      clientName: "",
      service: "",
      location: "",
      notes: "",
    });
  }, []);

  const handleSaveAppointment = useCallback(() => {
    if (
      !formData.date ||
      !formData.time ||
      !formData.clientName ||
      !formData.service
    ) {
      toast.error("Por favor completa los campos requeridos");
      return;
    }

    if (editingAppointment) {
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === editingAppointment.id
            ? {
                ...apt,
                ...formData,
                status: "scheduled" as const,
              }
            : apt,
        ),
      );
      toast.success("Turno actualizado");
    } else {
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        ...formData,
        status: "scheduled",
      };
      setAppointments((prev) => [...prev, newAppointment]);
      toast.success("Turno agendado");
    }

    handleCloseDialog();
  }, [formData, editingAppointment, handleCloseDialog]);

  const handleDeleteAppointment = useCallback(
    (appointmentId: string) => {
      setAppointments((prev) =>
        prev.filter((apt) => apt.id !== appointmentId),
      );
      toast.success("Turno eliminado");
    },
    [],
  );

  const handleCompleteAppointment = useCallback(
    (appointmentId: string) => {
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === appointmentId
            ? { ...apt, status: "completed" as const }
            : apt,
        ),
      );
      toast.success("Trabajo completado");
    },
    [],
  );

  const handleCancelAppointment = useCallback(
    (appointmentId: string) => {
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === appointmentId
            ? { ...apt, status: "cancelled" as const }
            : apt,
        ),
      );
      toast.success("Turno cancelado");
    },
    [],
  );

  const scheduledAppointments = appointments
    .filter((apt) => apt.status === "scheduled")
    .sort((a, b) => {
      const dateA = new Date(a.date + " " + a.time).getTime();
      const dateB = new Date(b.date + " " + b.time).getTime();
      return dateA - dateB;
    });

  return (
    <div className="p-4 space-y-4 bg-[#0a0a0a] min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-xl font-semibold">
            Mi Agenda
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Gestiona tus turnos
          </p>
        </div>
        <Dialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        >
          <DialogTrigger asChild>
            <Button
              onClick={() => handleOpenDialog()}
              size="sm"
              className="gap-2 bg-orange-500 hover:bg-orange-600"
            >
              <Plus className="w-4 h-4" />
              Nuevo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[380px] bg-zinc-900 border-zinc-800">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingAppointment
                  ? "Editar Turno"
                  : "Agendar Turno"}
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Completa los detalles del turno
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-4 max-h-[60vh] overflow-y-auto">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-white">
                  Fecha *
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      date: e.target.value,
                    })
                  }
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" className="text-white">
                  Hora *
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      time: e.target.value,
                    })
                  }
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="duration"
                  className="text-white"
                >
                  Duración Estimada
                </Label>
                <select
                  id="duration"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      duration: e.target.value,
                    })
                  }
                  className="w-full h-10 px-3 rounded-md bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Seleccionar</option>
                  <option value="1 hora">1 hora</option>
                  <option value="2 horas">2 horas</option>
                  <option value="3 horas">3 horas</option>
                  <option value="4 horas">4 horas</option>
                  <option value="Medio día">Medio día</option>
                  <option value="Día completo">
                    Día completo
                  </option>
                </select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="clientName"
                  className="text-white"
                >
                  Cliente *
                </Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      clientName: e.target.value,
                    })
                  }
                  placeholder="Nombre del cliente"
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="service" className="text-white">
                  Servicio *
                </Label>
                <Input
                  id="service"
                  value={formData.service}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      service: e.target.value,
                    })
                  }
                  placeholder="Tipo de servicio"
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="location"
                  className="text-white"
                >
                  Dirección
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: e.target.value,
                    })
                  }
                  placeholder="Dirección completa"
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-white">
                  Notas
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      notes: e.target.value,
                    })
                  }
                  placeholder="Información adicional..."
                  rows={2}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
            </div>

            <DialogFooter className="flex-col gap-2">
              <Button
                onClick={handleSaveAppointment}
                className="w-full bg-orange-500 hover:bg-orange-600"
              >
                {editingAppointment ? "Actualizar" : "Agendar"}{" "}
                Turno
              </Button>
              <Button
                variant="outline"
                onClick={handleCloseDialog}
                className="w-full border-zinc-700"
              >
                Cancelar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de Turnos */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base text-white">
              Próximos Turnos
            </CardTitle>
            <Badge className="text-xs bg-orange-500 text-white border-0">
              {scheduledAppointments.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {scheduledAppointments.length > 0 ? (
            <div className="space-y-3">
              {scheduledAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="p-3 rounded-lg border border-zinc-700 bg-zinc-800"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white">
                        {apt.clientName}
                      </p>
                      <p className="text-xs text-gray-400">
                        {apt.service}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0 hover:bg-zinc-700 text-gray-400 hover:text-white"
                      onClick={() => handleOpenDialog(apt)}
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                  </div>

                  <div className="space-y-1 mb-3">
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(apt.date).toLocaleDateString(
                        "es-ES",
                        {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        },
                      )}{" "}
                      - {apt.time}
                    </p>
                    {apt.location && (
                      <p className="text-xs text-gray-400 flex items-center gap-1 line-clamp-1">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        {apt.location}
                      </p>
                    )}
                    {apt.duration && (
                      <p className="text-xs text-gray-400">
                        Duración: {apt.duration}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 text-xs h-8 bg-orange-500 text-white hover:bg-orange-600"
                      onClick={() =>
                        handleCompleteAppointment(apt.id)
                      }
                    >
                      Ver turno
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-8 px-3 border-red-500 text-red-500 hover:bg-red-950/50"
                      onClick={() =>
                        handleCancelAppointment(apt.id)
                      }
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center py-4">
              No tienes turnos programados
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}