import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface GradeBookProps {
  onBack: () => void;
}

const GradeBook = ({ onBack }: GradeBookProps) => {
  const [selectedCourse, setSelectedCourse] = useState('math');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [newGrade, setNewGrade] = useState('5');
  const [gradeComment, setGradeComment] = useState('');

  const students = [
    {
      id: 1,
      name: 'Иванов Алексей',
      avatar: '👨',
      grades: {
        math: [5, 4, 5, 5, 4, null, 5, 4],
        russian: [4, 4, 5, 4, 5, 4, null, 4],
        physics: [5, 5, 4, 5, null, 5, 4, 5]
      },
      attendance: 95,
      average: { math: 4.6, russian: 4.3, physics: 4.7 }
    },
    {
      id: 2,
      name: 'Петрова Мария',
      avatar: '👩',
      grades: {
        math: [4, 5, 4, 4, 5, 4, null, 5],
        russian: [5, 5, 5, 4, 5, 5, 5, null],
        physics: [4, 4, 5, 4, 5, null, 4, 4]
      },
      attendance: 98,
      average: { math: 4.4, russian: 4.9, physics: 4.3 }
    },
    {
      id: 3,
      name: 'Сидоров Дмитрий',
      avatar: '👦',
      grades: {
        math: [3, 4, 3, 4, null, 3, 4, 3],
        russian: [4, 3, 4, 4, 3, null, 4, 3],
        physics: [3, 3, 4, null, 3, 4, 3, 4]
      },
      attendance: 85,
      average: { math: 3.4, russian: 3.6, physics: 3.4 }
    },
    {
      id: 4,
      name: 'Козлова Анна',
      avatar: '👧',
      grades: {
        math: [5, 5, 5, 5, 5, null, 5, 5],
        russian: [5, 5, 5, 5, null, 5, 5, 5],
        physics: [5, 5, 5, null, 5, 5, 5, 5]
      },
      attendance: 100,
      average: { math: 5.0, russian: 5.0, physics: 5.0 }
    },
    {
      id: 5,
      name: 'Новиков Егор',
      avatar: '👨',
      grades: {
        math: [4, 4, 4, null, 5, 4, 4, 4],
        russian: [4, 4, 4, 4, 4, null, 4, 5],
        physics: [4, 5, 4, 4, null, 4, 5, 4]
      },
      attendance: 92,
      average: { math: 4.1, russian: 4.1, physics: 4.3 }
    },
    {
      id: 6,
      name: 'Смирнова Елена',
      avatar: '👧',
      grades: {
        math: [5, 4, 5, 4, 5, 5, null, 4],
        russian: [5, 5, 4, 5, 4, 5, 5, null],
        physics: [4, 5, 5, 5, 4, null, 5, 5]
      },
      attendance: 97,
      average: { math: 4.6, russian: 4.7, physics: 4.7 }
    }
  ];

  const courses = [
    { id: 'math', name: 'Математика', color: 'bg-blue-500' },
    { id: 'russian', name: 'Русский язык', color: 'bg-purple-500' },
    { id: 'physics', name: 'Физика', color: 'bg-green-500' }
  ];

  const lessons = [
    'Урок 1',
    'Урок 2',
    'Урок 3',
    'Урок 4',
    'Урок 5',
    'Урок 6',
    'Урок 7',
    'Урок 8'
  ];

  const getGradeColor = (grade: number | null) => {
    if (grade === null) return 'bg-gray-200 text-gray-400';
    if (grade === 5) return 'bg-green-500 text-white';
    if (grade === 4) return 'bg-blue-500 text-white';
    if (grade === 3) return 'bg-orange-500 text-white';
    return 'bg-red-500 text-white';
  };

  const courseData = courses.find(c => c.id === selectedCourse);

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
                <h1 className="text-xl font-heading font-bold">Табель успеваемости</h1>
                <p className="text-xs text-muted-foreground">Журнал оценок учеников</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="gap-2">
                <Icon name="Download" size={18} />
                Экспорт
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6 animate-fade-in">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-heading flex items-center gap-3">
                    <div className={`w-10 h-10 ${courseData?.color} rounded-lg flex items-center justify-center text-white`}>
                      <Icon name="BookOpen" size={20} />
                    </div>
                    {courseData?.name}
                  </CardTitle>
                  <CardDescription>Успеваемость учеников по предмету</CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Средний балл класса</p>
                  <p className="text-3xl font-heading font-bold">
                    {(
                      students.reduce((acc, s) => acc + s.average[selectedCourse as keyof typeof s.average], 0) /
                      students.length
                    ).toFixed(1)}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-heading font-semibold sticky left-0 bg-white z-10">
                        Ученик
                      </th>
                      {lessons.map((lesson, index) => (
                        <th key={index} className="text-center p-3 font-heading font-semibold min-w-[60px]">
                          {lesson}
                        </th>
                      ))}
                      <th className="text-center p-3 font-heading font-semibold min-w-[80px]">Средний</th>
                      <th className="text-center p-3 font-heading font-semibold min-w-[100px]">Посещаемость</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="p-3 sticky left-0 bg-white z-10">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{student.avatar}</span>
                            <span className="font-medium whitespace-nowrap">{student.name}</span>
                          </div>
                        </td>
                        {student.grades[selectedCourse as keyof typeof student.grades].map((grade, index) => (
                          <td key={index} className="p-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <button
                                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg transition-all hover:scale-110 ${getGradeColor(
                                    grade
                                  )}`}
                                  onClick={() => setSelectedStudent(student)}
                                >
                                  {grade || '—'}
                                </button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle className="font-heading">
                                    {grade ? 'Редактировать оценку' : 'Поставить оценку'}
                                  </DialogTitle>
                                  <DialogDescription>
                                    {student.name} • {courseData?.name} • {lessons[index]}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 pt-4">
                                  <div className="space-y-2">
                                    <Label>Оценка</Label>
                                    <Select value={newGrade} onValueChange={setNewGrade}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="5">5 (Отлично)</SelectItem>
                                        <SelectItem value="4">4 (Хорошо)</SelectItem>
                                        <SelectItem value="3">3 (Удовлетворительно)</SelectItem>
                                        <SelectItem value="2">2 (Неудовлетворительно)</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Комментарий (необязательно)</Label>
                                    <Textarea
                                      placeholder="Добавьте пояснение к оценке..."
                                      value={gradeComment}
                                      onChange={(e) => setGradeComment(e.target.value)}
                                      rows={3}
                                    />
                                  </div>
                                  <div className="flex gap-3">
                                    <Button className="flex-1 gap-2">
                                      <Icon name="Save" size={18} />
                                      Сохранить
                                    </Button>
                                    {grade && (
                                      <Button variant="outline" className="gap-2">
                                        <Icon name="Trash2" size={18} />
                                        Удалить
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </td>
                        ))}
                        <td className="p-3 text-center">
                          <Badge className="gap-1">
                            <Icon name="Star" size={12} />
                            {student.average[selectedCourse as keyof typeof student.average].toFixed(1)}
                          </Badge>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-16 bg-muted rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  student.attendance >= 95
                                    ? 'bg-green-500'
                                    : student.attendance >= 85
                                    ? 'bg-blue-500'
                                    : 'bg-orange-500'
                                }`}
                                style={{ width: `${student.attendance}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{student.attendance}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-lg">Статистика оценок</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { grade: 5, count: 18, color: 'bg-green-500' },
                    { grade: 4, count: 24, color: 'bg-blue-500' },
                    { grade: 3, count: 8, color: 'bg-orange-500' },
                    { grade: 2, count: 2, color: 'bg-red-500' }
                  ].map((stat) => (
                    <div key={stat.grade} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 ${stat.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                          {stat.grade}
                        </div>
                        <span className="text-sm text-muted-foreground">Оценок</span>
                      </div>
                      <span className="text-xl font-heading font-bold">{stat.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-lg">Лучшие ученики</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {students
                    .sort(
                      (a, b) =>
                        b.average[selectedCourse as keyof typeof b.average] -
                        a.average[selectedCourse as keyof typeof a.average]
                    )
                    .slice(0, 3)
                    .map((student, index) => (
                      <div key={student.id} className="flex items-center gap-3">
                        <div className="text-2xl">{['🥇', '🥈', '🥉'][index]}</div>
                        <span className="text-xl">{student.avatar}</span>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{student.name}</p>
                        </div>
                        <Badge className="gap-1">
                          <Icon name="Star" size={12} />
                          {student.average[selectedCourse as keyof typeof student.average].toFixed(1)}
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-lg">Требуют внимания</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {students
                    .filter(
                      (s) =>
                        s.average[selectedCourse as keyof typeof s.average] < 4.0 || s.attendance < 90
                    )
                    .map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-2 rounded-lg bg-orange-50 border border-orange-200"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{student.avatar}</span>
                          <p className="text-sm font-medium">{student.name}</p>
                        </div>
                        <Button size="sm" variant="outline" className="gap-1">
                          <Icon name="MessageCircle" size={14} />
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GradeBook;
