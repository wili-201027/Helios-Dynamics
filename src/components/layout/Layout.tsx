import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import StarField from './StarField';

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen relative flex flex-col">
    <StarField />
    <Navbar />
    <main className="relative z-10 pt-16 flex-1">
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;
