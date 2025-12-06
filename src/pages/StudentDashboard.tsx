import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface StudentDashboardProps {
  studentEmail: string;
  onLogout: () => void;
}

interface Assignment {
  id: number;
  title: string;
  course: string;
  type: 'test' | 'homework' | 'lab' | 'essay';
  description: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  priority: 'high' | 'medium' | 'low';
  maxScore: number;
  grade?: number;
  questions?: any[];
  submittedAnswer?: string;
}

const StudentDashboard = ({ studentEmail, onLogout }: StudentDashboardProps) => {
  const [activeTab, setActiveTab] = useState('courses');
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [answer, setAnswer] = useState('');
  const [testAnswers, setTestAnswers] = useState<{ [key: number]: string }>({});

  const studentCourses = [
    {
      id: 1,
      title: 'Основы математики',
      teacher: 'Мария Ивановна',
      progress: 75,
      grade: 4.8,
      nextLesson: 'Завтра, 10:00',
      color: 'bg-blue-500',
      completedLessons: 9,
      totalLessons: 12
    },
    {
      id: 2,
      title: 'Русский язык 5-6 класс',
      teacher: 'Анна Петровна',
      progress: 60,
      grade: 4.5,
      nextLesson: 'Сегодня, 14:30',
      color: 'bg-purple-500',
      completedLessons: 12,
      totalLessons: 20
    },
    {
      id: 3,
      title: 'Физика для начинающих',
      teacher: 'Иван Сергеевич',
      progress: 85,
      grade: 4.9,
      nextLesson: '15 декабря, 11:00',
      color: 'bg-green-500',
      completedLessons: 13,
      totalLessons: 15
    }
  ];

  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 1,
      title: 'Контрольная работа: Квадратные уравнения',
      course: 'Математика',
      type: 'test',
      description: 'Тест по теме "Решение квадратных уравнений". Время выполнения: 45 минут.',
      dueDate: 'Через 2 дня',
      status: 'pending',
      priority: 'high',
      maxScore: 10,
      questions: [
        {
          id: 1,
          question: 'Решите уравнение: x² - 5x + 6 = 0',
          options: ['x = 2 и x = 3', 'x = 1 и x = 6', 'x = -2 и x = -3', 'x = 0 и x = 5'],
          correct: 'x = 2 и x = 3'
        },
        {
          id: 2,
          question: 'Чему равен дискриминант уравнения x² + 4x + 4 = 0?',
          options: ['0', '4', '8', '16'],
          correct: '0'
        },
        {
          id: 3,
          question: 'Сколько корней имеет уравнение x² + x + 1 = 0?',
          options: ['Нет действительных корней', 'Один корень', 'Два корня', 'Три корня'],
          correct: 'Нет действительных корней'
        }
      ]
    },
    {
      id: 2,
      title: 'Домашнее задание: Сочинение "Мой любимый писатель"',
      course: 'Русский язык',
      type: 'essay',
      description: 'Напишите сочинение объемом 250-300 слов о вашем любимом писателе. Обязательно укажите, почему вам нравится его творчество.',
      dueDate: 'Сегодня',
      status: 'pending',
      priority: 'high',
      maxScore: 5
    },
    {
      id: 3,
      title: 'Лабораторная работа №5: Измерение плотности',
      course: 'Физика',
      type: 'lab',
      description: 'Измерьте плотность различных материалов. Оформите отчет с расчетами и выводами.',
      dueDate: 'Через неделю',
      status: 'submitted',
      priority: 'medium',
      maxScore: 5,
      submittedAnswer: 'Лабораторная работа выполнена. Результаты измерений: алюминий - 2.7 г/см³, медь - 8.9 г/см³.'
    },
    {
      id: 4,
      title: 'Тест: Векторы на плоскости',
      course: 'Математика',
      type: 'test',
      description: 'Проверка знаний по теме "Векторы". 5 вопросов.',
      dueDate: 'Через 5 дней',
      status: 'graded',
      priority: 'medium',
      maxScore: 5,
      grade: 4
    },
    {
      id: 5,
      title: 'Домашнее задание: Задачи на движение',
      course: 'Физика',
      type: 'homework',
      description: 'Решите 5 задач на равномерное и равноускоренное движение из учебника (стр. 45-47).',
      dueDate: 'Через 3 дня',
      status: 'pending',
      priority: 'medium',
      maxScore: 5
    }
  ]);

  const grades = [
    { course: 'Математика', grades: [5, 4, 5, 5, 4], average: 4.6 },
    { course: 'Русский язык', grades: [4, 5, 4, 4, 5], average: 4.4 },
    { course: 'Физика', grades: [5, 5, 5, 4, 5], average: 4.8 },
    { course: 'История', grades: [4, 4, 5, 4, 4], average: 4.2 },
    { course: 'Литература', grades: [5, 5, 4, 5, 5], average: 4.8 }
  ];

  const totalGrades = grades.reduce((sum, g) => sum + g.grades.length, 0);
  const overallAverage = (grades.reduce((sum, g) => sum + g.average * g.grades.length, 0) / totalGrades).toFixed(1);
  const fiveCount = grades.reduce((sum, g) => sum + g.grades.filter(gr => gr === 5).length, 0);
  const fourCount = grades.reduce((sum, g) => sum + g.grades.filter(gr => gr === 4).length, 0);
  const threeCount = grades.reduce((sum, g) => sum + g.grades.filter(gr => gr === 3).length, 0);

  const completedAssignments = assignments.filter(a => a.status === 'submitted' || a.status === 'graded').length;
  const pendingAssignments = assignments.filter(a => a.status === 'pending').length;

  const stats = [
    { label: 'Средний балл', value: overallAverage, icon: 'Star', color: 'text-yellow-500' },
    { label: 'Завершено курсов', value: '3', icon: 'CheckCircle', color: 'text-green-500' },
    { label: 'Активных заданий', value: pendingAssignments.toString(), icon: 'FileText', color: 'text-blue-500' },
    { label: 'Место в рейтинге', value: '#12', icon: 'Trophy', color: 'text-orange-500' }
  ];

  const getGradeColor = (grade: number) => {
    if (grade === 5) return 'bg-green-500 text-white';
    if (grade === 4) return 'bg-blue-500 text-white';
    if (grade === 3) return 'bg-orange-500 text-white';
    return 'bg-red-500 text-white';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'test': return 'ClipboardCheck';
      case 'homework': return 'FileText';
      case 'lab': return 'FlaskConical';
      case 'essay': return 'Pen';
      default: return 'FileText';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'test': return 'Тест';
      case 'homework': return 'ДЗ';
      case 'lab': return 'Лаб. работа';
      case 'essay': return 'Сочинение';
      default: return 'Задание';
    }
  };

  const handleSubmitAssignment = () => {
    if (!selectedAssignment) return;

    if (selectedAssignment.type === 'test' && selectedAssignment.questions) {
      const correct = selectedAssignment.questions.filter((q, idx) => testAnswers[q.id] === q.correct).length;
      const grade = Math.round((correct / selectedAssignment.questions.length) * selectedAssignment.maxScore);
      
      setAssignments(prev => prev.map(a => 
        a.id === selectedAssignment.id 
          ? { ...a, status: 'graded', grade, submittedAnswer: JSON.stringify(testAnswers) } 
          : a
      ));
    } else {
      setAssignments(prev => prev.map(a => 
        a.id === selectedAssignment.id 
          ? { ...a, status: 'submitted', submittedAnswer: answer } 
          : a
      ));
    }
    
    setSelectedAssignment(null);
    setAnswer('');
    setTestAnswers({});
  };

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
              <TabsTrigger value="assignments">
                Задания
                {pendingAssignments > 0 && (
                  <Badge className="ml-2 bg-orange-500" variant="default">{pendingAssignments}</Badge>
                )}
              </TabsTrigger>
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
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="BookCheck" size={16} />
                        <span>{course.completedLessons} из {course.totalLessons} уроков</span>
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
                        className={`flex items-start justify-between p-4 rounded-lg border ${
                          assignment.status === 'graded'
                            ? 'bg-green-50 border-green-200'
                            : assignment.status === 'submitted'
                            ? 'bg-blue-50 border-blue-200'
                            : assignment.priority === 'high'
                            ? 'bg-orange-50 border-orange-200'
                            : 'bg-muted/50'
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon name={getTypeIcon(assignment.type) as any} size={20} className="text-primary" />
                            <h3 className="font-heading font-semibold">{assignment.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{assignment.description}</p>
                          <div className="flex flex-wrap items-center gap-3 text-sm">
                            <Badge variant="secondary">{assignment.course}</Badge>
                            <Badge variant="outline">{getTypeName(assignment.type)}</Badge>
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Icon name="Clock" size={14} />
                              {assignment.dueDate}
                            </span>
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Icon name="Target" size={14} />
                              Макс. балл: {assignment.maxScore}
                            </span>
                            {assignment.status === 'graded' && assignment.grade !== undefined && (
                              <Badge className={getGradeColor(assignment.grade)}>
                                Оценка: {assignment.grade} из {assignment.maxScore}
                              </Badge>
                            )}
                            {assignment.status === 'submitted' && (
                              <Badge className="bg-blue-500">
                                <Icon name="CheckCircle" size={14} className="mr-1" />
                                Отправлено
                              </Badge>
                            )}
                            {assignment.status === 'pending' && assignment.priority === 'high' && (
                              <Badge variant="destructive">
                                <Icon name="AlertCircle" size={14} className="mr-1" />
                                Срочно
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant={assignment.status === 'pending' ? 'default' : 'outline'}
                              size="sm"
                              className="gap-2 ml-4"
                              onClick={() => setSelectedAssignment(assignment)}
                              disabled={assignment.status === 'graded'}
                            >
                              {assignment.status === 'pending' ? (
                                <>
                                  <Icon name="Send" size={16} />
                                  Выполнить
                                </>
                              ) : assignment.status === 'submitted' ? (
                                <>
                                  <Icon name="Eye" size={16} />
                                  Просмотр
                                </>
                              ) : (
                                <>
                                  <Icon name="CheckCircle" size={16} />
                                  Проверено
                                </>
                              )}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="font-heading">{assignment.title}</DialogTitle>
                              <DialogDescription>{assignment.course} • {getTypeName(assignment.type)}</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="p-4 bg-muted rounded-lg">
                                <p className="text-sm">{assignment.description}</p>
                                <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Icon name="Calendar" size={14} />
                                    Срок: {assignment.dueDate}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Icon name="Target" size={14} />
                                    Максимум баллов: {assignment.maxScore}
                                  </span>
                                </div>
                              </div>

                              {assignment.status === 'submitted' || assignment.status === 'graded' ? (
                                <div className="space-y-3">
                                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Icon name="CheckCircle" size={20} className="text-blue-600" />
                                      <h4 className="font-heading font-semibold">Ваш ответ</h4>
                                    </div>
                                    <p className="text-sm">{assignment.submittedAnswer}</p>
                                  </div>
                                  {assignment.status === 'graded' && assignment.grade !== undefined && (
                                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                      <div className="flex items-center gap-2">
                                        <Icon name="Star" size={20} className="text-yellow-500" />
                                        <h4 className="font-heading font-semibold">
                                          Оценка: {assignment.grade} из {assignment.maxScore}
                                        </h4>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <>
                                  {assignment.type === 'test' && assignment.questions ? (
                                    <div className="space-y-6">
                                      {assignment.questions.map((question, index) => (
                                        <div key={question.id} className="space-y-3">
                                          <Label className="text-base font-heading">
                                            {index + 1}. {question.question}
                                          </Label>
                                          <RadioGroup
                                            value={testAnswers[question.id] || ''}
                                            onValueChange={(value) => setTestAnswers({ ...testAnswers, [question.id]: value })}
                                          >
                                            {question.options.map((option: string, optIdx: number) => (
                                              <div key={optIdx} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                                                <RadioGroupItem value={option} id={`q${question.id}-o${optIdx}`} />
                                                <Label htmlFor={`q${question.id}-o${optIdx}`} className="flex-1 cursor-pointer">
                                                  {option}
                                                </Label>
                                              </div>
                                            ))}
                                          </RadioGroup>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="space-y-2">
                                      <Label className="font-heading">Ваш ответ</Label>
                                      <Textarea
                                        placeholder="Введите ответ на задание..."
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        rows={10}
                                      />
                                    </div>
                                  )}

                                  <div className="flex gap-3 pt-4">
                                    <Button 
                                      className="flex-1 gap-2" 
                                      onClick={handleSubmitAssignment}
                                      disabled={
                                        assignment.type === 'test' 
                                          ? Object.keys(testAnswers).length !== assignment.questions?.length
                                          : !answer.trim()
                                      }
                                    >
                                      <Icon name="Send" size={18} />
                                      Отправить работу
                                    </Button>
                                    <Button variant="outline" className="gap-2">
                                      <Icon name="Save" size={18} />
                                      Сохранить черновик
                                    </Button>
                                  </div>
                                </>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Icon name="FileCheck" size={32} className="mx-auto mb-2 text-green-500" />
                      <p className="text-3xl font-heading font-bold">{completedAssignments}</p>
                      <p className="text-sm text-muted-foreground">Выполнено заданий</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Icon name="Clock" size={32} className="mx-auto mb-2 text-orange-500" />
                      <p className="text-3xl font-heading font-bold">{pendingAssignments}</p>
                      <p className="text-sm text-muted-foreground">Ожидают выполнения</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Icon name="TrendingUp" size={32} className="mx-auto mb-2 text-blue-500" />
                      <p className="text-3xl font-heading font-bold">
                        {completedAssignments > 0 ? Math.round((completedAssignments / assignments.length) * 100) : 0}%
                      </p>
                      <p className="text-sm text-muted-foreground">Процент выполнения</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="grades" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Журнал оценок</CardTitle>
                  <CardDescription>Все ваши оценки по предметам</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {grades.map((subject, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-heading font-semibold">{subject.course}</h3>
                          <div className="flex items-center gap-2">
                            <Icon name="Star" size={16} className="text-yellow-500" />
                            <span className="font-heading font-bold text-lg">{subject.average}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {subject.grades.map((grade, gradeIndex) => (
                            <div
                              key={gradeIndex}
                              className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg ${getGradeColor(
                                grade
                              )}`}
                            >
                              {grade}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Итоговая успеваемость</CardTitle>
                  <CardDescription>Общая статистика по всем предметам</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-green-500 text-white rounded-lg flex items-center justify-center font-bold text-xl">
                              5
                            </div>
                            <span className="font-heading font-semibold">Отлично</span>
                          </div>
                          <span className="text-2xl font-heading font-bold">{fiveCount}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold text-xl">
                              4
                            </div>
                            <span className="font-heading font-semibold">Хорошо</span>
                          </div>
                          <span className="text-2xl font-heading font-bold">{fourCount}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-orange-500 text-white rounded-lg flex items-center justify-center font-bold text-xl">
                              3
                            </div>
                            <span className="font-heading font-semibold">Удовлетворительно</span>
                          </div>
                          <span className="text-2xl font-heading font-bold">{threeCount}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-center p-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
                      <Icon name="Trophy" size={64} className="text-primary mb-4" />
                      <p className="text-sm text-muted-foreground mb-2">Общий средний балл</p>
                      <p className="text-6xl font-heading font-bold mb-4">{overallAverage}</p>
                      <Progress value={parseFloat(overallAverage) * 20} className="w-full h-3" />
                      <p className="text-sm text-muted-foreground mt-4">
                        {parseFloat(overallAverage) >= 4.5 ? '🎉 Отличная успеваемость!' : 
                         parseFloat(overallAverage) >= 4.0 ? '✨ Хорошая успеваемость!' :
                         '💪 Продолжай стараться!'}
                      </p>
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
