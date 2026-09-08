import React, { useState } from 'react';
import { Plus, Mail, MapPin, Clock, BookOpen, X } from 'lucide-react';
import { Course, Task } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface CoursesScreenProps {
  courses: Course[];
  tasks: Task[];
  onOpenCreateCourse: () => void;
  onUpdateCourseProgress: (courseId: string, progress: number) => void;
}

export const CoursesScreen: React.FC<CoursesScreenProps> = ({
  courses,
  tasks,
  onOpenCreateCourse,
  onUpdateCourseProgress,
}) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const totalCredits = courses.reduce((acc, c) => acc + c.credits, 0);

  return (
    <div className="space-y-4 pb-8">
      {/* Header & Add Button */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h2 className="text-base font-bold text-[#1E293B]">Enrolled Courses</h2>
          <p className="text-xs text-[#64748B]">
            {courses.length} Courses • {totalCredits} Total Credits
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="w-3.5 h-3.5" />}
          onClick={onOpenCreateCourse}
        >
          Add Course
        </Button>
      </div>

      {/* Courses List */}
      {courses.length === 0 ? (
        <div className="border border-[#E2E8F0] rounded-xl p-8 text-center bg-[#F8FAFC]">
          <p className="text-sm font-semibold text-[#1E293B]">No courses added</p>
          <p className="text-xs text-[#64748B] mt-1 mb-4">
            Enroll your courses to organize your timetable and track assignments.
          </p>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            onClick={onOpenCreateCourse}
          >
            Add Your First Course
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {courses.map((course) => {
            const courseTasks = tasks.filter((t) => t.courseId === course.id || t.courseCode === course.code);
            const pendingTasks = courseTasks.filter((t) => !t.completed).length;

            return (
              <Card
                key={course.id}
                padding="md"
                variant="interactive"
                onClick={() => setSelectedCourse(course)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#4056D6] bg-[#F2F4FC] px-2 py-0.5 rounded-md">
                        {course.code}
                      </span>
                      <span className="text-xs text-[#64748B] font-medium">
                        {course.credits} Credits
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#1E293B] mt-1.5 leading-snug">
                      {course.name}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-[#4056D6]">
                    {course.progressPercentage}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#F1F5F9] rounded-full h-1.5 my-3 overflow-hidden">
                  <div
                    className="bg-[#4056D6] h-full rounded-full transition-all duration-300"
                    style={{ width: `${course.progressPercentage}%` }}
                  />
                </div>

                {/* Lecturer info & room */}
                <div className="flex flex-col gap-1 text-xs text-[#64748B] pt-1 border-t border-[#F1F5F9]">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#1E293B]">
                      {course.lecturer.name}
                    </span>
                    <span className="text-[11px] text-[#4056D6] font-medium">
                      {pendingTasks} task{pendingTasks === 1 ? '' : 's'} pending
                    </span>
                  </div>
                  {course.room && (
                    <div className="flex items-center gap-1 text-[#64748B]">
                      <MapPin className="w-3 h-3" />
                      <span>{course.room}</span>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-0 sm:p-4 overflow-y-auto">
          <div
            className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl p-5 border border-[#E2E8F0] shadow-xl max-h-[92vh] flex flex-col my-auto"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#4056D6] bg-[#F2F4FC] px-2 py-0.5 rounded-md">
                  {selectedCourse.code}
                </span>
                <span className="text-xs font-medium text-[#64748B]">
                  {selectedCourse.credits} Credits
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#1E293B] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-[#1E293B]">{selectedCourse.name}</h3>
                {selectedCourse.room && (
                  <p className="text-xs text-[#64748B] mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#64748B]" /> {selectedCourse.room}
                  </p>
                )}
              </div>

              {/* Progress Tracker Slider */}
              <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#1E293B]">Coursework Progress</span>
                  <span className="text-xs font-bold text-[#4056D6]">
                    {selectedCourse.progressPercentage}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={selectedCourse.progressPercentage}
                  onChange={(e) => {
                    const newProgress = parseInt(e.target.value, 10);
                    setSelectedCourse({ ...selectedCourse, progressPercentage: newProgress });
                    onUpdateCourseProgress(selectedCourse.id, newProgress);
                  }}
                  className="w-full accent-[#4056D6] cursor-pointer"
                />
                <p className="text-[11px] text-[#64748B] mt-1">
                  Drag slider to update completed syllabus & problem set percentage.
                </p>
              </div>

              {/* Lecturer Info */}
              <div className="border border-[#E2E8F0] rounded-xl p-3.5 space-y-2">
                <h4 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                  Instructor Information
                </h4>
                <div className="font-bold text-sm text-[#1E293B]">{selectedCourse.lecturer.name}</div>
                <div className="text-xs text-[#64748B] flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#64748B]" />
                  <a
                    href={`mailto:${selectedCourse.lecturer.email}`}
                    className="text-[#4056D6] hover:underline"
                  >
                    {selectedCourse.lecturer.email}
                  </a>
                </div>
                {selectedCourse.lecturer.office && (
                  <div className="text-xs text-[#64748B] flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#64748B]" />
                    <span>{selectedCourse.lecturer.office}</span>
                  </div>
                )}
                {selectedCourse.lecturer.officeHours && (
                  <div className="text-xs text-[#64748B] flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#64748B]" />
                    <span>Office Hours: {selectedCourse.lecturer.officeHours}</span>
                  </div>
                )}
              </div>

              {/* Notes */}
              {selectedCourse.notes && (
                <div className="border border-[#E2E8F0] rounded-xl p-3.5">
                  <h4 className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1">
                    Syllabus / Policies
                  </h4>
                  <p className="text-xs text-[#1E293B] leading-relaxed">{selectedCourse.notes}</p>
                </div>
              )}

              {/* Linked Tasks */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                  Assignments & Tasks
                </h4>
                {tasks.filter((t) => t.courseId === selectedCourse.id || t.courseCode === selectedCourse.code)
                  .length === 0 ? (
                  <p className="text-xs text-[#94A3B8] italic">No tasks created for this course yet.</p>
                ) : (
                  tasks
                    .filter(
                      (t) => t.courseId === selectedCourse.id || t.courseCode === selectedCourse.code
                    )
                    .map((t) => (
                      <div
                        key={t.id}
                        className="flex items-center justify-between p-2.5 bg-[#F8FAFC] rounded-lg text-xs"
                      >
                        <span
                          className={`font-semibold ${
                            t.completed ? 'line-through text-[#94A3B8]' : 'text-[#1E293B]'
                          }`}
                        >
                          {t.title}
                        </span>
                        <span className="text-[#64748B]">Due {t.dueDate}</span>
                      </div>
                    ))
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-[#E2E8F0]">
              <Button
                variant="outline"
                fullWidth
                onClick={() => setSelectedCourse(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
