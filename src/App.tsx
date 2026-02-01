import { useState, useEffect } from "react";
import {
  Calendar,
  MessageSquare,
  Settings,
  Star,
  CreditCard,
  Menu,
  X,
  Search,
  Plus,
  Briefcase,
  ArrowLeft,
  Home,
  LogOut,
} from "lucide-react";
import OnboardingForm from "./components/OnboardingForm";
import Dashboard from "./components/Dashboard";
import Marketplace from "./components/Marketplace";
import ProfileEditor from "./components/ProfileEditor";
import ServicePublisher from "./components/ServicePublisher";
import RequestsInbox from "./components/RequestsInbox";
import CalendarView from "./components/CalendarView";
import PaymentSettings from "./components/PaymentSettings";
import Reviews from "./components/Reviews";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/sonner";

export type Professional = {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string[];
  experience: string;
  certifications: string;
  workZone: string[];
  paymentMethods: string[];
  photo?: string;
  description?: string;
  services: Service[];
  availability: string;
  rating: number;
  reviewsCount: number;
};

export type Service = {
  id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  images: string[];
};

export type Request = {
  id: string;
  clientName: string;
  clientPhoto?: string;
  service: string;
  description: string;
  date: string;
  status: "pending" | "accepted" | "rejected" | "completed";
  messages: Message[];
};

export type Message = {
  id: string;
  sender: "client" | "professional";
  text: string;
  timestamp: string;
};

