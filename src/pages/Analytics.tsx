import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AnalyticsProps {
  onBack: () => void;
}

const Analytics = ({ onBack }: AnalyticsProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedCourse, setSelectedCourse] = useState('all');

  const studentsData = [
    {
      id: 1,
      name: 'Иванов Алексей',
      avatar: '👨',
      courses: ['Математика', 'Физика'],
      avgScore: 4.8,
      progress: 85,
      activity: 'Активен',
      lastActive: '2 часа назад',
      trend: 'up'
    },
    {
      id: 2,
      name: 'Петрова Мария',
      avatar: '👩',
      courses: ['Русский язык', 'Литература'],
      avgScore: 4.5,
      progress: 78,
      activity: 'Активна',
      lastActive: '5 часов назад',
      trend: 'up'
    },
    {
      id: 3,
      name: 'Сидоров Дмитрий',
      avatar: '👦',
      courses: ['История', 'Химия'],
      avgScore: 3.9,
      progress: 65,
      activity: 'Средняя',
      lastActive: '1 день назад',
      trend: 'down'
    },
    {
      id: 4,
      name: 'Козлова Анна',
      avatar: '👧',
      courses: ['Математика', 'Русский язык'],
      avgScore: 4.9,
      progress: 92,
      activity: 'Активна',
      lastActive: '1 час назад',
      trend: 'up'
    },
    {
      id: 5,
      name: 'Новиков Егор',
      avatar: '👨',
      courses: ['Физика', 'Химия'],
      avgScore: 4.2,
      progress: 70,
      activity: 'Средняя',
      lastActive: '8 часов назад',
      trend: 'stable'
    }
  ];

  const courseStats = [
    { course: 'Математика', students: 245, avgScore: 4.3, completion: 75, trend: 8 },
    { course: 'Русский язык', students: 189, avgScore: 4.5, completion: 82, trend: 12 },
    { course: 'История', students: 156, avgScore: 4.1, completion: 68, trend: -3 },
    { course: 'Физика', students: 203, avgScore: 4.4, completion: 79, trend: 5 },
    { course: 'Литература', students: 178, avgScore: 4.6, completion: 85, trend: 15 },
    { course: 'Химия', students: 134, avgScore: 3.9, completion: 62, trend: -5 }
  ];

  const overallStats = [
    { label: 'Средний балл', value: '4.4', change: '+0.3', icon: 'TrendingUp', color: 'text-green-500' },
    { label: 'Процент завершения', value: '78%', change: '+5%', icon: 'Target', color: 'text-blue-500' },
    { label: 'Активных учеников', value: '892', change: '+42', icon: 'Users', color: 'text-purple-500' },
    { label: 'Сданных заданий', value: '1,243', change: '+156', icon: 'CheckCircle', color: 'text-orange-500' }
  ];

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
                <h1 className="text-xl font-heading font-bold">Аналитика успеваемости</h1>
                <p className="text-xs text-muted-foreground">Статистика и прогресс учеников</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">За неделю</SelectItem>
                  <SelectItem value="month">За месяц</SelectItem>
                  <SelectItem value="quarter">За квартал</SelectItem>
                  <SelectItem value="year">За год</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {overallStats.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-3xl font-heading font-bold mb-2">{stat.value}</p>
                      <div className="flex items-center gap-1 text-sm text-green-600">
                        <Icon name="ArrowUp" size={16} />
                        <span>{stat.change}</span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center ${stat.color}`}>
                      <Icon name={stat.icon as any} size={24} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="courses" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="courses">По курсам</TabsTrigger>
              <TabsTrigger value="students">По ученикам</TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Статистика курсов</CardTitle>
                  <CardDescription>Общая успеваемость и прогресс по предметам</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {courseStats.map((course, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-heading font-semibold">{course.course}</h3>
                              <Badge variant="secondary" className="text-xs">
                                {course.students} учеников
                              </Badge>
                              {course.trend > 0 ? (
                                <Badge variant="default" className="text-xs gap-1 bg-green-500">
                                  <Icon name="TrendingUp" size={12} />
                                  +{course.trend}%
                                </Badge>
                              ) : course.trend < 0 ? (
                                <Badge variant="destructive" className="text-xs gap-1">
                                  <Icon name="TrendingDown" size={12} />
                                  {course.trend}%
                                </Badge>
                              ) : (
                                <Badge variant="secondary" className="text-xs gap-1">
                                  <Icon name="Minus" size={12} />
                                  0%
                                </Badge>
                              )}
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Icon name="Star" size={16} className="text-yellow-500" />
                                <span>Средний балл: <strong>{course.avgScore}</strong></span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Icon name="CheckCircle" size={16} className="text-green-500" />
                                <span>Завершение: <strong>{course.completion}%</strong></span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Progress value={course.completion} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="students" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-heading">Топ учеников</CardTitle>
                      <CardDescription>Лучшие результаты за выбранный период</CardDescription>
                    </div>
                    <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все курсы</SelectItem>
                        <SelectItem value="math">Математика</SelectItem>
                        <SelectItem value="russian">Русский язык</SelectItem>
                        <SelectItem value="history">История</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {studentsData.map((student, index) => (
                      <div key={student.id} className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                        <div className="text-3xl">{student.avatar}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-heading font-semibold">{student.name}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {student.activity}
                            </Badge>
                            {student.trend === 'up' && (
                              <Icon name="TrendingUp" size={16} className="text-green-500" />
                            )}
                            {student.trend === 'down' && (
                              <Icon name="TrendingDown" size={16} className="text-red-500" />
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <span className="flex items-center gap-1">
                              <Icon name="BookOpen" size={14} />
                              {student.courses.join(', ')}
                            </span>
                            <span className="flex items-center gap-1">
                              <Icon name="Clock" size={14} />
                              {student.lastActive}
                            </span>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="flex-1">
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span className="text-muted-foreground">Прогресс</span>
                                <span className="font-medium">{student.progress}%</span>
                              </div>
                              <Progress value={student.progress} className="h-2" />
                            </div>
                            <div className="text-center">
                              <div className="flex items-center gap-1 text-yellow-500 mb-1">
                                <Icon name="Star" size={16} />
                                <span className="font-heading font-bold text-lg text-foreground">{student.avgScore}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">Средний балл</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Требуют внимания</CardTitle>
                  <CardDescription>Ученики с низкой активностью или успеваемостью</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {studentsData.filter(s => s.progress < 70 || s.avgScore < 4.0).map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-3 rounded-lg border border-orange-200 bg-orange-50">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{student.avatar}</div>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">{student.courses[0]}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="gap-2">
                          <Icon name="MessageCircle" size={16} />
                          Написать
                        </Button>
                      </div>
                    ))}
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

export default Analytics;
