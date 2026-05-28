"use client";

import { useState } from 'react';

// ОБЪЯВЛЯЕМ ТИП ДО ИСПОЛЬЗОВАНИЯ (обязательно в начале файла)
interface RequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    preselectedSubject?: string;
}

interface RequestFormData {
    name: string;
    phone: string;
    subject: string;
    grade: string;
}

export default function RequestModal({ isOpen, onClose, preselectedSubject = '' }: RequestModalProps) {
    const [formData, setFormData] = useState<RequestFormData>({
        name: '',
        phone: '',
        subject: preselectedSubject,
        grade: '11'
    });
    const [brief, setBrief] = useState('');
    const [aiSuggestion, setAiSuggestion] = useState('');
    const [errors, setErrors] = useState<Partial<RequestFormData>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Функция ИИ-подбора предмета
    const suggestSubjectByAI = () => {
        const text = brief.toLowerCase();
        
        if (text.includes('математ') || text.includes('алгебр') || text.includes('геометр')) {
            setAiSuggestion('Математика');
        } else if (text.includes('русск') || text.includes('сочинен') || text.includes('изложен')) {
            setAiSuggestion('Русский язык');
        } else if (text.includes('обществ') || text.includes('общество')) {
            setAiSuggestion('Обществознание');
        } else if (text.includes('физик')) {
            setAiSuggestion('Физика');
        } else if (text.includes('информатик') || text.includes('программирован')) {
            setAiSuggestion('Информатика');
        } else if (text.includes('англ') || text.includes('english')) {
            setAiSuggestion('Английский язык');
        } else if (text.includes('хими')) {
            setAiSuggestion('Химия');
        } else if (text.includes('биологи')) {
            setAiSuggestion('Биология');
        } else if (text.includes('истори')) {
            setAiSuggestion('История');
        } else if (text.includes('литератур')) {
            setAiSuggestion('Литература');
        } else {
            setAiSuggestion('Не удалось определить. Выберите из списка.');
        }
    };

    const validate = (): boolean => {
        const newErrors: Partial<RequestFormData> = {};
        if (!formData.name.trim()) newErrors.name = 'Введите имя';
        if (!formData.phone.trim()) newErrors.phone = 'Введите телефон';
        else if (formData.phone.length < 10) newErrors.phone = 'Введите корректный телефон';
        if (!formData.subject) newErrors.subject = 'Выберите предмет';
        if (!formData.grade) newErrors.grade = 'Выберите класс';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        try {
            // Отправка на Django API
            const response = await fetch('http://localhost:8000/api/submit-request/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    subject: formData.subject,
                    grade: formData.grade,
                    brief: brief
                })
            });

            if (response.ok) {
                setSubmitted(true);
                setTimeout(() => {
                    setSubmitted(false);
                    onClose();
                    setFormData({ name: '', phone: '', subject: '', grade: '11' });
                    setBrief('');
                    setAiSuggestion('');
                }, 2000);
            } else {
                alert('Ошибка при отправке. Попробуйте позже.');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Ошибка соединения с сервером. Убедитесь, что Django запущен.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Запись на пробный урок</h2>
                    <button onClick={onClose} className="text-gray-500 text-2xl">&times;</button>
                </div>

                {submitted ? (
                    <div className="text-center py-8">
                        <div className="text-green-500 text-5xl mb-4">✓</div>
                        <h3 className="text-xl font-bold">Заявка отправлена!</h3>
                        <p className="text-gray-600 mt-2">Мы свяжемся с вами в ближайшее время.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Ваше имя *</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className={`w-full p-2 border rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Телефон *</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="+7 (999) 123-45-67"
                                className={`w-full p-2 border rounded-lg ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Пожелания / бриф</label>
                            <textarea
                                value={brief}
                                onChange={(e) => setBrief(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                rows={2}
                                placeholder="Например: нужна подготовка к профильной математике, сложно даётся геометрия"
                            />
                            <button
                                type="button"
                                onClick={suggestSubjectByAI}
                                className="mt-2 text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200"
                            >
                                🤖 Подобрать предмет (ИИ)
                            </button>
                            {aiSuggestion && (
                                <div className="mt-2 p-2 bg-green-50 rounded-lg">
                                    <p className="text-sm text-green-700">
                                        🔍 <strong>ИИ рекомендует:</strong> {aiSuggestion}
                                    </p>
                                    {aiSuggestion !== 'Не удалось определить. Выберите из списка.' && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setFormData({ ...formData, subject: aiSuggestion });
                                                setAiSuggestion('');
                                            }}
                                            className="mt-1 text-sm text-blue-600 underline"
                                        >
                                            ✅ Использовать эту рекомендацию
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Предмет *</label>
                            <select
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className={`w-full p-2 border rounded-lg ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
                            >
                                <option value="">Выберите предмет</option>
                                <option value="Математика">Математика</option>
                                <option value="Русский язык">Русский язык</option>
                                <option value="Обществознание">Обществознание</option>
                                <option value="Физика">Физика</option>
                                <option value="Информатика">Информатика</option>
                                <option value="Английский язык">Английский язык</option>
                                <option value="Химия">Химия</option>
                                <option value="Биология">Биология</option>
                                <option value="История">История</option>
                                <option value="Литература">Литература</option>
                            </select>
                            {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Класс *</label>
                            <select
                                value={formData.grade}
                                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            >
                                <option value="9">9 класс</option>
                                <option value="10">10 класс</option>
                                <option value="11">11 класс</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}