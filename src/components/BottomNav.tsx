import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Compass,
  Map,
  HelpCircle,
  MoreHorizontal,
  GraduationCap,
  Briefcase,
  BookOpen,
  Heart,
  Users,
  Building,
  FileText,
  FolderOpen,
  Search,
} from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface NavDrawerItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

function NavDrawerSheet({
  open,
  onOpenChange,
  title,
  items,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  items: NavDrawerItem[];
}) {
  const location = useLocation();

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        <nav className="flex flex-col gap-1 px-4 pb-6">
          {items.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <DrawerClose asChild key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </DrawerClose>
            );
          })}
        </nav>
      </DrawerContent>
    </Drawer>
  );
}

export function BottomNav() {
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  const location = useLocation();
  const [pathsOpen, setPathsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  if (!isMobile) return null;

  const pathItems: NavDrawerItem[] = [
    { label: t.nav.study, path: "/study", icon: <GraduationCap className="h-5 w-5" /> },
    { label: t.nav.work, path: "/work", icon: <Briefcase className="h-5 w-5" /> },
    { label: t.nav.ausbildung, path: "/ausbildung", icon: <BookOpen className="h-5 w-5" /> },
    { label: t.nav.fsj, path: "/fsj", icon: <Heart className="h-5 w-5" /> },
    { label: t.nav.aupair, path: "/aupair", icon: <Users className="h-5 w-5" /> },
    { label: t.nav.living, path: "/living", icon: <Building className="h-5 w-5" /> },
  ];

  const moreItems: NavDrawerItem[] = [
    { label: t.nav.resources, path: "/resources", icon: <FolderOpen className="h-5 w-5" /> },
    { label: "CV Generator", path: "/cv-generator", icon: <FileText className="h-5 w-5" /> },
    { label: "Ausbildung finden", path: "/ausbildung-finden", icon: <Search className="h-5 w-5" /> },
  ];

  const pathRoutes = ["/study", "/work", "/ausbildung", "/fsj", "/aupair", "/living"];
  const moreRoutes = ["/resources", "/cv-generator", "/ausbildung-finden"];
  const isPathsActive = pathRoutes.includes(location.pathname);
  const isMoreActive = moreRoutes.includes(location.pathname);

  const items = [
    { key: "home", label: t.nav.home, icon: Home, path: "/", exact: true },
    { key: "paths", label: t.nav.pathsToGermany, icon: Compass, action: () => setPathsOpen(true), active: isPathsActive },
    { key: "roadmap", label: t.nav.roadmap, icon: Map, path: "/roadmap" },
    { key: "faq", label: t.nav.faq, icon: HelpCircle, path: "/faq" },
    { key: "more", label: "More", icon: MoreHorizontal, action: () => setMoreOpen(true), active: isMoreActive },
  ];

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
      >
        <div className="bg-background/95 backdrop-blur-xl border-t border-border/50 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
          <div
            className="flex items-center justify-around"
            style={{ paddingBottom: "env(safe-area-inset-bottom, 8px)" }}
          >
                {items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.active ??
                    (item.exact
                      ? location.pathname === item.path
                      : location.pathname === item.path);

                  if (item.action) {
                    return (
                      <button
                        key={item.key}
                        onClick={item.action}
                        aria-label={item.label}
                        className={cn(
                          "flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[64px] py-3 px-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg",
                          isActive ? "text-primary" : "text-muted-foreground"
                        )}
                      >
                        <motion.div
                          animate={{ scale: isActive ? 1.15 : 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        >
                          <Icon className="h-6 w-6" />
                        </motion.div>
                        <span className="text-[11px] font-medium leading-tight truncate max-w-[72px]">
                          {item.label}
                        </span>
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={item.key}
                      to={item.path!}
                      aria-label={item.label}
                      className={cn(
                        "flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[64px] py-3 px-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      <motion.div
                        animate={{ scale: isActive ? 1.15 : 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      >
                        <Icon className="h-6 w-6" />
                      </motion.div>
                      <span className="text-[11px] font-medium leading-tight truncate max-w-[72px]">
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
      </nav>

      <NavDrawerSheet
        open={pathsOpen}
        onOpenChange={setPathsOpen}
        title={t.nav.pathsToGermany}
        items={pathItems}
      />
      <NavDrawerSheet
        open={moreOpen}
        onOpenChange={setMoreOpen}
        title="More"
        items={moreItems}
      />
    </>
  );
}
