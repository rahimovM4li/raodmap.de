import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const t = {
    tj: {
      title: '404',
      message: 'Саҳифа ёфт нашуд!',
      link: 'Бозгашт ба саҳифаи асосӣ',
    },
    ru: {
      title: '404',
      message: 'Страница не найдена!',
      link: 'Вернуться на главную',
    },
    de: {
      title: '404',
      message: 'Seite nicht gefunden!',
      link: 'Zurück zur Startseite',
    },
  };

  const text = t[language];

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">{text.title}</h1>
        <p className="mb-4 text-xl text-muted-foreground">{text.message}</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          {text.link}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
