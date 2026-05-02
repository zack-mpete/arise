import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Explore from "./pages/Explore";
import ProjectDetail from "./pages/ProjectDetail";
import About from "./pages/About";
import Overview from "./pages/dashboard/Overview";
import Projects from "./pages/dashboard/Projects";
import CreateProject from "./pages/dashboard/CreateProject";
import CertificateView from "./pages/dashboard/CertificateView";
import Opportunities from "./pages/dashboard/Opportunities";
import Profile from "./pages/dashboard/Profile";


import MobileBottomNav from "./components/MobileBottomNav";

function Router() {
  return (
    <>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/explore"} component={Explore} />
        <Route path={"/project/:id"} component={ProjectDetail} />
        <Route path={"/about"} component={About} />
        
        {/* Auth Routes */}
        <Route path={"/login"} component={Login} />
        <Route path={"/signup"} component={Signup} />
        
        {/* Dashboard Routes (Protected in a real app) */}
        <Route path={"/dashboard"} component={Overview} />
        <Route path={"/dashboard/projects"} component={Projects} />
        <Route path={"/dashboard/projects/new"} component={CreateProject} />
        <Route path={"/dashboard/projects/:id/certificate"} component={CertificateView} />
        <Route path={"/dashboard/opportunities"} component={Opportunities} />
        <Route path={"/dashboard/profile"} component={Profile} />
        
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
      <MobileBottomNav />
    </>
  );
}


// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
