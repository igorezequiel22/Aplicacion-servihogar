import { useState } from "react";
import {
  Check,
  X,
  Clock,
  Send,
  User,
  Calendar,
  MapPin,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { toast } from "sonner@2.0.3";
import { Professional, Request, Message } from "../App";

type RequestsInboxProps = {
  professional: Professional;
};

export default function RequestsInbox({
  professional,
}: RequestsInboxProps) {
  const [selectedRequest, setSelectedRequest] =
    useState<Request | null>(null);
  const [messageText, setMessageText] = useState("");

  // Mock data
  const [requests, setRequests] = useState<Request[]>([
    {
      id: "1",
      clientName: "María González",
      clientPhoto:
        "https://ui-avatars.com/api/?name=Maria+Gonzalez&size=100&background=random",
      service: "Instalación Eléctrica",
      description:
        "Necesito instalar 3 enchufes adicionales en mi cocina y cambiar algunas luces LED.",
      date: "2025-10-22",
      status: "pending",
      messages: [
        {
          id: "1",
          sender: "client",
          text: "Hola, ¿podrías realizar este trabajo esta semana?",
          timestamp: "2025-10-21T10:30:00",
        },
      ],
    },
    {
      id: "2",
      clientName: "Carlos Rodríguez",
      clientPhoto:
        "https://ui-avatars.com/api/?name=Carlos+Rodriguez&size=100&background=random",
      service: "Reparación de Plomería",
      description:
        "Tengo una fuga en el baño que necesita ser reparada urgentemente.",
      date: "2025-10-23",
      status: "pending",
      messages: [
        {
          id: "1",
          sender: "client",
          text: "Es urgente, ¿cuándo puedes venir?",
          timestamp: "2025-10-21T14:15:00",
        },
      ],
    },
    {
      id: "3",
      clientName: "Ana Martínez",
      clientPhoto:
        "https://ui-avatars.com/api/?name=Ana+Martinez&size=100&background=random",
      service: "Pintura de Interior",
      description:
        "Quiero pintar 2 habitaciones de mi departamento. Aproximadamente 40m2.",
      date: "2025-10-25",
      status: "accepted",
      messages: [
        {
          id: "1",
          sender: "client",
          text: "¿Incluye el material en el presupuesto?",
          timestamp: "2025-10-21T09:00:00",
        },
        {
          id: "2",
          sender: "professional",
          text: "Hola Ana, sí, el presupuesto incluye todos los materiales necesarios.",
          timestamp: "2025-10-21T09:15:00",
        },
        {
          id: "3",
          sender: "client",
          text: "Perfecto, ¡aceptemos entonces!",
          timestamp: "2025-10-21T09:20:00",
        },
      ],
    },
    {
      id: "4",
      clientName: "Roberto Silva",
      clientPhoto:
        "https://ui-avatars.com/api/?name=Roberto+Silva&size=100&background=random",
      service: "Instalación de Ventilador",
      description:
        "Necesito instalar un ventilador de techo en mi sala.",
      date: "2025-10-24",
      status: "completed",
      messages: [
        {
          id: "1",
          sender: "client",
          text: "¿Tienes disponibilidad para mañana?",
          timestamp: "2025-10-20T16:00:00",
        },
        {
          id: "2",
          sender: "professional",
          text: "Sí, puedo ir mañana a las 10:00 AM",
          timestamp: "2025-10-20T16:10:00",
        },
        {
          id: "3",
          sender: "client",
          text: "Perfecto, te espero. Gracias!",
          timestamp: "2025-10-20T16:15:00",
        },
      ],
    },
  ]);

  const pendingRequests = requests.filter(
    (r) => r.status === "pending",
  );
  const acceptedRequests = requests.filter(
    (r) => r.status === "accepted",
  );
  const completedRequests = requests.filter(
    (r) => r.status === "completed",
  );

  const handleAccept = (requestId: string) => {
    setRequests(
      requests.map((r) =>
        r.id === requestId
          ? { ...r, status: "accepted" as const }
          : r,
      ),
    );
    toast.success("Solicitud aceptada exitosamente");
    setSelectedRequest(null);
  };

  const handleReject = (requestId: string) => {
    setRequests(
      requests.map((r) =>
        r.id === requestId
          ? { ...r, status: "rejected" as const }
          : r,
      ),
    );
    toast.success("Solicitud rechazada");
    setSelectedRequest(null);
  };

  const handlePostpone = (requestId: string) => {
    toast.info(
      "Solicitud pospuesta. El cliente será notificado.",
    );
    setSelectedRequest(null);
  };

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedRequest) return;

    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      sender: "professional",
      text: messageText,
      timestamp: new Date().toISOString(),
    };

    setRequests(
      requests.map((r) =>
        r.id === selectedRequest.id
          ? { ...r, messages: [...r.messages, newMessage] }
          : r,
      ),
    );

    setSelectedRequest({
      ...selectedRequest,
      messages: [...selectedRequest.messages, newMessage],
    });

    setMessageText("");
    toast.success("Mensaje enviado");
  };

  const RequestCard = ({ request }: { request: Request }) => (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow bg-zinc-900 border-zinc-800"
      onClick={() => setSelectedRequest(request)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <img
            src={request.clientPhoto}
            alt={request.clientName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-white">
                  {request.clientName}
                </p>
                <p className="text-sm text-gray-400">
                  {request.service}
                </p>
              </div>
              <Badge
                variant={
                  request.status === "pending"
                    ? "secondary"
                    : request.status === "accepted"
                      ? "default"
                      : "outline"
                }
                className={
                  request.status === "pending"
                    ? "bg-orange-500/20 text-orange-500 border-0"
                    : request.status === "accepted"
                      ? "bg-green-500/20 text-green-500 border-0"
                      : ""
                }
              >
                {request.status === "pending" && "Pendiente"}
                {request.status === "accepted" && "Aceptado"}
                {request.status === "completed" && "Completado"}
              </Badge>
            </div>
            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
              {request.description}
            </p>
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(request.date).toLocaleDateString(
                  "es-ES",
                  {
                    day: "numeric",
                    month: "short",
                  },
                )}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {request.messages.length} mensajes
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-4 space-y-4 bg-zinc-950 min-h-screen">
      <div>
        <h2 className="text-white text-xl">Solicitudes de Clientes</h2>
        <p className="text-gray-400 text-sm mt-1">
          Gestiona y responde a las solicitudes de servicio
        </p>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-zinc-900 border-zinc-800">
          <TabsTrigger value="pending" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            Pendientes
            {pendingRequests.length > 0 && (
              <Badge className="ml-2 bg-orange-500 text-white border-0 text-[10px]">
                {pendingRequests.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="accepted" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">Aceptadas</TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            Completadas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          {pendingRequests.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {pendingRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                />
              ))}
            </div>
          ) : (
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="py-12 text-center text-gray-500">
                <Clock className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>No hay solicitudes pendientes</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="accepted" className="mt-6">
          {acceptedRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {acceptedRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-gray-500">
                <Check className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>No hay solicitudes aceptadas</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          {completedRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-gray-500">
                <Check className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>No hay trabajos completados</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Request Detail Dialog */}
      <Dialog
        open={!!selectedRequest}
        onOpenChange={() => setSelectedRequest(null)}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
          {selectedRequest && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-3">
                  <img
                    src={selectedRequest.clientPhoto}
                    alt={selectedRequest.clientName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <DialogTitle>
                      {selectedRequest.clientName}
                    </DialogTitle>
                    <DialogDescription>
                      {selectedRequest.service}
                    </DialogDescription>
                  </div>
                  <Badge
                    variant={
                      selectedRequest.status === "pending"
                        ? "secondary"
                        : selectedRequest.status === "accepted"
                          ? "default"
                          : "outline"
                    }
                  >
                    {selectedRequest.status === "pending" &&
                      "Pendiente"}
                    {selectedRequest.status === "accepted" &&
                      "Aceptado"}
                    {selectedRequest.status === "completed" &&
                      "Completado"}
                  </Badge>
                </div>
              </DialogHeader>

              {/* Request Details */}
              <div className="space-y-3 py-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Descripción
                  </p>
                  <p className="text-sm text-white mt-1">
                    {selectedRequest.description}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {new Date(
                      selectedRequest.date,
                    ).toLocaleDateString("es-ES", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Chat */}
              <div className="flex-1 flex flex-col min-h-0">
                <p className="text-sm text-gray-300 mb-3">
                  Mensajes
                </p>
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {selectedRequest.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === "professional"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.sender === "professional"
                              ? "bg-orange-600 text-white"
                              : "bg-zinc-800 text-white"
                          }`}
                        >
                          <p className="text-sm">
                            {message.text}
                          </p>
                          <p
                            className={`text-xs mt-1 ${
                              message.sender === "professional"
                                ? "text-orange-100"
                                : "text-gray-500"
                            }`}
                          >
                            {new Date(
                              message.timestamp,
                            ).toLocaleTimeString("es-ES", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <Input
                    value={messageText}
                    onChange={(e) =>
                      setMessageText(e.target.value)
                    }
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleSendMessage()
                    }
                    placeholder="Escribe un mensaje..."
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="icon"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Actions */}
              {selectedRequest.status === "pending" && (
                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    onClick={() =>
                      handleAccept(selectedRequest.id)
                    }
                    className="flex-1 gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Aceptar
                  </Button>
                  <Button
                    onClick={() =>
                      handlePostpone(selectedRequest.id)
                    }
                    variant="outline"
                    className="flex-1 gap-2"
                  >
                    <Clock className="w-4 h-4" />
                    Posponer
                  </Button>
                  <Button
                    onClick={() =>
                      handleReject(selectedRequest.id)
                    }
                    variant="outline"
                    className="flex-1 gap-2"
                  >
                    <X className="w-4 h-4" />
                    Rechazar
                  </Button>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}