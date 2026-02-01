import { useState } from "react";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Professional } from "../App";

type OnboardingFormProps = {
  onComplete: (
    data: Omit<
      Professional,
      "id" | "services" | "rating" | "reviewsCount"
    >,
  ) => void;
};

export default function OnboardingForm({
  onComplete,
}: OnboardingFormProps) {
  const [currentScreen, setCurrentScreen] = useState<
    "welcome" | "login" | "register" | "form"
  >("welcome");
  const [step, setStep] = useState(1);
  const [showSuccessPopup, setShowSuccessPopup] =
    useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [formData, setFormData] = useState({
    name: "Usuario Demo",
    email: "demo@ejemplo.com",
    phone: "+54 11 1234-5678",
    specialty: [] as string[],
    experience: "",
    certifications: "",
    workZone: [] as string[],
    paymentMethods: [] as string[],
    availability: "Lunes a Viernes, 9:00 - 18:00",
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

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleLogin = () => {
    setFormData({
      ...formData,
      name: "Jorge González",
      email: "jorge@ejemplo.com",
      phone: "+54 11 5555-1234",
    });
    onComplete({
      name: "Jorge González",
      email: "jorge@ejemplo.com",
      phone: "+54 11 5555-1234",
      specialty: ["Electricidad", "Plomería"],
      experience: "5 años",
      certifications: "Certificado en instalaciones eléctricas",
      workZone: ["Zona Norte", "Centro"],
      paymentMethods: ["Efectivo", "Mercado Pago"],
      availability: "Lunes a Viernes, 9:00 - 18:00",
    });
  };

  const handleRegisterSubmit = () => {
    setFormData({
      ...formData,
      name: registerData.name,
      email: registerData.email,
      phone: registerData.phone,
    });
    setCurrentScreen("form");
  };

  const handleSubmit = () => {
    setShowSuccessPopup(true);
  };

  const handlePublishService = () => {
    onComplete(formData);
  };

  const handleViewProfile = () => {
    onComplete(formData);
  };

  const toggleArrayItem = (array: string[], item: string) => {
    return array.includes(item)
      ? array.filter((i) => i !== item)
      : [...array, item];
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return (
          formData.specialty.length > 0 && formData.experience
        );
      case 2:
        return formData.workZone.length > 0;
      case 3:
        return formData.paymentMethods.length > 0;
      default:
        return false;
    }
  };

  if (currentScreen === "welcome") {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60 blur-overlay" />

        <div className="relative z-10 w-full max-w-md">
          <div className="text-center mb-8 animate-fade-in">
            <img
              src="https://igorezequiel22.github.io/Tiendita-unpaz/img/logo.png"
              alt="SERVIHOGAR Logo"
              className="w-48 h-auto mx-auto mb-4"
            />
          </div>

          <div className="glass-card rounded-3xl p-6 shadow-2xl space-y-4 animate-fade-in">
            <p className="text-center text-white text-lg mb-6">
              Seleccione método de inicio de sesión preferido
            </p>

            <Button
              onClick={() => setCurrentScreen("login")}
              className="w-full h-12 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl"
              size="lg"
            >
              Iniciar sesión con mi cuenta
            </Button>

            <Button
              onClick={() => setCurrentScreen("register")}
              className="w-full h-12 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl"
              size="lg"
            >
              Registrarme
            </Button>

            <Button
              variant="outline"
              className="w-full h-12 bg-white hover:bg-gray-100 text-black rounded-xl border-0 flex items-center justify-center gap-2"
              size="lg"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Iniciar sesión con google
            </Button>

            <p className="text-xs text-center text-gray-400 mt-4">
              Al usar esta aplicación, aceptas nuestros términos
              y condiciones y nuestra política de privacidad.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === "login") {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60 blur-overlay" />

        <div className="relative z-10 w-full max-w-md">
          <div className="text-center mb-8 animate-fade-in">
            <img
              src="https://igorezequiel22.github.io/Tiendita-unpaz/img/logo.png"
              alt="SERVIHOGAR Logo"
              className="w-40 h-auto mx-auto mb-4"
            />
          </div>

          <div className="glass-card rounded-3xl p-6 shadow-2xl space-y-4 animate-fade-in">
            <h2 className="text-xl font-semibold text-white mb-4">
              Inicia sesión con tu cuenta
            </h2>

            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Correo"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    email: e.target.value,
                  })
                }
                className="h-12 bg-zinc-900 border-zinc-800 text-white rounded-xl"
              />

              <Input
                type="password"
                placeholder="Contraseña"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    password: e.target.value,
                  })
                }
                className="h-12 bg-zinc-900 border-zinc-800 text-white rounded-xl"
              />

              <button className="text-sm text-blue-400 hover:underline">
                Olvidé mi contraseña
              </button>
            </div>

            <Button
              onClick={handleLogin}
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-xl mt-6"
              size="lg"
            >
              Iniciar sesión
            </Button>

            <Button
              onClick={() => setCurrentScreen("welcome")}
              variant="ghost"
              className="w-full h-12 text-white bg-black hover:bg-zinc-900 rounded-xl"
              size="lg"
            >
              Volver
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === "register") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-zinc-950 via-zinc-900 to-orange-950/20">
        <div className="w-full max-w-md">
          <div className="text-center mb-6 animate-fade-in">
            <img
              src="https://igorezequiel22.github.io/Tiendita-unpaz/img/logo.png"
              alt="SERVIHOGAR Logo"
              className="w-32 h-auto mx-auto mb-3"
            />
          </div>

          <Card className="border-zinc-800 bg-zinc-900/80 backdrop-blur-xl animate-fade-in">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl text-white">
                Registro de Profesional
              </CardTitle>
              <CardDescription className="text-gray-400">
                Completa tu perfil para comenzar a ofrecer tus
                servicios
              </CardDescription>
              <div className="flex items-center gap-2 mt-4">
                <div className="h-1 flex-1 rounded-full bg-orange-500" />
                <div className="h-1 flex-1 rounded-full bg-zinc-800" />
                <div className="h-1 flex-1 rounded-full bg-zinc-800" />
                <div className="h-1 flex-1 rounded-full bg-zinc-800" />
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Paso 1 de 4
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Nombre Completo *
                </Label>
                <Input
                  id="name"
                  placeholder="Juan Pérez"
                  value={registerData.name}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      name: e.target.value,
                    })
                  }
                  className="h-11 bg-zinc-800 border-zinc-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="juan@ejemplo.com"
                  value={registerData.email}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      email: e.target.value,
                    })
                  }
                  className="h-11 bg-zinc-800 border-zinc-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">
                  Teléfono *
                </Label>
                <Input
                  id="phone"
                  placeholder="+54 11 1234-5678"
                  value={registerData.phone}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      phone: e.target.value,
                    })
                  }
                  className="h-11 bg-zinc-800 border-zinc-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-white"
                >
                  Contraseña *
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••••••"
                  value={registerData.password}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      password: e.target.value,
                    })
                  }
                  className="h-11 bg-zinc-800 border-zinc-700 text-white"
                />
              </div>

              <div className="flex items-center justify-between gap-4 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentScreen("welcome")}
                  className="gap-2 border-zinc-700 text-white hover:bg-zinc-800"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Anterior
                </Button>

                <Button
                  onClick={handleRegisterSubmit}
                  disabled={
                    !registerData.name ||
                    !registerData.email ||
                    !registerData.phone ||
                    !registerData.password
                  }
                  className="gap-2 bg-orange-500 hover:bg-orange-600"
                >
                  Siguiente
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-zinc-950 via-zinc-900 to-orange-950/20">
        <Card className="w-full max-w-2xl border-zinc-800 bg-zinc-900/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">
              Registro de Profesional
            </CardTitle>
            <CardDescription className="text-gray-400">
              Completa tu perfil para comenzar a ofrecer tus
              servicios
            </CardDescription>

            <div className="flex items-center gap-2 mt-6">
              <div className="h-1 flex-1 rounded-full bg-orange-500" />
              {[2, 3, 4].map((s) => (
                <div
                  key={s}
                  className="flex items-center flex-1"
                >
                  <div
                    className={`h-1 flex-1 rounded-full ${
                      s <= step + 1
                        ? "bg-orange-500"
                        : "bg-zinc-800"
                    }`}
                  />
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Paso {step + 1} de 4
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="space-y-3">
                  <Label className="text-white">
                    Especialidades * (selecciona una o más)
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {specialties.map((specialty) => (
                      <div
                        key={specialty}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={specialty}
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
                          htmlFor={specialty}
                          className="text-sm cursor-pointer text-gray-300"
                        >
                          {specialty}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="experience"
                    className="text-white"
                  >
                    Años de Experiencia *
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
                    placeholder="5 años"
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="certifications"
                    className="text-white"
                  >
                    Certificaciones (opcional)
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
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="space-y-3">
                  <Label className="text-white">
                    Zonas de Trabajo * (selecciona una o más)
                  </Label>
                  <div className="space-y-3">
                    {zones.map((zone) => (
                      <div
                        key={zone}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={zone}
                          checked={formData.workZone.includes(
                            zone,
                          )}
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
                          htmlFor={zone}
                          className="text-sm cursor-pointer text-gray-300"
                        >
                          {zone}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="availability"
                    className="text-white"
                  >
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
                    placeholder="Lunes a Viernes, 9:00 - 18:00"
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="space-y-3">
                  <Label className="text-white">
                    Métodos de Pago Aceptados * (selecciona uno
                    o más)
                  </Label>
                  <div className="space-y-3">
                    {paymentOptions.map((method) => (
                      <div
                        key={method}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={method}
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
                          htmlFor={method}
                          className="text-sm cursor-pointer text-gray-300"
                        >
                          {method}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-orange-950/50 border border-orange-500/50 rounded-lg p-4 mt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-orange-200">
                        ¡Casi listo!
                      </p>
                      <p className="text-sm text-orange-300 mt-1">
                        Una vez que completes el registro,
                        podrás editar tu perfil, agregar fotos y
                        publicar tus servicios.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between gap-4 pt-6 border-t border-zinc-800">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={step === 1}
                className="gap-2 border-zinc-700 text-white hover:bg-zinc-800"
              >
                <ArrowLeft className="w-4 h-4" />
                Anterior
              </Button>

              {step < 3 ? (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="gap-2 bg-orange-500 hover:bg-orange-600"
                >
                  Siguiente
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!isStepValid()}
                  className="gap-2 bg-orange-500 hover:bg-orange-600"
                >
                  Completar Registro
                  <CheckCircle2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-gradient-to-br from-orange-950 to-zinc-900 rounded-3xl p-12 max-w-2xl w-full text-center shadow-2xl border border-orange-500/30 animate-fade-in">
            <div className="w-32 h-32 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <CheckCircle2 className="w-20 h-20 text-white" />
            </div>

            <h2 className="text-4xl font-bold text-white mb-4">
              ¡Tu perfil está listo!
            </h2>

            <p className="text-gray-300 text-lg mb-10">
              Ya puedes empezar a ofrecer tus servicios y
              conectar con nuevos clientes
            </p>

            <div className="space-y-4">
              <Button
                className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white text-lg rounded-xl"
                onClick={handlePublishService}
              >
                Publicar mi primer servicio
              </Button>

              <Button
                variant="ghost"
                className="w-full h-14 text-white text-lg hover:bg-white/10 rounded-xl"
                onClick={handleViewProfile}
              >
                Ver mi perfil
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}