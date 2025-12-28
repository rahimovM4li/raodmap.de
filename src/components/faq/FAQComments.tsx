/**
 * FAQ Comments Component
 * Real-time comments with Supabase - Multilingual
 */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase, type FAQComment } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Send, MessageCircle, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { de, ru } from 'date-fns/locale';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/lib/i18n';

// Translations
const translations = {
  de: {
    title: 'Fragen & Kommentare',
    subtitle: 'Haben Sie eine Frage? Hinterlassen Sie einen Kommentar!',
    nicknameLabel: 'Nickname',
    nicknamePlaceholder: 'Ihr Name oder Nickname',
    messageLabel: 'Ihre Frage oder Kommentar',
    messagePlaceholder: 'Schreiben Sie Ihre Frage oder Ihren Kommentar hier...',
    charactersLabel: 'Zeichen',
    submitButton: 'Kommentar senden',
    submitting: 'Wird gesendet...',
    commentsCount: 'Kommentare',
    noComments: 'Noch keine Kommentare. Seien Sie der Erste!',
    errorNicknameTooShort: 'Nickname muss mindestens 2 Zeichen lang sein',
    errorMessageEmpty: 'Bitte geben Sie eine Nachricht ein',
    errorMessageTooLong: 'Nachricht darf maximal 500 Zeichen lang sein',
    errorSubmit: 'Fehler beim Senden. Bitte versuchen Sie es erneut.',
  },
  ru: {
    title: 'Вопросы и комментарии',
    subtitle: 'Есть вопрос? Оставьте комментарий!',
    nicknameLabel: 'Никнейм',
    nicknamePlaceholder: 'Ваше имя или никнейм',
    messageLabel: 'Ваш вопрос или комментарий',
    messagePlaceholder: 'Напишите ваш вопрос или комментарий здесь...',
    charactersLabel: 'символов',
    submitButton: 'Отправить комментарий',
    submitting: 'Отправка...',
    commentsCount: 'Комментариев',
    noComments: 'Пока нет комментариев. Будьте первым!',
    errorNicknameTooShort: 'Никнейм должен содержать минимум 2 символа',
    errorMessageEmpty: 'Пожалуйста, введите сообщение',
    errorMessageTooLong: 'Сообщение не должно превышать 500 символов',
    errorSubmit: 'Ошибка отправки. Пожалуйста, попробуйте снова.',
  },
  tj: {
    title: 'Саволҳо ва шарҳҳо',
    subtitle: 'Савол доред? Шарҳ гузоред!',
    nicknameLabel: 'Ном',
    nicknamePlaceholder: 'Номи шумо ё nickname',
    messageLabel: 'Саволи шумо ё шарҳ',
    messagePlaceholder: 'Саволи худ ё шарҳатонро дар ин ҷо нависед...',
    charactersLabel: 'аломат',
    submitButton: 'Шарҳ фиристодан',
    submitting: 'Фиристода мешавад...',
    commentsCount: 'Шарҳҳо',
    noComments: 'Ҳанӯз шарҳҳо нест. Якумин бошед!',
    errorNicknameTooShort: 'Ном бояд ҳадди ақал 2 аломат дошта бошад',
    errorMessageEmpty: 'Лутфан паёме ворид кунед',
    errorMessageTooLong: 'Паём набояд аз 500 аломат зиёд бошад',
    errorSubmit: 'Хатогӣ ҳангоми фиристодан. Лутфан аз нав кӯшиш кунед.',
  },
};

export default function FAQComments() {
  const { language } = useLanguage();
  const t = translations[language as Language] || translations.de;
  
  const [comments, setComments] = useState<FAQComment[]>([]);
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get locale for date formatting
  const getDateLocale = () => {
    switch (language) {
      case 'ru':
        return ru;
      case 'tj':
        return ru; // Tajik uses Russian locale for dates
      default:
        return de;
    }
  };

  // Load comments
  useEffect(() => {
    loadComments();
    const unsubscribe = subscribeToComments();
    return unsubscribe;
  }, []);

  const loadComments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('faq_comments')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setComments(data || []);
    } catch (err) {
      console.error('Error loading comments:', err);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToComments = () => {
    const channel = supabase
      .channel('faq_comments_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'faq_comments',
        },
        (payload) => {
          setComments((current) => [payload.new as FAQComment, ...current]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (nickname.trim().length < 2) {
      setError(t.errorNicknameTooShort);
      return;
    }

    if (message.trim().length < 1) {
      setError(t.errorMessageEmpty);
      return;
    }

    if (message.length > 500) {
      setError(t.errorMessageTooLong);
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const { error } = await supabase.from('faq_comments').insert([
        {
          nickname: nickname.trim(),
          message: message.trim(),
        },
      ]);

      if (error) throw error;

      // Clear form
      setMessage('');
      setNickname('');
    } catch (err) {
      console.error('Error posting comment:', err);
      setError(t.errorSubmit);
    } finally {
      setSubmitting(false);
    }
  };

  const getRelativeTime = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), {
        addSuffix: true,
        locale: getDateLocale(),
      });
    } catch {
      return language === 'tj' ? 'ба наздикӣ' : language === 'ru' ? 'недавно' : 'kürzlich';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <MessageCircle className="w-6 h-6 text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold">{t.title}</h2>
        </div>
        <p className="text-muted-foreground">
          {t.subtitle}
        </p>
      </div>

      {/* Comment Form */}
      <Card className="p-4 md:p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="nickname" className="text-sm font-medium flex items-center gap-2">
              <User className="w-4 h-4" />
              {t.nicknameLabel}
            </label>
            <Input
              id="nickname"
              placeholder={t.nicknamePlaceholder}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={50}
              disabled={submitting}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              {t.messageLabel}
            </label>
            <Textarea
              id="message"
              placeholder={t.messagePlaceholder}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={500}
              rows={4}
              disabled={submitting}
              required
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground text-right">
              {message.length} / 500 {t.charactersLabel}
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          <Button
            type="submit"
            disabled={submitting}
            className="w-full md:w-auto gap-2"
            size="lg"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t.submitting}
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                {t.submitButton}
              </>
            )}
          </Button>
        </form>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          {t.commentsCount} ({comments.length})
        </h3>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : comments.length === 0 ? (
          <Card className="p-8 text-center">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">
              {t.noComments}
            </p>
          </Card>
        ) : (
          <AnimatePresence mode="popLayout">
            {comments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="p-4 md:p-5 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-sm">
                          {comment.nickname}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          •
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {getRelativeTime(comment.created_at)}
                        </span>
                      </div>
                      <p className="text-sm md:text-base break-words whitespace-pre-wrap">
                        {comment.message}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
