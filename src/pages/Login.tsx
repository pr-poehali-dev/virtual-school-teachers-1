import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface LoginProps {
  onLogin: (email: string, role: 'teacher' | 'student') => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'teacher' | 'student'>('teacher');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email, role);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Icon name="GraduationCap" className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-heading font-bold mb-2">EduPlatform</h1>
          <p className="text-muted-foreground">Виртуальная школа</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Вход в систему</CardTitle>
            <CardDescription>Выберите роль и введите учетные данные</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Button
                type="button"
                variant={role === 'teacher' ? 'default' : 'outline'}
                onClick={() => setRole('teacher')}
                className="gap-2"
              >
                <Icon name="GraduationCap" size={18} />
                Учитель
              </Button>
              <Button
                type="button"
                variant={role === 'student' ? 'default' : 'outline'}
                onClick={() => setRole('student')}
                className="gap-2"
              >
                <Icon name="User" size={18} />
                Ученик
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="teacher@school.ru"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full gap-2">
                <Icon name="LogIn" size={18} />
                Войти
              </Button>

              <div className="text-center">
                <Button variant="link" className="text-sm">
                  Забыли пароль?
                </Button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground text-center mb-4">
                Демо-данные для входа:
              </p>
              <div className="space-y-2">
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-sm space-y-1">
                  <p className="font-semibold text-blue-900">👨‍🏫 Учитель:</p>
                  <p><strong>Email:</strong> maria@school.ru</p>
                  <p><strong>Пароль:</strong> любой</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 p-3 rounded-lg text-sm space-y-1">
                  <p className="font-semibold text-purple-900">👨‍🎓 Ученик:</p>
                  <p><strong>Email:</strong> alex@student.ru</p>
                  <p><strong>Пароль:</strong> любой</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;