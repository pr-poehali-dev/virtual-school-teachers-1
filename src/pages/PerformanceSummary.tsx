import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PerformanceSummaryProps {
  onBack: () => void;
}

const PerformanceSummary = ({ onBack }: PerformanceSummaryProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState('year');
  const [selectedTab, setSelectedTab] = useState('overview');

  const overallStats = {
    gpa: 4.56,
    totalCourses: 8,
    completedAssignments: 142,
    rank: 12,
    totalStudents: 245,
    attendance: 94
  };

  const gradeDistribution = [
    { grade: 5, count: 89, percentage: 63, color: 'bg-green-500' },
    { grade: 4, count: 42, percentage: 30, color: 'bg-blue-500' },
    { grade: 3, count: 11, percentage: 7, color: 'bg-orange-500' },
    { grade: 2, count: 0, percentage: 0, color: 'bg-red-500' }
  ];

  const coursePerformance = [
    {
      course: 'Физика для начинающих',
      teacher: 'Иван Сергеевич',
      grades: [5, 5, 5, 4, 5, 5, 5, 5],
      average: 4.875,
      trend: 'up',
      completion: 92,
      attendance: 100,
      lastGrade: 5,
      color: 'bg-green-500'
    },
    {
      course: 'Математика',
      teacher: 'Мария Ивановна',
      grades: [5, 4, 5, 5, 4, 5, 5, 4],
      average: 4.625,
      trend: 'stable',
      completion: 85,
      attendance: 95,
      lastGrade: 4,
      color: 'bg-blue-500'
    },
    {
      course: 'Литература',
      teacher: 'Анна Петровна',
      grades: [5, 5, 4, 5, 5, 5, 5, 5],
      average: 4.875,
      trend: 'up',
      completion: 90,
      attendance: 92,
      lastGrade: 5,
      color: 'bg-pink-500'
    },
    {
      course: 'Русский язык',
      teacher: 'Ольга Николаевна',
      grades: [4, 5, 4, 4, 5, 4, 5, 4],
      average: 4.375,
      trend: 'stable',
      completion: 88,
      attendance: 94,
      lastGrade: 4,
      color: 'bg-purple-500'
    },
    {
      course: 'История России',
      teacher: 'Петр Васильевич',
      grades: [4, 4, 5, 4, 4, 5, 4, 5],
      average: 4.375,
      trend: 'up',
      completion: 78,
      attendance: 90,
      lastGrade: 5,
      color: 'bg-orange-500'
    },
    {
      course: 'Химия',
      teacher: 'Дмитрий Александрович',
      grades: [4, 3, 4, 4, 4, 5, 4, 4],
      average: 4.0,
      trend: 'up',
      completion: 75,
      attendance: 88,
      lastGrade: 4,
      color: 'bg-cyan-500'
    }
  ];

  const achievements = [
    { title: 'Отличник месяца', icon: 'Award', color: 'text-yellow-500', date: 'Ноябрь 2024' },
    { title: 'Победитель олимпиады', icon: 'Trophy', color: 'text-orange-500', date: 'Октябрь 2024' },
    { title: '100% посещаемость', icon: 'CheckCircle', color: 'text-green-500', date: 'Сентябрь 2024' },
    { title: 'Активный участник', icon: 'Star', color: 'text-blue-500', date: 'Весь год' }
  ];

  const recentGrades = [
    { course: 'Физика', topic: 'Закон Ома', grade: 5, date: '5 декабря', teacher: 'Иван Сергеевич' },
    { course: 'Математика', topic: 'Векторы', grade: 4, date: '4 декабря', teacher: 'Мария Ивановна' },
    { course: 'Литература', topic: 'Герой нашего времени', grade: 5, date: '3 декабря', teacher: 'Анна Петровна' },
    { course: 'Русский язык', topic: 'Причастия', grade: 4, date: '2 декабря', teacher: 'Ольга Николаевна' },
    { course: 'История', topic: 'Петр I', grade: 5, date: '1 декабря', teacher: 'Петр Васильевич' }
  ];

  const getGradeColor = (grade: number) => {
    if (grade === 5) return 'bg-green-500 text-white';
    if (grade === 4) return 'bg-blue-500 text-white';
    if (grade === 3) return 'bg-orange-500 text-white';
    return 'bg-red-500 text-white';
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <Icon name="TrendingUp" size={16} className="text-green-500" />;
    if (trend === 'down') return <Icon name="TrendingDown" size={16} className="text-red-500" />;
    return <Icon name="Minus" size={16} className="text-gray-400" />;
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
                <h1 className="text-xl font-heading font-bold">Итоговая успеваемость</h1>
                <p className="text-xs text-muted-foreground">Полная статистика ваших достижений</p>
              </div>
            </div>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">За месяц</SelectItem>
                <SelectItem value="quarter">За четверть</SelectItem>
                <SelectItem value="semester">За полугодие</SelectItem>
                <SelectItem value="year">За год</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle className="font-heading">Средний балл</CardTitle>
                <CardDescription>Общий показатель успеваемости</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-6">
                  <div className="text-center">
                    <div className="text-6xl font-heading font-bold text-primary mb-2">
                      {overallStats.gpa.toFixed(2)}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <Icon name="TrendingUp" size={20} />
                      <span className="text-sm font-medium">+0.15 за месяц</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <p className="text-2xl font-heading font-bold">#{overallStats.rank}</p>
                    <p className="text-sm text-muted-foreground">Место</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-heading font-bold">{overallStats.attendance}%</p>
                    <p className="text-sm text-muted-foreground">Посещаемость</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Статистика</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon name="BookOpen" size={20} className="text-primary" />
                    <span className="text-sm">Изучаемых курсов</span>
                  </div>
                  <span className="text-xl font-heading font-bold">{overallStats.totalCourses}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon name="CheckCircle" size={20} className="text-green-500" />
                    <span className="text-sm">Выполнено заданий</span>
                  </div>
                  <span className="text-xl font-heading font-bold">{overallStats.completedAssignments}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon name="Users" size={20} className="text-secondary" />
                    <span className="text-sm">Всего учеников</span>
                  </div>
                  <span className="text-xl font-heading font-bold">{overallStats.totalStudents}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Распределение оценок</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {gradeDistribution.map((item) => (
                  <div key={item.grade}>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="flex items-center gap-2">
                        <div className={`w-6 h-6 ${item.color} rounded flex items-center justify-center text-white text-xs font-bold`}>
                          {item.grade}
                        </div>
                        Оценка {item.grade}
                      </span>
                      <span className="font-medium">{item.count} ({item.percentage}%)</span>
                    </div>
                    <Progress value={item.percentage} className={`h-2 ${item.color}`} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full max-w-2xl grid-cols-3">
              <TabsTrigger value="overview">Обзор</TabsTrigger>
              <TabsTrigger value="courses">По курсам</TabsTrigger>
              <TabsTrigger value="achievements">Достижения</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Последние оценки</CardTitle>
                  <CardDescription>Ваши недавние результаты</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentGrades.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-heading font-semibold">{item.course}</h3>
                            <Badge variant="secondary" className="text-xs">{item.topic}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.teacher} • {item.date}</p>
                        </div>
                        <div className={`w-12 h-12 ${getGradeColor(item.grade)} rounded-lg flex items-center justify-center text-2xl font-heading font-bold`}>
                          {item.grade}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="courses" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {coursePerformance.map((course, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <CardTitle className="font-heading text-base mb-1">{course.course}</CardTitle>
                          <CardDescription className="text-xs">{course.teacher}</CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-heading font-bold">{course.average.toFixed(2)}</div>
                          <div className="flex items-center gap-1 justify-end">
                            {getTrendIcon(course.trend)}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Оценки:</p>
                        <div className="flex gap-2 flex-wrap">
                          {course.grades.map((grade, i) => (
                            <div
                              key={i}
                              className={`w-10 h-10 ${getGradeColor(grade)} rounded-lg flex items-center justify-center text-lg font-heading font-bold`}
                            >
                              {grade}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Выполнение</p>
                          <div className="flex items-center gap-2">
                            <Progress value={course.completion} className="h-2 flex-1" />
                            <span className="text-sm font-medium">{course.completion}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Посещаемость</p>
                          <div className="flex items-center gap-2">
                            <Progress value={course.attendance} className="h-2 flex-1" />
                            <span className="text-sm font-medium">{course.attendance}%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Ваши достижения</CardTitle>
                  <CardDescription>Награды и успехи за учебный период</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                        <div className={`w-14 h-14 rounded-full bg-muted flex items-center justify-center ${achievement.color}`}>
                          <Icon name={achievement.icon as any} size={28} />
                        </div>
                        <div>
                          <h3 className="font-heading font-semibold mb-1">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Прогресс обучения</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Уровень знаний</p>
                        <p className="text-3xl font-heading font-bold text-green-700">Отлично</p>
                      </div>
                      <Icon name="Award" size={48} className="text-green-500" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <Icon name="Target" size={24} className="mx-auto mb-2 text-blue-500" />
                        <p className="text-2xl font-heading font-bold">85%</p>
                        <p className="text-xs text-muted-foreground">Цель достигнута</p>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <Icon name="Zap" size={24} className="mx-auto mb-2 text-yellow-500" />
                        <p className="text-2xl font-heading font-bold">42</p>
                        <p className="text-xs text-muted-foreground">Дней подряд</p>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <Icon name="Star" size={24} className="mx-auto mb-2 text-purple-500" />
                        <p className="text-2xl font-heading font-bold">892</p>
                        <p className="text-xs text-muted-foreground">Всего баллов</p>
                      </div>
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

export default PerformanceSummary;
