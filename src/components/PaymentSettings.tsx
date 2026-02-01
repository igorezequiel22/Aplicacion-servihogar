import { useState } from 'react';
import { CreditCard, DollarSign, TrendingUp, CheckCircle2, Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { toast } from 'sonner@2.0.3';
import { Professional } from '../App';

type PaymentSettingsProps = {
  professional: Professional;
  onUpdate: (updates: Partial<Professional>) => void;
};

type PaymentAccount = {
  id: string;
  type: 'bank' | 'mercadopago' | 'paypal' | 'other';
  name: string;
  accountInfo: string;
  isDefault: boolean;
};

type PaymentRecord = {
  id: string;
  date: string;
  clientName: string;
  service: string;
  amount: number;
  method: string;
  status: 'pending' | 'completed' | 'cancelled';
};

export default function PaymentSettings({ professional, onUpdate }: PaymentSettingsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<PaymentAccount | null>(null);

  const [paymentAccounts, setPaymentAccounts] = useState<PaymentAccount[]>([
    {
      id: '1',
      type: 'bank',
      name: 'Banco Nación',
      accountInfo: 'CBU: 0110599520000012345678',
      isDefault: true,
    },
    {
      id: '2',
      type: 'mercadopago',
      name: 'Mercado Pago',
      accountInfo: 'CVU: 0000003100012345678901',
      isDefault: false,
    },
  ]);

  const [formData, setFormData] = useState({
    type: '',
    name: '',
    accountInfo: '',
  });

  // Mock payment records
  const paymentRecords: PaymentRecord[] = [
    {
      id: '1',
      date: '2025-10-20',
      clientName: 'Roberto Silva',
      service: 'Instalación Eléctrica',
      amount: 8500,
      method: 'Transferencia Bancaria',
      status: 'completed',
    },
    {
      id: '2',
      date: '2025-10-18',
      clientName: 'Laura Fernández',
      service: 'Reparación de Plomería',
      amount: 6200,
      method: 'Efectivo',
      status: 'completed',
    },
    {
      id: '3',
      date: '2025-10-22',
      clientName: 'Ana Martínez',
      service: 'Pintura de Interior',
      amount: 15000,
      method: 'Mercado Pago',
      status: 'pending',
    },
  ];

  const stats = {
    monthlyEarnings: 25680,
    pendingPayments: 15000,
    completedPayments: 12,
  };

  const handleOpenDialog = (account?: PaymentAccount) => {
    if (account) {
      setEditingAccount(account);
      setFormData({
        type: account.type,
        name: account.name,
        accountInfo: account.accountInfo,
      });
    } else {
      setEditingAccount(null);
      setFormData({
        type: '',
        name: '',
        accountInfo: '',
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingAccount(null);
    setFormData({
      type: '',
      name: '',
      accountInfo: '',
    });
  };

  const handleSaveAccount = () => {
    if (!formData.type || !formData.name || !formData.accountInfo) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    if (editingAccount) {
      setPaymentAccounts(
        paymentAccounts.map((acc) =>
          acc.id === editingAccount.id
            ? { ...acc, ...formData, type: formData.type as any }
            : acc
        )
      );
      toast.success('Cuenta actualizada exitosamente');
    } else {
      const newAccount: PaymentAccount = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        type: formData.type as any,
        isDefault: paymentAccounts.length === 0,
      };
      setPaymentAccounts([...paymentAccounts, newAccount]);
      toast.success('Cuenta agregada exitosamente');
    }

    handleCloseDialog();
  };

  const handleDeleteAccount = (accountId: string) => {
    setPaymentAccounts(paymentAccounts.filter((acc) => acc.id !== accountId));
    toast.success('Cuenta eliminada');
  };

  const handleSetDefault = (accountId: string) => {
    setPaymentAccounts(
      paymentAccounts.map((acc) => ({
        ...acc,
        isDefault: acc.id === accountId,
      }))
    );
    toast.success('Cuenta predeterminada actualizada');
  };

  const getAccountTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      bank: 'Cuenta Bancaria',
      mercadopago: 'Mercado Pago',
      paypal: 'PayPal',
      other: 'Otro',
    };
    return labels[type] || type;
  };

  const getAccountTypeIcon = (type: string) => {
    switch (type) {
      case 'bank':
        return <CreditCard className="w-5 h-5" />;
      case 'mercadopago':
      case 'paypal':
        return <DollarSign className="w-5 h-5" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-white">Configuración de Pagos</h2>
        <p className="text-gray-400 mt-1">Gestiona tus cuentas y registros de pago</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Ingresos del Mes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl text-white">${stats.monthlyEarnings.toLocaleString()}</p>
              <TrendingUp className="w-8 h-8 text-green-400 opacity-50" />
            </div>
            <p className="text-xs text-green-400 mt-2">+15% vs mes anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Pagos Pendientes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl text-white">${stats.pendingPayments.toLocaleString()}</p>
              <DollarSign className="w-8 h-8 text-orange-500 opacity-50" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Por recibir</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Pagos Completados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl text-white">{stats.completedPayments}</p>
              <CheckCircle2 className="w-8 h-8 text-orange-500 opacity-50" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Este mes</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Accounts */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Cuentas de Cobro</CardTitle>
                  <CardDescription className="mt-1.5">
                    Configura tus métodos de cobro
                  </CardDescription>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => handleOpenDialog()} size="sm" className="gap-2">
                      <Plus className="w-4 h-4" />
                      Agregar
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {editingAccount ? 'Editar Cuenta' : 'Agregar Cuenta'}
                      </DialogTitle>
                      <DialogDescription>
                        Agrega información de tu cuenta para recibir pagos
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="type">Tipo de Cuenta</Label>
                        <Select
                          value={formData.type}
                          onValueChange={(value) => setFormData({ ...formData, type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bank">Cuenta Bancaria</SelectItem>
                            <SelectItem value="mercadopago">Mercado Pago</SelectItem>
                            <SelectItem value="paypal">PayPal</SelectItem>
                            <SelectItem value="other">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre/Banco</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Ej: Banco Nación"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="accountInfo">Información de Cuenta</Label>
                        <Input
                          id="accountInfo"
                          value={formData.accountInfo}
                          onChange={(e) =>
                            setFormData({ ...formData, accountInfo: e.target.value })
                          }
                          placeholder="CBU, CVU, Alias, etc."
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={handleCloseDialog}>
                        Cancelar
                      </Button>
                      <Button onClick={handleSaveAccount}>
                        {editingAccount ? 'Actualizar' : 'Agregar'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {paymentAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="p-4 rounded-lg border border-zinc-800 hover:bg-zinc-900 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-900 to-orange-800 flex items-center justify-center text-orange-400">
                        {getAccountTypeIcon(account.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className="text-sm text-white">{account.name}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {getAccountTypeLabel(account.type)}
                            </p>
                          </div>
                          {account.isDefault && (
                            <Badge variant="default" className="text-xs">
                              Predeterminada
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mt-2">{account.accountInfo}</p>
                        <div className="flex gap-2 mt-3">
                          {!account.isDefault && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs"
                              onClick={() => handleSetDefault(account.id)}
                            >
                              Predeterminada
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleOpenDialog(account)}
                          >
                            <Edit2 className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteAccount(account.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {paymentAccounts.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <CreditCard className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p className="text-sm">No has agregado ninguna cuenta</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Records */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Registro de Pagos</CardTitle>
              <CardDescription className="mt-1.5">
                Historial de pagos recibidos y pendientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {paymentRecords.map((record) => (
                  <div key={record.id} className="p-3 rounded-lg border border-zinc-800">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white">{record.clientName}</p>
                        <p className="text-xs text-gray-400">{record.service}</p>
                      </div>
                      <Badge
                        variant={record.status === 'completed' ? 'default' : 'secondary'}
                      >
                        {record.status === 'completed' ? 'Pagado' : 'Pendiente'}
                      </Badge>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500">
                          {new Date(record.date).toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                        <p className="text-xs text-gray-500">{record.method}</p>
                      </div>
                      <p className="text-white">${record.amount.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Help Card */}
      <Card className="border-orange-500/50 bg-orange-950/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-900 flex items-center justify-center text-orange-400 shrink-0">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-orange-200">Recuerda configurar tus cuentas de cobro</p>
              <p className="text-xs text-orange-300 mt-1">
                Agrega al menos una cuenta para que los clientes sepan cómo pagarte. Puedes agregar
                múltiples cuentas y establecer una como predeterminada.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
