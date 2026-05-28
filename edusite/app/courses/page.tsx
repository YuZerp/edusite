"use client";

import { useState } from "react";
import CourseCard from "@/components/CourseCard";
import RequestModal from "@/components/RequestModal";
import { courses } from "@/data";

export default function CoursesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState("");

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-8">Наши курсы</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        onRequest={() => {
                            setSelectedSubject(course.subject);
                            setIsModalOpen(true);
                        }}
                    />
                ))}
            </div>
            <RequestModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                preselectedSubject={selectedSubject}
            />
        </div>
    );
}