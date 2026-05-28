import Link from 'next/link';

export default function Header() {
    return (
        <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
            Центр ЕГЭ и ОГЭ
        </Link>
        <nav className="space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600">Главная</Link>
            <Link href="/courses" className="text-gray-700 hover:text-blue-600">Курсы</Link>
            <Link href="/teachers" className="text-gray-700 hover:text-blue-600">Преподаватели</Link>
            <Link href="/contacts" className="text-gray-700 hover:text-blue-600">Контакты</Link>
        </nav>
        </div>
        </header>
    );
}