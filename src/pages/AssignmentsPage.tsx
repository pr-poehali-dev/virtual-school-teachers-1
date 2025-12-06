import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface AssignmentsPageProps {
  onBack: () => void;
}

const AssignmentsPage = ({ onBack }: AssignmentsPageProps) => {
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState<number[]>([]);

  const assignments = [
    {
      id: 1,
      title: 'Контрольная работа: Квадратные уравнения',
      course: 'Математика',
      teacher: 'Мария Ивановна',
      type: 'test',
      dueDate: '10 декабря 2024',
      timeLeft: 'Через 2 дня',
      points: 100,
      description: 'Решите 10 задач по теме квадратных уравнений',
      questions: [
        {
          id: 1,
          type: 'choice',
          question: 'Решите уравнение: x² - 5x + 6 = 0',
          options: ['x = 2 и x = 3', 'x = 1 и x = 6', 'x = -2 и x = -3', 'x = 0 и x = 5'],
          correctAnswer: 0
        },
        {
          id: 2,
          type: 'choice',
          question: 'Чему равен дискриминант уравнения x² + 4x + 4 = 0?',
          options: ['0', '4', '16', '-4'],
          correctAnswer: 0
        },
        {
          id: 3,
          type: 'text',
          question: 'Решите уравнение: 2x² - 8 = 0 (введите оба корня через точку с запятой)',
          correctAnswer: '2; -2'
        }
      ],
      status: 'pending',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Сочинение: Образ Печорина',
      course: 'Литература',
      teacher: 'Анна Петровна',
      type: 'essay',
      dueDate: '8 декабря 2024',
      timeLeft: 'Сегодня до 23:59',
      points: 50,
      description: 'Напишите сочинение-рассуждение об образе Печорина в романе "Герой нашего времени" (не менее 200 слов)',
      questions: [
        {
          id: 1,
          type: 'essay',
          question: 'Какие черты характера Печорина делают его "героем времени"? Приведите примеры из текста.',
          minWords: 200
        }
      ],
      status: 'pending',
      priority: 'high'
    },
    {
      id: 3,
      title: 'Лабораторная работа: Закон Ома',
      course: 'Физика',
      teacher: 'Иван Сергеевич',
      type: 'lab',
      dueDate: '15 декабря 2024',
      timeLeft: 'Через неделю',
      points: 75,
      description: 'Проведите эксперимент и заполните отчет о проверке закона Ома для участка цепи',
      questions: [
        {
          id: 1,
          type: 'text',
          question: 'Запишите показания вольтметра при сопротивлении 10 Ом (в вольтах)',
          correctAnswer: ''
        },
        {
          id: 2,
          type: 'text',
          question: 'Рассчитайте силу тока по закону Ома (в амперах)',
          correctAnswer: ''
        },
        {
          id: 3,
          type: 'file',
          question: 'Загрузите фотографии установки и результатов измерений'
        }
      ],
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 4,
      title: 'Тест: Векторы на плоскости',
      course: 'Математика',
      teacher: 'Мария Ивановна',
      type: 'test',
      dueDate: '12 декабря 2024',
      timeLeft: 'Через 5 дней',
      points: 50,
      description: 'Проверьте знания по теме векторов',
      questions: [
        {
          id: 1,
          type: 'choice',
          question: 'Чему равна длина вектора (3, 4)?',
          options: ['5', '7', '12', '25'],
          correctAnswer: 0
        },
        {
          id: 2,
          type: 'multiple',
          question: 'Какие утверждения о векторах верны? (выберите все правильные)',
          options: [
            'Нулевой вектор коллинеарен любому вектору',
            'Сумма противоположных векторов равна нулевому вектору',
            'Скалярное произведение перпендикулярных векторов равно нулю',
            'Длина вектора может быть отрицательной'
          ],
          correctAnswers: [0, 1, 2]
        }
      ],
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 5,
      title: 'Домашнее задание: Причастия',
      course: 'Русский язык',
      teacher: 'Ольга Николаевна',
      type: 'homework',
      dueDate: '5 декабря 2024',
      timeLeft: 'Просрочено на 1 день',
      points: 30,
      description: 'Выполните упражнения на тему причастий и причастных оборотов',
      questions: [
        {
          id: 1,
          type: 'text',
          question: 'Найдите причастие в предложении: "Написанное письмо лежало на столе"',
          correctAnswer: 'написанное'
        },
        {
          id: 2,
          type: 'text',
          question: 'Образуйте действительное причастие настоящего времени от глагола "читать"',
          correctAnswer: 'читающий'
        }
      ],
      status: 'overdue',
      priority: 'high'
    },
    {
      id: 6,
      title: 'Практическая работа: Строение атома',
      course: 'Химия',
      teacher: 'Дмитрий Александрович',
      type: 'lab',
      dueDate: '1 декабря 2024',
      timeLeft: 'Выполнено',
      points: 60,
      grade: 5,
      description: 'Изучите строение атома и заполните таблицу элементов',
      status: 'completed',
      priority: 'medium'
    }
  ];

  const filteredAssignments = selectedCourse === 'all' 
    ? assignments 
    : assignments.filter(a => a.course.toLowerCase().includes(selectedCourse));

  const handleSubmit = (assignmentId: number) => {
    setSubmitted([...submitted, assignmentId]);
    setSelectedAssignment(null);
    setAnswers({});
  };

  const getStatusColor = (status: string) => {
    if (status === 'completed') return 'bg-green-50 border-green-200';
    if (status === 'overdue') return 'bg-red-50 border-red-200';
    return 'bg-orange-50 border-orange-200';
  };

  const getStatusBadge = (status: string) => {
    if (status === 'completed') return <Badge className="bg-green-500">Выполнено</Badge>;
    if (status === 'overdue') return <Badge variant="destructive">Просрочено</Badge>;
    return <Badge variant="secondary">Ожидает</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <div>
                <h1 className="text-xl font-heading font-bold">Задания</h1>
                <p className="text-xs text-muted-foreground">Выполняйте задания и проверяйте результаты</p>
              </div>
            </div>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все предметы</SelectItem>
                <SelectItem value="математика">Математика</SelectItem>
                <SelectItem value="русский">Русский язык</SelectItem>
                <SelectItem value="физика">Физика</SelectItem>
                <SelectItem value="литература">Литература</SelectItem>
                <SelectItem value="химия">Химия</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Активных заданий</p>
                    <p className="text-3xl font-heading font-bold">5</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-orange-500">
                    <Icon name="FileText" size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Выполнено</p>
                    <p className="text-3xl font-heading font-bold">18</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-green-500">
                    <Icon name="CheckCircle" size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Набрано баллов</p>
                    <p className="text-3xl font-heading font-bold">892</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-yellow-500">
                    <Icon name="Star" size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            {filteredAssignments.map((assignment) => (
              <Card key={assignment.id} className={`hover:shadow-lg transition-shadow ${getStatusColor(assignment.status)}`}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="font-heading">{assignment.title}</CardTitle>
                        {getStatusBadge(assignment.status)}
                      </div>
                      <CardDescription className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Icon name="BookOpen" size={14} />
                          {assignment.course}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="User" size={14} />
                          {assignment.teacher}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Calendar" size={14} />
                          {assignment.dueDate}
                        </span>
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="gap-1">
                      <Icon name="Award" size={12} />
                      {assignment.points} баллов
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{assignment.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon 
                        name={assignment.status === 'overdue' ? 'AlertCircle' : 'Clock'} 
                        size={16} 
                        className={assignment.status === 'overdue' ? 'text-red-500' : 'text-muted-foreground'}
                      />
                      <span className={assignment.status === 'overdue' ? 'text-red-500 font-medium' : ''}>{assignment.timeLeft}</span>
                    </div>
                    {assignment.status === 'completed' ? (
                      <div className="flex items-center gap-3">
                        <Badge className="gap-1 bg-green-500">
                          <Icon name="CheckCircle" size={12} />
                          Оценка: {assignment.grade}
                        </Badge>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Icon name="Eye" size={16} />
                          Просмотреть
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        className="gap-2" 
                        onClick={() => setSelectedAssignment(assignment)}
                        disabled={submitted.includes(assignment.id)}
                      >
                        {submitted.includes(assignment.id) ? (
                          <>
                            <Icon name="CheckCircle" size={16} />
                            Отправлено
                          </>
                        ) : (
                          <>
                            <Icon name="FileEdit" size={16} />
                            Выполнить задание
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Dialog open={!!selectedAssignment} onOpenChange={() => setSelectedAssignment(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading">{selectedAssignment?.title}</DialogTitle>
            <DialogDescription>
              {selectedAssignment?.course} • {selectedAssignment?.points} баллов • Срок: {selectedAssignment?.timeLeft}
            </DialogDescription>
          </DialogHeader>
          
          {selectedAssignment && (
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm">{selectedAssignment.description}</p>
              </div>

              {selectedAssignment.questions.map((question: any, index: number) => (
                <Card key={question.id}>
                  <CardHeader>
                    <CardTitle className="text-base font-heading">
                      Вопрос {index + 1}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="font-medium">{question.question}</p>

                    {question.type === 'choice' && (
                      <RadioGroup 
                        value={answers[question.id]} 
                        onValueChange={(value) => setAnswers({...answers, [question.id]: value})}
                      >
                        {question.options.map((option: string, i: number) => (
                          <div key={i} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                            <RadioGroupItem value={String(i)} id={`q${question.id}-${i}`} />
                            <Label htmlFor={`q${question.id}-${i}`} className="flex-1 cursor-pointer">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}

                    {question.type === 'multiple' && (
                      <div className="space-y-2">
                        {question.options.map((option: string, i: number) => (
                          <div key={i} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                            <Checkbox 
                              id={`q${question.id}-${i}`}
                              checked={answers[question.id]?.includes(i)}
                              onCheckedChange={(checked) => {
                                const current = answers[question.id] || [];
                                setAnswers({
                                  ...answers, 
                                  [question.id]: checked 
                                    ? [...current, i] 
                                    : current.filter((x: number) => x !== i)
                                });
                              }}
                            />
                            <Label htmlFor={`q${question.id}-${i}`} className="flex-1 cursor-pointer">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    )}

                    {question.type === 'text' && (
                      <Input
                        placeholder="Введите ответ"
                        value={answers[question.id] || ''}
                        onChange={(e) => setAnswers({...answers, [question.id]: e.target.value})}
                      />
                    )}

                    {question.type === 'essay' && (
                      <div className="space-y-2">
                        <Textarea
                          placeholder="Напишите развернутый ответ..."
                          rows={10}
                          value={answers[question.id] || ''}
                          onChange={(e) => setAnswers({...answers, [question.id]: e.target.value})}
                        />
                        {question.minWords && (
                          <p className="text-sm text-muted-foreground">
                            Минимум {question.minWords} слов. Написано: {(answers[question.id] || '').split(' ').filter((w: string) => w).length}
                          </p>
                        )}
                      </div>
                    )}

                    {question.type === 'file' && (
                      <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                        <Icon name="Upload" size={32} className="mx-auto mb-3 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">Перетащите файлы сюда или нажмите для выбора</p>
                        <Button variant="outline" size="sm">
                          Выбрать файлы
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              <div className="flex gap-3 pt-4 border-t">
                <Button className="flex-1 gap-2" onClick={() => handleSubmit(selectedAssignment.id)}>
                  <Icon name="Send" size={18} />
                  Отправить на проверку
                </Button>
                <Button variant="outline" onClick={() => setSelectedAssignment(null)}>
                  Отмена
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssignmentsPage;