export default function App() {
  const [currentView, setCurrentView] = useState<
    | "onboarding"
    | "marketplace"
    | "dashboard"
    | "profile"
    | "services"
    | "requests"
    | "calendar"
    | "payments"
    | "reviews"
  >("onboarding");
  const [professional, setProfessional] =
    useState<Professional | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOnboardingComplete = (
    data: Omit<
      Professional,
      "id" | "services" | "rating" | "reviewsCount"
    >,
  ) => {
    const newProfessional: Professional = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      services: [],
      rating: 0,
      reviewsCount: 0,
    };
    setProfessional(newProfessional);
    setCurrentView("marketplace");
  };

  const handleUpdateProfessional = (
    updates: Partial<Professional>,
  ) => {
    if (professional) {
      setProfessional({ ...professional, ...updates });
    }
  };

  const handleBackToHome = () => {
    setCurrentView("marketplace");
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setProfessional(null);
    setCurrentView("onboarding");
    setMobileMenuOpen(false);
  };

  // Manejar el botón "Atrás" del navegador
  useEffect(() => {
    if (!professional || currentView === "onboarding") return;

    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();

      // Si no estamos en marketplace (home), volver al home
      if (currentView !== "marketplace") {
        setCurrentView("marketplace");
      }
    };

    // Agregar estado al historial cuando cambiamos de vista
    window.history.pushState({ view: currentView }, "");

    // Escuchar el evento popstate (botón atrás del navegador)
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [currentView, professional]);

  if (!professional || currentView === "onboarding") {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="w-full max-w-[430px] min-h-screen bg-gradient-to-br from-black via-zinc-900 to-orange-950">
          <OnboardingForm
            onComplete={handleOnboardingComplete}
          />
        </div>
        <Toaster />
      </div>
    );
  }

  const menuItems = [
    { id: "marketplace", label: "Explorar", icon: Search },
    { id: "dashboard", label: "Mis Trabajos", icon: Home },
    {
      id: "requests",
      label: "Solicitudes",
      icon: MessageSquare,
    },
    { id: "calendar", label: "Agenda", icon: Calendar },
    { id: "profile", label: "Mi Perfil", icon: Settings },
  ];

  const moreMenuItems = [
    { id: "services", label: "Mis Servicios", icon: Briefcase },
    { id: "payments", label: "Pagos", icon: CreditCard },
    { id: "reviews", label: "Valoraciones", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-zinc-950 flex flex-col relative">
        <Toaster />

        {/* Header con botón volver arriba */}
        <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-40 flex-shrink-0">
          <div className="px-4 py-3 flex items-center justify-between">
            {currentView !== "marketplace" ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToHome}
                className="text-white hover:text-orange-500 hover:bg-transparent p-0 h-auto gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm">Volver</span>
              </Button>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  <svg
                    viewBox="0 0 512 512"
                    className="w-10 h-10"
                  >
                    <defs>
                      <style>
                        {`.cls-1{fill:#ff6b00;}.cls-2{fill:#fff;}`}
                      </style>
                    </defs>
                    <path
                      className="cls-1"
                      d="M256,0C114.84,0,0,114.84,0,256S114.84,512,256,512,512,397.16,512,256,397.16,0,256,0Z"
                    />
                    <path
                      className="cls-2"
                      d="M389.09,195.09l-105.45-105.45c-14.91-14.91-39.37-14.91-54.28,0l-105.45,105.45c-7.45,7.45-7.45,19.64,0,27.09,7.45,7.45,19.64,7.45,27.09,0l74.91-74.91v237.82c0,10.55,8.55,19.09,19.09,19.09s19.09-8.55,19.09-19.09V147.27l74.91,74.91c3.73,3.73,8.64,5.45,13.55,5.45s9.82-1.82,13.55-5.45c7.45-7.45,7.45-19.64,0-27.09Z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white">SERVIHOGAR</p>
                  <p className="text-xs text-gray-400">
                    {currentView === "marketplace"
                      ? "Explorar Servicios"
                      : currentView === "dashboard"
                        ? "Mis Trabajos"
                        : currentView === "requests"
                          ? "Solicitudes"
                          : currentView === "calendar"
                            ? "Mi Agenda"
                            : currentView === "profile"
                              ? "Mi Perfil"
                              : currentView === "services"
                                ? "Mis Servicios"
                                : currentView === "payments"
                                  ? "Pagos"
                                  : "Valoraciones"}
                  </p>
                </div>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-orange-500 hover:bg-transparent"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>

          {mobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-zinc-900 border-b border-zinc-800 shadow-lg">
              <nav className="px-4 py-3 space-y-1">
                <p className="text-xs text-gray-400 px-2 mb-2">
                  Navegación Principal
                </p>
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant={
                        currentView === item.id
                          ? "default"
                          : "ghost"
                      }
                      onClick={() => {
                        setCurrentView(item.id as any);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full justify-start gap-3"
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Button>
                  );
                })}

                <div className="py-2">
                  <div className="h-px bg-zinc-800" />
                </div>

                <p className="text-xs text-gray-400 px-2 mb-2">
                  Más Opciones
                </p>
                {moreMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant={
                        currentView === item.id
                          ? "default"
                          : "ghost"
                      }
                      onClick={() => {
                        setCurrentView(item.id as any);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full justify-start gap-3"
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Button>
                  );
                })}

                <div className="py-2">
                  <div className="h-px bg-zinc-800" />
                </div>

                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-red-950/50"
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar Sesión
                </Button>
              </nav>
            </div>
          )}
        </header>

        <div className="flex-1 pb-20 overflow-y-auto">
          {currentView === "marketplace" && <Marketplace />}
          {currentView === "dashboard" && (
            <Dashboard
              professional={professional}
              onNavigate={setCurrentView}
            />
          )}
          {currentView === "profile" && (
            <ProfileEditor
              professional={professional}
              onUpdate={handleUpdateProfessional}
            />
          )}
          {currentView === "services" && (
            <ServicePublisher
              professional={professional}
              onUpdate={handleUpdateProfessional}
            />
          )}
          {currentView === "requests" && (
            <RequestsInbox professional={professional} />
          )}
          {currentView === "calendar" && (
            <CalendarView professional={professional} />
          )}
          {currentView === "payments" && (
            <PaymentSettings
              professional={professional}
              onUpdate={handleUpdateProfessional}
            />
          )}
          {currentView === "reviews" && (
            <Reviews professional={professional} />
          )}
        </div>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-zinc-900 border-t border-zinc-800 z-50">
          <div className="flex items-center justify-around px-2 py-2">
            <button
              onClick={() => setCurrentView("marketplace")}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                currentView === "marketplace"
                  ? "text-orange-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-[10px]">Home</span>
            </button>

            <button
              onClick={() => setCurrentView("dashboard")}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                currentView === "dashboard"
                  ? "text-orange-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Briefcase className="w-5 h-5" />
              <span className="text-[10px]">Trabajos</span>
            </button>

            <button
              onClick={() => setCurrentView("services")}
              className="flex flex-col items-center gap-1 -mt-4"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/50">
                <Plus className="w-7 h-7 text-white stroke-[3]" />
              </div>
              <span className="text-[10px] text-gray-400 mt-1">
                Publicar
              </span>
            </button>

            <button
              onClick={() => setCurrentView("calendar")}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                currentView === "calendar"
                  ? "text-orange-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span className="text-[10px]">Agenda</span>
            </button>

            <button
              onClick={() => setCurrentView("requests")}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                currentView === "requests"
                  ? "text-orange-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span className="text-[10px]">Solicitudes</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}