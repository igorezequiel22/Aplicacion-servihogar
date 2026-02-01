import { useState, useRef } from "react";
import { Camera, Save, CheckCircle2, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { toast } from "sonner@2.0.3";
import { Professional } from "../App";

type ProfileEditorProps = {
  professional: Professional;
  onUpdate: (updates: Partial<Professional>) => void;
};

export default function ProfileEditor({
  professional,
  onUpdate,
}: ProfileEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: professional.name,
    email: professional.email,
    phone: professional.phone,
    photo: professional.photo || "",
    description: professional.description || "",
    specialty: professional.specialty,
    experience: professional.experience,
    certifications: professional.certifications,
    workZone: professional.workZone,
    availability: professional.availability,
    paymentMethods: professional.paymentMethods,
  });

  const specialties = [
    "Albañilería",
    "Electricidad",
    "Plomería",
    "Pintura",
    "Carpintería",
    "Jardinería",
    "Limpieza",
    "Reparaciones Generales",
  ];

  const zones = [
    "Zona Norte",
    "Zona Sur",
    "Zona Este",
    "Zona Oeste",
    "Centro",
  ];

  const paymentOptions = [
    "Efectivo",
    "Transferencia Bancaria",
    "Mercado Pago",
    "PayPal",
    "Tarjeta de Crédito/Débito",
  ];

  const toggleArrayItem = (array: string[], item: string) => {
    return array.includes(item)
      ? array.filter((i) => i !== item)
      : [...array, item];
  };

  const handleSave = () => {
    onUpdate(formData);
    toast.success("Perfil actualizado exitosamente");
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("La imagen debe ser menor a 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          photo: reader.result as string,
        });
        toast.success("Foto actualizada");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setFormData({ ...formData, photo: "" });
    toast.success("Foto eliminada");
  };

  return (
    <div className="p-4 space-y-6 bg-zinc-950 min-h-screen">
      <div>
        <h2 className="text-white text-xl">Mi Perfil</h2>
        <p className="text-gray-400 mt-1 text-sm">
          Edita tu información profesional
        </p>
      </div>

      {/* Profile Photo */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-base text-white">
            Foto de Perfil
          </CardTitle>
          <CardDescription className="text-xs text-gray-400">
            Agrega una foto profesional para tu perfil
          </CardDescription>
        </CardHeader>
        <CardContent>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
          <div className="flex items-center gap-6">
            <div className="relative">
              {formData.photo ? (
                <>
                  <img
                    src={formData.photo}
                    alt={formData.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-zinc-800"
                  />
                  <button
                    onClick={handleRemovePhoto}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-3xl border-4 border-zinc-800">
                  {formData.name.charAt(0)}
                </div>
              )}
              <button
                onClick={handlePhotoClick}
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center hover:bg-orange-700 transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <Button
                onClick={handlePhotoClick}
                variant="outline"
                className="gap-2 h-9 text-sm"
              >
                <Camera className="w-4 h-4" />
                Cambiar Foto
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                Recomendado: imagen de 400x400px, formato JPG o
                PNG
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-base text-white">
            Información Básica
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm text-white">
                Nombre Completo
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="h-10 bg-zinc-800 border-zinc-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm text-white">
                Teléfono
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
                className="h-10 bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="h-10 bg-zinc-800 border-zinc-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm text-white">
              Descripción Profesional
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              placeholder="Describe tu experiencia, habilidades y lo que te hace único como profesional..."
              rows={4}
              className="bg-zinc-800 border-zinc-700 text-white"
            />
            <p className="text-xs text-gray-500">
              Esta descripción será visible para los clientes en
              tu perfil
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Professional Information */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-base text-white">
            Información Profesional
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label className="text-sm text-white">Especialidades</Label>
            <div className="grid grid-cols-2 gap-3">
              {specialties.map((specialty) => (
                <div
                  key={specialty}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={`specialty-${specialty}`}
                    checked={formData.specialty.includes(
                      specialty,
                    )}
                    onCheckedChange={() =>
                      setFormData({
                        ...formData,
                        specialty: toggleArrayItem(
                          formData.specialty,
                          specialty,
                        ),
                      })
                    }
                  />
                  <label
                    htmlFor={`specialty-${specialty}`}
                    className="text-sm cursor-pointer text-white"
                  >
                    {specialty}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="experience" className="text-sm text-white">
                Años de Experiencia
              </Label>
              <Input
                id="experience"
                value={formData.experience}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    experience: e.target.value,
                  })
                }
                className="h-10 bg-zinc-800 border-zinc-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability" className="text-sm text-white">
                Disponibilidad Horaria
              </Label>
              <Input
                id="availability"
                value={formData.availability}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    availability: e.target.value,
                  })
                }
                className="h-10 bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="certifications" className="text-sm text-white">
              Certificaciones
            </Label>
            <Textarea
              id="certifications"
              value={formData.certifications}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  certifications: e.target.value,
                })
              }
              placeholder="Menciona tus certificaciones, cursos o títulos relevantes"
              rows={3}
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Work Zones */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-base text-white">
            Zonas de Trabajo
          </CardTitle>
          <CardDescription className="text-xs text-gray-400">
            Selecciona las zonas donde ofreces tus servicios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {zones.map((zone) => (
              <div
                key={zone}
                className="flex items-center space-x-2"
              >
                <Checkbox
                  id={`zone-${zone}`}
                  checked={formData.workZone.includes(zone)}
                  onCheckedChange={() =>
                    setFormData({
                      ...formData,
                      workZone: toggleArrayItem(
                        formData.workZone,
                        zone,
                      ),
                    })
                  }
                />
                <label
                  htmlFor={`zone-${zone}`}
                  className="text-sm cursor-pointer text-white"
                >
                  {zone}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-base text-white">
            Métodos de Pago
          </CardTitle>
          <CardDescription className="text-xs text-gray-400">
            Métodos de pago que aceptas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {paymentOptions.map((method) => (
              <div
                key={method}
                className="flex items-center space-x-2"
              >
                <Checkbox
                  id={`payment-${method}`}
                  checked={formData.paymentMethods.includes(
                    method,
                  )}
                  onCheckedChange={() =>
                    setFormData({
                      ...formData,
                      paymentMethods: toggleArrayItem(
                        formData.paymentMethods,
                        method,
                      ),
                    })
                  }
                />
                <label
                  htmlFor={`payment-${method}`}
                  className="text-sm cursor-pointer text-white"
                >
                  {method}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-4 pb-4">
        <Button
          onClick={handleSave}
          size="lg"
          className="gap-2 bg-orange-500 hover:bg-orange-600"
        >
          <Save className="w-4 h-4" />
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
}