interface HeroSectionProps {
    onRequest: () => void;
}

export default function HeroSection({ onRequest }: HeroSectionProps) {
    return (
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <h1 className="text-5xl font-bold mb-4">
                    Подготовка к ЕГЭ и ОГЭ
                </h1>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                    Опытные преподаватели, индивидуальный подход, гарантия результата.
                    Запишитесь на пробный урок бесплатно!
                </p>
                <button
                    onClick={onRequest}
                    className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition"
                >
                    Записаться на пробный урок
                </button>
            </div>
        </section>
    );
}