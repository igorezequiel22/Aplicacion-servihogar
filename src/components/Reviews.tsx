import { Star, ThumbsUp, HelpCircle, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { Professional } from '../App';

type ReviewsProps = {
  professional: Professional;
};

type Review = {
  id: string;
  clientName: string;
  clientPhoto: string;
  rating: number;
  service: string;
  comment: string;
  date: string;
  helpful: number;
};

export default function Reviews({ professional }: ReviewsProps) {
  // Mock reviews data
  const reviews: Review[] = [
    {
      id: '1',
      clientName: 'Roberto Silva',
      clientPhoto: 'https://ui-avatars.com/api/?name=Roberto+Silva&size=100&background=random',
      rating: 5,
      service: 'Instalación Eléctrica',
      comment:
        'Excelente profesional, muy puntual y el trabajo quedó impecable. Lo recomiendo totalmente.',
      date: '2025-10-15',
      helpful: 8,
    },
    {
      id: '2',
      clientName: 'Laura Fernández',
      clientPhoto: 'https://ui-avatars.com/api/?name=Laura+Fernandez&size=100&background=random',
      rating: 5,
      service: 'Reparación de Plomería',
      comment:
        'Muy buena atención y resolvió el problema rápidamente. Precio justo y trabajo de calidad.',
      date: '2025-10-12',
      helpful: 5,
    },
    {
      id: '3',
      clientName: 'Ana Martínez',
      clientPhoto: 'https://ui-avatars.com/api/?name=Ana+Martinez&size=100&background=random',
      rating: 4,
      service: 'Pintura de Interior',
      comment:
        'Buen trabajo en general. El acabado es bueno aunque tardó un poco más de lo esperado.',
      date: '2025-10-08',
      helpful: 3,
    },
    {
      id: '4',
      clientName: 'Carlos Rodríguez',
      clientPhoto: 'https://ui-avatars.com/api/?name=Carlos+Rodriguez&size=100&background=random',
      rating: 5,
      service: 'Instalación de Ventilador',
      comment:
        'Muy profesional y explicó todo el proceso. El ventilador funciona perfectamente.',
      date: '2025-10-05',
      helpful: 6,
    },
    {
      id: '5',
      clientName: 'María González',
      clientPhoto: 'https://ui-avatars.com/api/?name=Maria+Gonzalez&size=100&background=random',
      rating: 5,
      service: 'Reparación Eléctrica',
      comment: 'Resolvió un problema complicado que otros no pudieron. ¡Muy recomendable!',
      date: '2025-10-01',
      helpful: 10,
    },
    {
      id: '6',
      clientName: 'Diego Martín',
      clientPhoto: 'https://ui-avatars.com/api/?name=Diego+Martin&size=100&background=random',
      rating: 4,
      service: 'Cambio de Llaves',
      comment: 'Trabajo bien hecho y precio razonable. Quizás podría mejorar la comunicación.',
      date: '2025-09-28',
      helpful: 2,
    },
  ];

  const averageRating = 4.8;
  const totalReviews = reviews.length;

  const ratingDistribution = [
    { stars: 5, count: 20, percentage: 80 },
    { stars: 4, count: 4, percentage: 16 },
    { stars: 3, count: 1, percentage: 4 },
    { stars: 2, count: 0, percentage: 0 },
    { stars: 1, count: 0, percentage: 0 },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-white">Valoraciones y Reseñas</h2>
        <p className="text-gray-400 mt-1">Mira lo que tus clientes dicen sobre tu trabajo</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rating Summary */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Calificación General</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="text-5xl text-white">{averageRating}</span>
                  <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                </div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {renderStars(5)}
                </div>
                <p className="text-sm text-gray-600">
                  Basado en {totalReviews} valoraciones
                </p>
              </div>

              <Separator className="my-6" />

              <div className="space-y-3">
                {ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-12">
                      <span className="text-sm text-gray-600">{item.stars}</span>
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    </div>
                    <Progress value={item.percentage} className="flex-1" />
                    <span className="text-sm text-gray-600 w-8 text-right">{item.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Help Card */}
          <Alert>
            <HelpCircle className="w-4 h-4" />
            <AlertDescription className="text-sm">
              <p className="text-white mb-1">Acceso a Ayuda</p>
              <p className="text-gray-400 mb-3">
                ¿Tienes preguntas sobre cómo funciona la plataforma o necesitas asistencia?
              </p>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <MessageSquare className="w-4 h-4" />
                Contactar Soporte
              </Button>
            </AlertDescription>
          </Alert>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Todas las Reseñas</CardTitle>
              <CardDescription>
                Comentarios y valoraciones de tus clientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {reviews.map((review, index) => (
                  <div key={review.id}>
                    <div className="flex items-start gap-4">
                      <img
                        src={review.clientPhoto}
                        alt={review.clientName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <p className="text-white">{review.clientName}</p>
                            <p className="text-sm text-gray-400">{review.service}</p>
                          </div>
                          <Badge variant="outline" className="shrink-0">
                            {new Date(review.date).toLocaleDateString('es-ES', {
                              month: 'short',
                              year: 'numeric',
                            })}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-0.5">{renderStars(review.rating)}</div>
                          <span className="text-sm text-gray-600">{review.rating}.0</span>
                        </div>

                        <p className="text-sm text-gray-300 mb-3">{review.comment}</p>

                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                            <ThumbsUp className="w-4 h-4" />
                            <span>Útil ({review.helpful})</span>
                          </button>
                          <button className="text-sm text-gray-400 hover:text-white transition-colors">
                            Responder
                          </button>
                        </div>
                      </div>
                    </div>

                    {index < reviews.length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tips Card */}
      <Card className="border-green-500/50 bg-green-950/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-950 flex items-center justify-center text-green-400 shrink-0">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-green-200">Consejos para mejorar tus valoraciones</p>
              <ul className="text-xs text-green-300 mt-2 space-y-1 list-disc list-inside">
                <li>Sé puntual y cumple con los horarios acordados</li>
                <li>Comunícate claramente con tus clientes</li>
                <li>Ofrece presupuestos detallados y transparentes</li>
                <li>Mantén limpio el área de trabajo</li>
                <li>Pide feedback después de cada trabajo</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
