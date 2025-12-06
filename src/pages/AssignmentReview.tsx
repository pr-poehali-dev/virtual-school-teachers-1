import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AssignmentReviewProps {
  onBack: () => void;
}

interface SubmittedAssignment {
  id: number;
  assignmentTitle: string;
  assignmentType: 'test' | 'homework' | 'lab' | 'essay';
  studentName: string;
  studentAvatar: string;
  course: string;
  submittedDate: string;
  answer: string;
  maxScore: number;
  grade?: number;
  comment?: string;
  status: 'pending' | 'graded';
}

const AssignmentReview = ({ onBack }: AssignmentReviewProps) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'graded'>('pending');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedSubmission, setSelectedSubmission] = useState<SubmittedAssignment | null>(null);
  const [grade, setGrade] = useState('5');
  const [comment, setComment] = useState('');

  const [submissions, setSubmissions] = useState<SubmittedAssignment[]>([
    {
      id: 1,
      assignmentTitle: 'Контрольная работа: Квадратные уравнения',
      assignmentType: 'test',
      studentName: 'Иванов Алексей',
      studentAvatar: '👨',
      course: 'Математика',
      submittedDate: '2 часа назад',
      answer: 'Ответы на тест: 1) x = 2 и x = 3, 2) 0, 3) Нет действительных корней',
      maxScore: 10,
      status: 'pending'
    },
    {
      id: 2,
      assignmentTitle: 'Домашнее задание: Сочинение "Мой любимый писатель"',
      assignmentType: 'essay',
      studentName: 'Петрова Мария',
      studentAvatar: '👩',
      course: 'Русский язык',
      submittedDate: '5 часов назад',
      answer: 'Мой любимый писатель - Александр Пушкин. Его произведения отличаются глубоким пониманием человеческой души и красотой языка. Особенно мне нравится "Евгений Онегин" - роман в стихах, который раскрывает множество тем: любовь, дружба, смысл жизни. Пушкин умел говорить о сложном простым языком, его стихи легко запоминаются и трогают душу. Я считаю, что творчество Пушкина актуально и в наше время, потому что он писал о вечных ценностях.',
      maxScore: 5,
      status: 'pending'
    },
    {
      id: 3,
      assignmentTitle: 'Лабораторная работа №5: Измерение плотности',
      assignmentType: 'lab',
      studentName: 'Сидоров Дмитрий',
      studentAvatar: '👦',
      course: 'Физика',
      submittedDate: 'Вчера',
      answer: 'Лабораторная работа выполнена. Результаты измерений: алюминий - 2.7 г/см³, медь - 8.9 г/см³, железо - 7.8 г/см³. Все измерения соответствуют табличным значениям с погрешностью не более 5%.',
      maxScore: 5,
      grade: 4,
      comment: 'Хорошая работа, но не хватает анализа погрешностей',
      status: 'graded'
    },
    {
      id: 4,
      assignmentTitle: 'Тест: Векторы на плоскости',
      assignmentType: 'test',
      studentName: 'Козлова Анна',
      studentAvatar: '👧',
      course: 'Математика',
      submittedDate: '3 дня назад',
      answer: 'Ответы: 1) (3, 4), 2) √25 = 5, 3) (-1, -2), 4) 0°, 5) AB + BC = AC',
      maxScore: 5,
      grade: 5,
      comment: 'Отлично! Все ответы верные',
      status: 'graded'
    },
    {
      id: 5,
      assignmentTitle: 'Домашнее задание: Задачи на движение',
      assignmentType: 'homework',
      studentName: 'Новиков Егор',
      studentAvatar: '👨',
      course: 'Физика',
      submittedDate: '1 час назад',
      answer: 'Задача 1: v = 20 м/с. Задача 2: S = 100 м. Задача 3: t = 5 с. Задача 4: a = 2 м/с². Задача 5: v₀ = 10 м/с.',
      maxScore: 5,
      status: 'pending'
    },
    {
      id: 6,
      assignmentTitle: 'Сочинение: Анализ стихотворения',
      assignmentType: 'essay',
      studentName: 'Смирнова Елена',
      studentAvatar: '👧',
      course: 'Литература',
      submittedDate: '4 часа назад',
      answer: 'Анализ стихотворения М.Ю. Лермонтова "Парус". В произведении автор использует образ паруса как символ одинокой, мятежной души. Лирический герой ищет бурю, не находя покоя ни в одном месте. Антитеза "покой-буря" проходит через всё стихотворение.',
      maxScore: 5,
      status: 'pending'
    }
  ]);

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
      case 'homework': return 'Домашнее задание';
      case 'lab': return 'Лабораторная работа';
      case 'essay': return 'Сочинение';
      default: return 'Задание';
    }
  };

  const filteredSubmissions = submissions.filter(s => {
    const statusMatch = filter === 'all' || s.status === filter;
    const courseMatch = selectedCourse === 'all' || s.course === selectedCourse;
    return statusMatch && courseMatch;
  });

  const pendingCount = submissions.filter(s => s.status === 'pending').length;
  const gradedCount = submissions.filter(s => s.status === 'graded').length;

  const handleGradeSubmission = () => {
    if (!selectedSubmission) return;

    setSubmissions(prev => prev.map(s => 
      s.id === selectedSubmission.id 
        ? { ...s, status: 'graded', grade: parseInt(grade), comment } 
        : s
    ));

    setSelectedSubmission(null);
    setGrade('5');
    setComment('');
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
                <h1 className="text-xl font-heading font-bold">Проверка заданий</h1>
                <p className="text-xs text-muted-foreground">Оценка работ учеников</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="gap-2">
                <Icon name="Clock" size={14} />
                На проверке: {pendingCount}
              </Badge>
              <Badge variant="outline" className="gap-2">
                <Icon name="CheckCircle" size={14} />
                Проверено: {gradedCount}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все предметы</SelectItem>
                <SelectItem value="Математика">Математика</SelectItem>
                <SelectItem value="Русский язык">Русский язык</SelectItem>
                <SelectItem value="Физика">Физика</SelectItem>
                <SelectItem value="Литература">Литература</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs value={filter} onValueChange={(v) => setFilter(v as any)}>
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="pending">
                На проверке
                {pendingCount > 0 && (
                  <Badge className="ml-2 bg-orange-500" variant="default">{pendingCount}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="graded">Проверено</TabsTrigger>
              <TabsTrigger value="all">Все</TabsTrigger>
            </TabsList>

            <TabsContent value={filter} className="mt-6">
              {filteredSubmissions.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Icon name="Inbox" size={64} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-lg font-heading font-semibold mb-2">Нет заданий</p>
                    <p className="text-sm text-muted-foreground">
                      {filter === 'pending' ? 'Все задания проверены!' : 'Задания не найдены'}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredSubmissions.map((submission) => (
                    <Card key={submission.id} className="hover:shadow-lg transition-all">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Icon name={getTypeIcon(submission.assignmentType) as any} size={20} className="text-primary" />
                              <CardTitle className="font-heading text-lg">{submission.assignmentTitle}</CardTitle>
                            </div>
                            <CardDescription className="flex flex-wrap items-center gap-2">
                              <Badge variant="secondary">{submission.course}</Badge>
                              <Badge variant="outline">{getTypeName(submission.assignmentType)}</Badge>
                            </CardDescription>
                          </div>
                          {submission.status === 'graded' ? (
                            <Badge className="bg-green-500 gap-1">
                              <Icon name="CheckCircle" size={14} />
                              Проверено
                            </Badge>
                          ) : (
                            <Badge className="bg-orange-500 gap-1">
                              <Icon name="Clock" size={14} />
                              На проверке
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                          <span className="text-3xl">{submission.studentAvatar}</span>
                          <div className="flex-1">
                            <p className="font-heading font-semibold">{submission.studentName}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Icon name="Clock" size={14} />
                              Отправлено {submission.submittedDate}
                            </p>
                          </div>
                        </div>

                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-sm font-medium mb-1">Ответ ученика:</p>
                          <p className="text-sm line-clamp-3">{submission.answer}</p>
                        </div>

                        {submission.status === 'graded' && (
                          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Оценка:</span>
                              <Badge className="text-lg">
                                {submission.grade} / {submission.maxScore}
                              </Badge>
                            </div>
                            {submission.comment && (
                              <p className="text-sm text-muted-foreground">{submission.comment}</p>
                            )}
                          </div>
                        )}

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              className="w-full gap-2" 
                              variant={submission.status === 'pending' ? 'default' : 'outline'}
                              onClick={() => {
                                setSelectedSubmission(submission);
                                if (submission.status === 'graded') {
                                  setGrade(submission.grade?.toString() || '5');
                                  setComment(submission.comment || '');
                                } else {
                                  setGrade('5');
                                  setComment('');
                                }
                              }}
                            >
                              {submission.status === 'pending' ? (
                                <>
                                  <Icon name="PenLine" size={18} />
                                  Проверить работу
                                </>
                              ) : (
                                <>
                                  <Icon name="Eye" size={18} />
                                  Посмотреть оценку
                                </>
                              )}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="font-heading">{submission.assignmentTitle}</DialogTitle>
                              <DialogDescription>
                                {submission.studentName} • {submission.course} • {getTypeName(submission.assignmentType)}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="p-4 bg-muted rounded-lg">
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="font-heading font-semibold">Информация о задании</h4>
                                  <Badge>Макс. балл: {submission.maxScore}</Badge>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Icon name="Calendar" size={14} />
                                  <span>Отправлено {submission.submittedDate}</span>
                                </div>
                              </div>

                              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex items-center gap-2 mb-3">
                                  <Icon name="FileText" size={20} className="text-blue-600" />
                                  <h4 className="font-heading font-semibold">Ответ ученика</h4>
                                </div>
                                <p className="text-sm whitespace-pre-wrap">{submission.answer}</p>
                              </div>

                              {submission.status === 'pending' ? (
                                <div className="space-y-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                                  <h4 className="font-heading font-semibold flex items-center gap-2">
                                    <Icon name="Star" size={20} className="text-yellow-500" />
                                    Поставить оценку
                                  </h4>
                                  
                                  <div className="grid grid-cols-5 gap-3">
                                    {[5, 4, 3, 2, 1].map((g) => (
                                      <Button
                                        key={g}
                                        variant={grade === g.toString() ? 'default' : 'outline'}
                                        className="h-16 text-2xl font-bold"
                                        onClick={() => setGrade(g.toString())}
                                      >
                                        {g}
                                      </Button>
                                    ))}
                                  </div>

                                  <div className="space-y-2">
                                    <Label className="font-heading">Комментарий к оценке</Label>
                                    <Textarea
                                      placeholder="Напишите комментарий для ученика (необязательно)..."
                                      value={comment}
                                      onChange={(e) => setComment(e.target.value)}
                                      rows={4}
                                    />
                                  </div>

                                  <Button 
                                    className="w-full gap-2" 
                                    onClick={handleGradeSubmission}
                                    size="lg"
                                  >
                                    <Icon name="CheckCircle" size={20} />
                                    Сохранить оценку
                                  </Button>
                                </div>
                              ) : (
                                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                  <div className="flex items-center gap-2 mb-3">
                                    <Icon name="CheckCircle" size={20} className="text-green-600" />
                                    <h4 className="font-heading font-semibold">Ваша оценка</h4>
                                  </div>
                                  <div className="flex items-center gap-3 mb-3">
                                    <div className="px-6 py-3 bg-green-500 text-white rounded-lg text-3xl font-bold">
                                      {submission.grade}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      из {submission.maxScore} баллов
                                    </div>
                                  </div>
                                  {submission.comment && (
                                    <div className="mt-3 p-3 bg-white rounded-lg">
                                      <p className="text-sm font-medium mb-1">Комментарий:</p>
                                      <p className="text-sm">{submission.comment}</p>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AssignmentReview;
