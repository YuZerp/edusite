"use client";

import { useState } from "react";
import RequestModal from "@/components/RequestModal";

export default function ContactsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-8">Контакты</h1>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-4">Свяжитесь с нами</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">📞</span>
                            <div>
                                <p className="font-semibold">Телефон</p>
                                <p className="text-gray-600">+7 (999) 123-45-67</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">✉️</span>
                            <div>
                                <p className="font-semibold">Email</p>
                                <p className="text-gray-600">info@ege-centre.ru</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">📍</span>
                            <div>
                                <p className="font-semibold">Адрес</p>
                                <p className="text-gray-600">г. Челябинск, ул. Центральная, д. 10</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                    >
                        Записаться на пробный урок
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-4">Режим работы</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span>Понедельник - Пятница</span>
                            <span className="font-semibold">10:00 - 20:00</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Суббота</span>
                            <span className="font-semibold">10:00 - 18:00</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Воскресенье</span>
                            <span className="font-semibold">Выходной</span>
                        </div>
                    </div>
                </div>
            </div>

            <RequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}