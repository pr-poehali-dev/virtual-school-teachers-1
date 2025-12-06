import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import Login from './Login';
import Analytics from './Analytics';
import StudentDashboard from './StudentDashboard';
import GradeBook from './GradeBook';
import AssignmentReview from './AssignmentReview';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'teacher' | 'student'>('teacher');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showGradeBook, setShowGradeBook] = useState(false);
  const [showAssignmentReview, setShowAssignmentReview] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [userEmail, setUserEmail] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [lessonBuilder, setLessonBuilder] = useState({
    title: '',
    description: '',
    type: 'theory',
    materials: [] as any[]
  });

  const courses = [
    {
      id: 1,
      title: 'Основы математики',
      category: 'Математика',
      level: 'Начальный',
      students: 245,
      lessons: 12,
      progress: 75,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Русский язык 5-6 класс',
      category: 'Русский язык',
      level: 'Средний',
      students: 189,
      lessons: 18,
      progress: 60,
      color: 'bg-purple-500'
    },
    {
      id: 3,
      title: 'История России',
      category: 'История',
      level: 'Продвинутый',
      students: 156,
      lessons: 24,
      progress: 40,
      color: 'bg-orange-500'
    },
    {
      id: 4,
      title: 'Физика для начинающих',
      category: 'Физика',
      level: 'Начальный',
      students: 203,
      lessons: 15,
      progress: 85,
      color: 'bg-green-500'
    },
    {
      id: 5,
      title: 'Литература 7-8 класс',
      category: 'Литература',
      level: 'Средний',
      students: 178,
      lessons: 20,
      progress: 55,
      color: 'bg-pink-500'
    },
    {
      id: 6,
      title: 'Химия. Основы',
      category: 'Химия',
      level: 'Начальный',
      students: 134,
      lessons: 16,
      progress: 30,
      color: 'bg-cyan-500'
    }
  ];

  const stats = [
    { label: 'Активных курсов', value: '12', icon: 'BookOpen', color: 'text-primary' },
    { label: 'Всего учеников', value: '1,284', icon: 'Users', color: 'text-secondary' },
    { label: 'Созданных уроков', value: '156', icon: 'FileText', color: 'text-accent' },
    { label: 'Средний рейтинг', value: '4.8', icon: 'Star', color: 'text-yellow-500' }
  ];

  const addMaterial = (type: string) => {
    setLessonBuilder({
      ...lessonBuilder,
      materials: [...lessonBuilder.materials, { type, content: '', id: Date.now() }]
    });
  };

  const removeMaterial = (id: number) => {
    setLessonBuilder({
      ...lessonBuilder,
      materials: lessonBuilder.materials.filter(m => m.id !== id)
    });
  };

  if (!isAuthenticated) {
    return <Login onLogin={(email, role) => { 
      setIsAuthenticated(true); 
      setUserEmail(email); 
      setUserRole(role);
    }} />;
  }

  if (userRole === 'student') {
    return <StudentDashboard studentEmail={userEmail} onLogout={() => setIsAuthenticated(false)} />;
  }

  if (showAnalytics) {
    return <Analytics onBack={() => setShowAnalytics(false)} />;
  }

  if (showGradeBook) {
    return <GradeBook onBack={() => setShowGradeBook(false)} />;
  }

  if (showAssignmentReview) {
    return <AssignmentReview onBack={() => setShowAssignmentReview(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="GraduationCap" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-heading font-bold text-foreground">EduPlatform</h1>
                <p className="text-xs text-muted-foreground">Виртуальная школа</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Button
                variant={activeTab === 'home' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('home')}
                className="gap-2"
              >
                <Icon name="Home" size={18} />
                Главная
              </Button>
              <Button
                variant={activeTab === 'courses' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('courses')}
                className="gap-2"
              >
                <Icon name="BookOpen" size={18} />
                Курсы
              </Button>
              <Button
                variant={activeTab === 'builder' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('builder')}
                className="gap-2"
              >
                <Icon name="Pencil" size={18} />
                Конструктор
              </Button>
              <Button
                variant="ghost"
                onClick={() => setShowAnalytics(true)}
                className="gap-2"
              >
                <Icon name="BarChart3" size={18} />
                Аналитика
              </Button>
              <Button
                variant="ghost"
                onClick={() => setShowGradeBook(true)}
                className="gap-2"
              >
                <Icon name="ClipboardList" size={18} />
                Табель
              </Button>
              <Button
                variant="ghost"
                onClick={() => setShowAssignmentReview(true)}
                className="gap-2"
              >
                <Icon name="PenLine" size={18} />
                Проверка
              </Button>
            </nav>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-sm text-muted-foreground">{userEmail}</span>
              <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsAuthenticated(false)}>
                <Icon name="LogOut" size={16} />
                <span className="hidden sm:inline">Выйти</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-2">Добро пожаловать, Мария Ивановна!</h2>
              <p className="text-muted-foreground">Ваша личная платформа для создания и управления учебными курсами</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                        <p className="text-3xl font-heading font-bold">{stat.value}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center ${stat.color}`}>
                        <Icon name={stat.icon as any} size={24} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Последние активности</CardTitle>
                <CardDescription>Недавние действия в ваших курсах</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: 'Новый ученик записался на курс', course: 'Основы математики', time: '5 минут назад', icon: 'UserPlus', color: 'text-green-500' },
                    { action: 'Урок завершен', course: 'Физика для начинающих', time: '1 час назад', icon: 'CheckCircle', color: 'text-blue-500' },
                    { action: 'Получен новый отзыв', course: 'Русский язык 5-6 класс', time: '3 часа назад', icon: 'Star', color: 'text-yellow-500' },
                    { action: 'Задание проверено', course: 'История России', time: '5 часов назад', icon: 'FileCheck', color: 'text-purple-500' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${activity.color}`}>
                        <Icon name={activity.icon as any} size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.course}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-3xl font-heading font-bold mb-2">Мои курсы</h2>
                <p className="text-muted-foreground">Управляйте своими учебными программами</p>
              </div>
              <Button className="gap-2">
                <Icon name="Plus" size={18} />
                Создать курс
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Input placeholder="Поиск курсов..." className="max-w-sm" />
              <Select>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все категории</SelectItem>
                  <SelectItem value="math">Математика</SelectItem>
                  <SelectItem value="russian">Русский язык</SelectItem>
                  <SelectItem value="history">История</SelectItem>
                  <SelectItem value="physics">Физика</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Уровень" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все уровни</SelectItem>
                  <SelectItem value="beginner">Начальный</SelectItem>
                  <SelectItem value="intermediate">Средний</SelectItem>
                  <SelectItem value="advanced">Продвинутый</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <Card key={course.id} className="hover:shadow-xl transition-all hover:-translate-y-1 animate-scale-in cursor-pointer" style={{ animationDelay: `${index * 0.1}s` }} onClick={() => setSelectedCourse(course)}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 ${course.color} rounded-lg flex items-center justify-center text-white`}>
                        <Icon name="BookOpen" size={24} />
                      </div>
                      <Badge variant="secondary">{course.level}</Badge>
                    </div>
                    <CardTitle className="font-heading">{course.title}</CardTitle>
                    <CardDescription>{course.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Icon name="Users" size={16} />
                        <span>{course.students} учеников</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Icon name="FileText" size={16} />
                        <span>{course.lessons} уроков</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Прогресс</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className={`${course.color} h-2 rounded-full transition-all`} style={{ width: `${course.progress}%` }}></div>
                      </div>
                    </div>
                    <Button className="w-full gap-2" variant="outline">
                      <Icon name="Eye" size={16} />
                      Открыть курс
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'builder' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-2">Конструктор уроков</h2>
              <p className="text-muted-foreground">Создавайте интерактивные уроки с материалами и заданиями</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="font-heading">Создание урока</CardTitle>
                  <CardDescription>Заполните основную информацию о вашем уроке</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Название урока</label>
                    <Input
                      placeholder="Введите название урока"
                      value={lessonBuilder.title}
                      onChange={(e) => setLessonBuilder({ ...lessonBuilder, title: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Описание</label>
                    <Textarea
                      placeholder="Опишите содержание урока"
                      value={lessonBuilder.description}
                      onChange={(e) => setLessonBuilder({ ...lessonBuilder, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Тип урока</label>
                    <Select value={lessonBuilder.type} onValueChange={(value) => setLessonBuilder({ ...lessonBuilder, type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="theory">Теория</SelectItem>
                        <SelectItem value="practice">Практика</SelectItem>
                        <SelectItem value="test">Тестирование</SelectItem>
                        <SelectItem value="mixed">Смешанный</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-heading font-semibold">Материалы урока</h3>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="gap-2" onClick={() => addMaterial('text')}>
                          <Icon name="FileText" size={16} />
                          Текст
                        </Button>
                        <Button size="sm" variant="outline" className="gap-2" onClick={() => addMaterial('video')}>
                          <Icon name="Video" size={16} />
                          Видео
                        </Button>
                        <Button size="sm" variant="outline" className="gap-2" onClick={() => addMaterial('task')}>
                          <Icon name="CheckSquare" size={16} />
                          Задание
                        </Button>
                      </div>
                    </div>

                    <ScrollArea className="h-[400px]">
                      <div className="space-y-4">
                        {lessonBuilder.materials.length === 0 ? (
                          <div className="text-center py-12 text-muted-foreground">
                            <Icon name="FileQuestion" size={48} className="mx-auto mb-3 opacity-50" />
                            <p>Материалы еще не добавлены</p>
                            <p className="text-sm">Нажмите на кнопки выше, чтобы добавить контент</p>
                          </div>
                        ) : (
                          lessonBuilder.materials.map((material, index) => (
                            <Card key={material.id}>
                              <CardContent className="pt-6">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1 space-y-3">
                                    <div className="flex items-center gap-2">
                                      <Icon
                                        name={material.type === 'text' ? 'FileText' : material.type === 'video' ? 'Video' : 'CheckSquare'}
                                        size={20}
                                        className="text-primary"
                                      />
                                      <Badge variant="secondary">
                                        {material.type === 'text' ? 'Текст' : material.type === 'video' ? 'Видео' : 'Задание'}
                                      </Badge>
                                    </div>
                                    {material.type === 'text' && (
                                      <Textarea
                                        placeholder="Введите текст материала..."
                                        value={material.content}
                                        onChange={(e) => {
                                          const updated = lessonBuilder.materials.map(m =>
                                            m.id === material.id ? { ...m, content: e.target.value } : m
                                          );
                                          setLessonBuilder({ ...lessonBuilder, materials: updated });
                                        }}
                                        rows={4}
                                      />
                                    )}
                                    {material.type === 'video' && (
                                      <Input
                                        placeholder="Ссылка на видео (YouTube, Vimeo...)"
                                        value={material.content}
                                        onChange={(e) => {
                                          const updated = lessonBuilder.materials.map(m =>
                                            m.id === material.id ? { ...m, content: e.target.value } : m
                                          );
                                          setLessonBuilder({ ...lessonBuilder, materials: updated });
                                        }}
                                      />
                                    )}
                                    {material.type === 'task' && (
                                      <Textarea
                                        placeholder="Описание задания..."
                                        value={material.content}
                                        onChange={(e) => {
                                          const updated = lessonBuilder.materials.map(m =>
                                            m.id === material.id ? { ...m, content: e.target.value } : m
                                          );
                                          setLessonBuilder({ ...lessonBuilder, materials: updated });
                                        }}
                                        rows={3}
                                      />
                                    )}
                                  </div>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="text-destructive"
                                    onClick={() => removeMaterial(material.id)}
                                  >
                                    <Icon name="Trash2" size={18} />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        )}
                      </div>
                    </ScrollArea>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button className="flex-1 gap-2">
                      <Icon name="Save" size={18} />
                      Сохранить урок
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Icon name="Eye" size={18} />
                      Предпросмотр
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading">Быстрые действия</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Icon name="Copy" size={18} />
                      Дублировать урок
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Icon name="Upload" size={18} />
                      Загрузить файлы
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Icon name="Share2" size={18} />
                      Поделиться
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading">Шаблоны уроков</CardTitle>
                    <CardDescription>Используйте готовые шаблоны</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { name: 'Теория + тест', icon: 'FileText' },
                      { name: 'Видеоурок', icon: 'Video' },
                      { name: 'Практическое задание', icon: 'Pencil' },
                      { name: 'Самостоятельная работа', icon: 'ClipboardCheck' }
                    ].map((template, index) => (
                      <Button key={index} variant="ghost" className="w-full justify-start gap-2">
                        <Icon name={template.icon as any} size={18} />
                        {template.name}
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </main>

      <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-heading">{selectedCourse?.title}</DialogTitle>
            <DialogDescription>{selectedCourse?.category}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <Icon name="Users" size={24} className="mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">{selectedCourse?.students}</p>
                <p className="text-sm text-muted-foreground">Учеников</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <Icon name="FileText" size={24} className="mx-auto mb-2 text-secondary" />
                <p className="text-2xl font-bold">{selectedCourse?.lessons}</p>
                <p className="text-sm text-muted-foreground">Уроков</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <Icon name="TrendingUp" size={24} className="mx-auto mb-2 text-accent" />
                <p className="text-2xl font-bold">{selectedCourse?.progress}%</p>
                <p className="text-sm text-muted-foreground">Прогресс</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1 gap-2">
                <Icon name="Play" size={18} />
                Начать урок
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <Icon name="Settings" size={18} />
                Настройки
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;