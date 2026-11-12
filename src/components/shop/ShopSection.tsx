import { Reveal } from '../Reveal';
import { ProductCard } from './ProductCard';
import { QuoteForm } from './QuoteForm';
import { products, productGroups } from '../../data/shop';

/**
 * Sits at the foot of Services, after the six practices. Fixed-scope packages
 * can be bought outright; everything scoped to the problem keeps the quote
 * path below.
 */
export function ShopSection() {
  return (
    <section id="shop" className="mt-28 scroll-mt-24">
      <Reveal>
        <p className="font-sans text-[10px] uppercase tracking-[0.34em] text-purple">
          Buy or subscribe online
        </p>
        <h2 className="mt-5 font-display text-[clamp(1.9rem,4.4vw,3rem)] font-light leading-[1.08] tracking-[-0.02em] text-navy">
          Packages you can start
          <br />
          <span className="italic">today</span>
        </h2>
        <p className="mt-6 max-w-lg font-serif text-[17px] leading-relaxed text-navy/70">
          Fixed scope, fixed price, no quote needed. Prices are in ringgit and are what you
          pay — there is no tax added at checkout.
        </p>
      </Reveal>

      {productGroups.map((group) => {
        const inGroup = products.filter((p) => p.group === group.key);
        if (inGroup.length === 0) return null;

        return (
          <div key={group.key} className="mt-16">
            <Reveal>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-navy/10 pb-3">
                <h3 className="font-display text-[1.5rem] font-light text-navy">{group.title}</h3>
                <p className="font-serif text-[14px] italic text-muted">{group.note}</p>
                <p className="ml-auto font-sans text-[9px] uppercase tracking-[0.24em] text-royal/50">
                  {group.cadence}
                </p>
              </div>
            </Reveal>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {inGroup.map((product, i) => (
                <ProductCard key={product.slug} product={product} index={i} />
              ))}
            </div>
          </div>
        );
      })}

      <Reveal className="mt-20">
        <QuoteForm />
      </Reveal>
    </section>
  );
}
