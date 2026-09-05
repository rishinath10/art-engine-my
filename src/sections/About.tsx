import { PageTransition } from '../components/PageTransition';
import { OrganicFlow } from '../components/OrganicFlow';
import { ParallaxPanel } from '../components/ParallaxPanel';

const stats = [
  { value: '100+', label: 'Projects Delivered' },
  { value: '50+', label: 'Happy Clients' },
  { value: '5+', label: 'Years of Experience' },
  { value: '∞', label: 'Bigger Possibilities' },
];

export function About() {
  return (
    <PageTransition>
      <div className="relative min-h-screen bg-offwhite px-6 pb-24 pt-32 md:px-16 md:pt-40 lg:px-24">
        <OrganicFlow />
        <div className="relative z-10 grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-purple">About Us</p>
            <h1 className="mt-6 font-display text-4xl leading-[1.1] text-navy sm:text-5xl md:text-6xl">
              More Than
              <br />a Digital Studio
            </h1>
            <p className="mt-8 max-w-lg text-lg text-muted">
              We are a creative technology partner dedicated to helping brands, businesses and
              people thrive in a digital world.
            </p>
            <p className="mt-6 max-w-lg text-muted">
              At Art Engine My Solutions, we combine creativity, technology and strategy to
              create meaningful digital experiences that drive real impact.
            </p>

            <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-3xl text-navy">{stat.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-wide text-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <ParallaxPanel className="h-[320px] w-full lg:h-[520px]" />
        </div>
      </div>
    </PageTransition>
  );
}
