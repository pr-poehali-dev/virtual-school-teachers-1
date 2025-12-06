import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface StudentDashboardProps {
  studentEmail: string;
  onLogout: () => void;
}

const StudentDashboard = ({ studentEmail, onLogout }: StudentDashboardProps) => {
  const [activeTab, setActiveTab] = useState('courses');

  const studentCourses = [
    {
      id: 1,
      title: 'Основы математики',
      teacher: 'Мария Ивановна',
      progress: 75,
      grade: 4.8,
      nextLesson: 'Завтра, 10:00',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Русский язык 5-6 класс',
      teacher: 'Анна Петровна',
      progress: 60,
      grade: 4.5,
      nextLesson: 'Сегодня, 14:30',
      color: 'bg-purple-500'
    },
    {
      id: 3,
      title: 'Физика для начинающих',
      teacher: 'Иван Сергеевич',
      progress: 85,
      grade: 4.9,
      nextLesson: '15 декабря, 11:00',
      color: 'bg-green-500'
    }
  ];

  const assignments = [
    {
      id: 1,
      title: 'Контрольная работа по алгебре',
      course: 'Математика',
      dueDate: 'Через 2 дня',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Домашнее задание: сочинение',
      course: 'Русский язык',
      dueDate: 'Сегодня',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 3,
      title: 'Лабораторная работа №5',
      course: 'Физика',
      dueDate: 'Через неделю',
      status: 'completed',
      priority: 'medium'
    },
    {
      id: 4,
      title: 'Тест по теме "Векторы"',
      course: 'Математика',
      dueDate: 'Через 5 дней',
      status: 'pending',
      priority: 'medium'
    }
  ];

  const grades = [
    { course: 'Математика', grades: [5, 4, 5, 5, 4], average: 4.6 },
    { course: 'Русский язык', grades: [4, 5, 4, 4, 5], average: 4.4 },
    { course: 'Физика', grades: [5, 5, 5, 4, 5], average: 4.8 },
    { course: 'История', grades: [4, 4, 5, 4, 4], average: 4.2 },
    { course: 'Литература', grades: [5, 5, 4, 5, 5], average: 4.8 }
  ];

  const stats = [
    { label: 'Средний балл', value: '4.6', icon: 'Star', color: 'text-yellow-500' },
    { label: 'Завершено курсов', value: '3', icon: 'CheckCircle', color: 'text-green-500' },
    { label: 'Активных заданий', value: '5', icon: 'FileText', color: 'text-blue-500' },
    { label: 'Место в рейтинге', value: '#12', icon: 'Trophy', color: 'text-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                <Icon name="User" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-heading font-bold text-foreground">Личный кабинет ученика</h1>
                <p className="text-xs text-muted-foreground">EduPlatform</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-sm text-muted-foreground">{studentEmail}</span>
              <Button variant="outline" size="sm" className="gap-2" onClick={onLogout}>
                <Icon name="LogOut" size={16} />
                <span className="hidden sm:inline">Выйти</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8 animate-fade-in">
          <div>
            <h2 className="text-3xl font-heading font-bold mb-2">Привет, Алексей! 👋</h2>
            <p className="text-muted-foreground">Продолжай учиться и достигать новых высот</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
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

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-lg grid-cols-3">
              <TabsTrigger value="courses">Мои курсы</TabsTrigger>
              <TabsTrigger value="assignments">Задания</TabsTrigger>
              <TabsTrigger value="grades">Оценки</TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {studentCourses.map((course) => (
                  <Card key={course.id} className="hover:shadow-xl transition-all hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-12 h-12 ${course.color} rounded-lg flex items-center justify-center text-white`}>
                          <Icon name="BookOpen" size={24} />
                        </div>
                        <Badge className="gap-1">
                          <Icon name="Star" size={12} />
                          {course.grade}
                        </Badge>
                      </div>
                      <CardTitle className="font-heading">{course.title}</CardTitle>
                      <CardDescription>{course.teacher}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Clock" size={16} />
                        <span>Следующий урок: {course.nextLesson}</span>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Прогресс</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <Button className="w-full gap-2">
                        <Icon name="Play" size={16} />
                        Продолжить обучение
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="assignments" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Активные задания</CardTitle>
                  <CardDescription>Задачи, которые нужно выполнить</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assignments.map((assignment) => (
                      <div
                        key={assignment.id}
                        className={`flex items-center justify-between p-4 rounded-lg border ${
                          assignment.status === 'completed'
                            ? 'bg-green-50 border-green-200'
                            : assignment.priority === 'high'
                            ? 'bg-orange-50 border-orange-200'
                            : 'bg-muted/50'
                        }`}
                      >
                        <div className="flex items-start gap-4 flex-1">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              assignment.status === 'completed'
                                ? 'bg-green-500 text-white'
                                : assignment.priority === 'high'
                                ? 'bg-orange-500 text-white'
                                : 'bg-blue-500 text-white'
                            }`}
                          >
                            <Icon
                              name={assignment.status === 'completed' ? 'CheckCircle' : 'FileText'}
                              size={20}
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-heading font-semibold mb-1">{assignment.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Icon name="BookOpen" size={14} />
                                {assignment.course}
                              </span>
                              <span className="flex items-center gap-1">
                                <Icon name="Clock" size={14} />
                                {assignment.dueDate}
                              </span>
                            </div>
                          </div>
                        </div>
                        {assignment.status === 'completed' ? (
                          <Badge variant="secondary" className="bg-green-500 text-white">
                            Выполнено
                          </Badge>
                        ) : (
                          <Button size="sm" className="gap-2">
                            <Icon name="PlayCircle" size={16} />
                            Начать
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="grades" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Журнал оценок</CardTitle>
                  <CardDescription>Ваши отметки за текущий период</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {grades.map((subject, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-heading font-semibold">{subject.course}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Средний балл:</span>
                            <Badge className="gap-1">
                              <Icon name="Star" size={12} />
                              {subject.average}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {subject.grades.map((grade, i) => (
                            <div
                              key={i}
                              className={`w-12 h-12 rounded-lg flex items-center justify-center font-heading font-bold text-lg ${
                                grade === 5
                                  ? 'bg-green-500 text-white'
                                  : grade === 4
                                  ? 'bg-blue-500 text-white'
                                  : grade === 3
                                  ? 'bg-orange-500 text-white'
                                  : 'bg-red-500 text-white'
                              }`}
                            >
                              {grade}
                            </div>
                          ))}
                        </div>
                        <Progress value={subject.average * 20} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Сводная статистика</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-3xl font-bold text-green-600">
                        {grades.reduce((acc, s) => acc + s.grades.filter(g => g === 5).length, 0)}
                      </p>
                      <p className="text-sm text-muted-foreground">Пятерок</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-3xl font-bold text-blue-600">
                        {grades.reduce((acc, s) => acc + s.grades.filter(g => g === 4).length, 0)}
                      </p>
                      <p className="text-sm text-muted-foreground">Четверок</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <p className="text-3xl font-bold text-orange-600">
                        {grades.reduce((acc, s) => acc + s.grades.filter(g => g === 3).length, 0)}
                      </p>
                      <p className="text-sm text-muted-foreground">Троек</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-3xl font-bold text-purple-600">
                        {(grades.reduce((acc, s) => acc + s.average, 0) / grades.length).toFixed(1)}
                      </p>
                      <p className="text-sm text-muted-foreground">Общий средний</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
