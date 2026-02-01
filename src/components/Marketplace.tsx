import { Star, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { toast } from "sonner@2.0.3";

type ServiceOffer = {
  id: string;
  professionalName: string;
  professionalPhoto?: string;
  title: string;
  category: string;
  description: string;
  price: string;
  rating: number;
  reviewsCount: number;
  zone: string;
  availability: string;
};

export default function Marketplace() {
  const [selectedService, setSelectedService] =
    useState<ServiceOffer | null>(null);

  const services: ServiceOffer[] = [
    {
      id: "1",
      professionalName: "Juan Pérez",
      title: "Instalación Eléctrica Completa",
      category: "Electricidad",
      description:
        "Instalación de sistemas eléctricos residenciales y comerciales. Incluye revisión completa, instalación de luminarias, tomas y tableros.",
      price: "$8,500",
      rating: 4.9,
      reviewsCount: 47,
      zone: "Zona Norte, Centro",
      availability: "Lun-Sáb",
    },
    {
      id: "2",
      professionalName: "María González",
      title: "Pintura de Interiores y Exteriores",
      category: "Pintura",
      description:
        "Servicio profesional de pintura para interiores y exteriores. Trabajos de calidad con pinturas premium y acabados impecables.",
      price: "$12,000",
      rating: 4.8,
      reviewsCount: 62,
      zone: "Zona Sur, Zona Este",
      availability: "Lun-Vie",
    },
    {
      id: "3",
      professionalName: "Carlos Rodríguez",
      title: "Reparación de Plomería",
      category: "Plomería",
      description:
        "Reparación de fugas, destapación de cañerías, instalación de grifos y artefactos sanitarios. Servicio de emergencia disponible.",
      price: "$4,500",
      rating: 4.7,
      reviewsCount: 35,
      zone: "Zona Oeste, Centro",
      availability: "24/7",
    },
    {
      id: "4",
      professionalName: "Ana Martínez",
      title: "Carpintería a Medida",
      category: "Carpintería",
      description:
        "Diseño y fabricación de muebles a medida. Reparación de puertas, ventanas y todo tipo de trabajos en madera.",
      price: "$15,000",
      rating: 5.0,
      reviewsCount: 28,
      zone: "Zona Norte",
      availability: "Lun-Sáb",
    },
  ];

  const handleHire = (service: ServiceOffer) => {
    setSelectedService(null);
    toast.success("Solicitud enviada", {
      description: `Se ha enviado tu solicitud a ${service.professionalName}. Te responderá pronto.`,
    });
  };

  return (
    <div className="p-4 space-y-4 bg-[#0a0a0a] min-h-screen">
      {/* Header */}
      <div>
        <h2 className="text-white text-xl font-semibold">
          Bienvenido
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Tu hogar, tu oportunidad.
        </p>
      </div>

      {/* Filter badges */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-0 whitespace-nowrap font-medium">
          Todos
        </Badge>
        <Badge
          variant="outline"
          className="whitespace-nowrap border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
        >
          Electricidad
        </Badge>
        <Badge
          variant="outline"
          className="whitespace-nowrap border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
        >
          Plomería
        </Badge>
        <Badge
          variant="outline"
          className="whitespace-nowrap border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
        >
          Pintura
        </Badge>
        <Badge
          variant="outline"
          className="whitespace-nowrap border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
        >
          Carpintería
        </Badge>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {services.map((service) => (
          <Card
            key={service.id}
            className="bg-zinc-900 border border-zinc-700 cursor-pointer hover:shadow-lg hover:shadow-orange-500/20 transition-all"
            onClick={() => setSelectedService(service)}
          >
            <CardContent className="p-4">
              <div className="flex gap-3">
                {/* Professional Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white flex-shrink-0 text-lg">
                  {service.professionalName.charAt(0)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex-1">
                      <h3 className="text-white text-sm">
                        {service.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {service.professionalName}
                      </p>
                    </div>
                    <Badge className="bg-orange-500 text-white text-xs whitespace-nowrap border-0">
                      {service.category}
                    </Badge>
                  </div>

                  <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Info Row */}
                  <div className="flex items-center gap-3 mt-3 text-xs">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-orange-500 text-orange-500" />
                      <span className="text-white">
                        {service.rating}
                      </span>
                      <span className="text-gray-400">
                        ({service.reviewsCount})
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <MapPin className="w-3 h-3" />
                      <span>{service.zone.split(",")[0]}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{service.availability}</span>
                    </div>
                  </div>

                  {/* Price and Action */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-700">
                    <div>
                      <p className="text-xs text-gray-400">
                        Desde
                      </p>
                      <p className="text-orange-500 font-bold text-base">
                        {service.price}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className="h-8 bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                    >
                      Contratar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Service Detail Dialog */}
      <Dialog
        open={!!selectedService}
        onOpenChange={() => setSelectedService(null)}
      >
        <DialogContent className="max-w-[380px] bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle className="text-white">
              {selectedService?.title}
            </DialogTitle>
            <DialogDescription>
              <Badge className="bg-orange-500 text-white mt-2 border-0">
                {selectedService?.category}
              </Badge>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Professional Info */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold">
                {selectedService?.professionalName.charAt(0)}
              </div>
              <div>
                <p className="text-white text-sm font-medium">
                  {selectedService?.professionalName}
                </p>
                <div className="flex items-center gap-1 text-xs mt-1">
                  <Star className="w-3 h-3 fill-orange-500 text-orange-500" />
                  <span className="text-white">
                    {selectedService?.rating}
                  </span>
                  <span className="text-gray-400">
                    ({selectedService?.reviewsCount} reseñas)
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-sm text-gray-300 mb-3">
                {selectedService?.description}
              </p>
            </div>

            {/* Details */}
            <div className="space-y-2 py-3 border-y border-zinc-800">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">
                  Zona de trabajo:
                </span>
                <span className="text-white">
                  {selectedService?.zone}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">
                  Disponibilidad:
                </span>
                <span className="text-white">
                  {selectedService?.availability}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">
                  Precio desde:
                </span>
                <span className="text-orange-500 font-bold">
                  {selectedService?.price}
                </span>
              </div>
            </div>
          </div>

          <DialogFooter className="flex-col gap-2">
            <Button
              className="w-full bg-orange-500 hover:bg-orange-600"
              onClick={() =>
                selectedService && handleHire(selectedService)
              }
            >
              Solicitar Servicio
            </Button>
            <Button
              variant="outline"
              className="w-full border-zinc-700"
              onClick={() => setSelectedService(null)}
            >
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}