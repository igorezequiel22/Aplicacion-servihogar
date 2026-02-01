import { useState } from 'react';
import { Plus, Edit2, Trash2, Image as ImageIcon, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import { Professional, Service } from '../App';

type ServicePublisherProps = {
  professional: Professional;
  onUpdate: (updates: Partial<Professional>) => void;
};

export default function ServicePublisher({ professional, onUpdate }: ServicePublisherProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    images: [] as string[],
  });

  const categories = [
    'Albañilería',
    'Electricidad',
    'Plomería',
    'Pintura',
    'Carpintería',
    'Jardinería',
    'Limpieza',
    'Reparaciones Generales',
  ];

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      description: '',
      price: '',
      images: [],
    });
    setEditingService(null);
  };

  const handleOpenDialog = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        title: service.title,
        category: service.category,
        description: service.description,
        price: service.price,
        images: service.images,
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setTimeout(resetForm, 200);
  };

  const handleAddImage = () => {
    // Simulate image upload with placeholder
    const newImage = `https://source.unsplash.com/800x600/?${formData.category || 'construction'},work`;
    setFormData({ ...formData, images: [...formData.images, newImage] });
    toast.success('Imagen agregada');
  };

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleSaveService = () => {
    if (!formData.title || !formData.category || !formData.description || !formData.price) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    const services = [...professional.services];

    if (editingService) {
      const index = services.findIndex((s) => s.id === editingService.id);
      services[index] = {
        ...editingService,
        ...formData,
      };
      toast.success('Servicio actualizado exitosamente');
    } else {
      const newService: Service = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
      };
      services.push(newService);
      toast.success('Servicio publicado exitosamente');
    }

    onUpdate({ services });
    handleCloseDialog();
  };

  const handleDeleteService = (serviceId: string) => {
    const services = professional.services.filter((s) => s.id !== serviceId);
    onUpdate({ services });
    toast.success('Servicio eliminado');
  };

  return (
    <div className="p-4 space-y-6 bg-zinc-950 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-xl">Mis Servicios</h2>
          <p className="text-gray-400 mt-1 text-sm">Publica y gestiona los servicios que ofreces</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="gap-2 bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4" />
              Nuevo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[380px] max-h-[90vh] overflow-y-auto bg-zinc-900 border-zinc-800">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingService ? 'Editar Servicio' : 'Publicar Nuevo Servicio'}
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Completa la información del servicio que deseas ofrecer
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">Título del Servicio *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ej: Instalación eléctrica residencial"
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-white">Categoría *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="text-white">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">Descripción *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe en detalle el servicio que ofreces, incluye qué está incluido y qué no..."
                  rows={4}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-white">Precio Orientativo *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="Ej: $5000 o Desde $3000/hora"
                    className="pl-9 bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Puedes indicar un precio fijo o un rango estimado
                </p>
              </div>

              <div className="space-y-2">
                <Label>Imágenes del Servicio</Label>
                <div className="grid grid-cols-3 gap-3">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group aspect-square">
                      <img
                        src={image}
                        alt={`Service ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg border border-zinc-800"
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {formData.images.length < 6 && (
                    <button
                      onClick={handleAddImage}
                      className="aspect-square border-2 border-dashed border-zinc-700 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-orange-500 hover:bg-orange-950/30 transition-colors"
                    >
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                      <span className="text-xs text-gray-600">Agregar</span>
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500">Máximo 6 imágenes</p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleCloseDialog}>
                Cancelar
              </Button>
              <Button onClick={handleSaveService}>
                {editingService ? 'Actualizar' : 'Publicar'} Servicio
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Services Grid */}
      {professional.services.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {professional.services.map((service) => (
            <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-zinc-900 border-zinc-800">
              {service.images.length > 0 && (
                <div className="aspect-video overflow-hidden bg-zinc-950">
                  <img
                    src={service.images[0]}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base text-white line-clamp-1">{service.title}</CardTitle>
                    <Badge className="mt-2 bg-orange-500 text-white border-0">
                      {service.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400 line-clamp-3 mb-4">{service.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-orange-500">{service.price}</p>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenDialog(service)}
                      className="border-zinc-700 hover:bg-zinc-800"
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteService(service.id)}
                      className="border-red-500 text-red-500 hover:bg-red-950/50"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="py-12">
            <div className="text-center text-gray-500">
              <Plus className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p className="text-gray-400">No has publicado ningún servicio todavía</p>
              <p className="text-sm mt-2 text-gray-500">Comienza agregando tu primer servicio</p>
              <Button
                onClick={() => handleOpenDialog()}
                variant="outline"
                className="mt-4 gap-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
              >
                <Plus className="w-4 h-4" />
                Publicar Servicio
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}