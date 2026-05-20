import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Button } from '@/components/Button/Button';
import styles from './page.module.css';

// SEO Pages Configuration
const servicePages: Record<string, { title: string, description: string, content: string, faqs: { q: string, a: string }[] }> = {
  'tv-mounting-san-mateo': {
    title: 'Professional TV Mounting in San Mateo',
    description: 'Expert TV wall mounting services in San Mateo and the Bay Area. Wire concealment, perfectly level, and safe installation. Call for a free quote.',
    content: 'Are you looking for reliable TV mounting services in San Mateo? Nar Technique specializes in professional, clean, and perfectly level TV installations. Whether you need a standard drywall mount, fireplace mounting, or complex wire concealment, we have the technical expertise to get the job done right the first time.',
    faqs: [
      { q: 'Do you provide the TV mount?', a: 'We can provide high-quality tilting or full-motion mounts for an additional fee, or we can use a mount you have already purchased.' },
      { q: 'Can you hide the wires inside the wall?', a: 'Yes, we offer professional wire concealment services to give your setup a clean, floating appearance.' }
    ]
  },
  'ceiling-fan-installation-san-mateo': {
    title: 'Ceiling Fan Installation in San Mateo',
    description: 'Safe and professional ceiling fan installation in San Mateo. Replace old fans or install new ones with expert care.',
    content: 'Upgrade your home\'s comfort and energy efficiency with a new ceiling fan. Nar Technique offers professional ceiling fan installation in San Mateo. We ensure safe wiring, secure mounting to prevent wobbling, and clean installation.',
    faqs: [
      { q: 'Can you install a fan where there is no existing light?', a: 'Yes, but it requires running new wiring and installing a fan-rated junction box, which takes more time than a simple replacement.' },
      { q: 'Do you assemble the fan?', a: 'Yes, full assembly of the new fan is included in our installation service.' }
    ]
  },
  'faucet-replacement-san-mateo': {
    title: 'Faucet/Sink  Replacement in San Mateo',
    description: 'Quick and clean faucet/Sink replacement services in San Mateo for kitchens and bathrooms. Professional handyman plumbing services.',
    content: 'A leaky or outdated faucet can ruin the look of your kitchen or bathroom. We provide fast, reliable, and clean faucet/Sink replacement services in San Mateo. We handle the removal of the old fixture, clean the area, and perfectly install the new one without the premium plumbing costs.',
    faqs: [
      { q: 'Do I need to buy the faucet first?', a: 'Yes, we ask that you purchase the faucet you want, and we will handle the professional installation.' },
      { q: 'What if my shut-off valves are stuck?', a: 'We have the tools and experience to safely handle tricky plumbing situations under the sink.' }
    ]
  },
  'garbage-disposal-installation-san-mateo': {
    title: 'Garbage Disposal Installation in San Mateo',
    description: 'Fast garbage disposal replacement and installation in San Mateo. Get your kitchen sink working perfectly again.',
    content: 'Is your garbage disposal jammed, leaking, or making a terrible noise? Nar Technique provides professional garbage disposal replacement in San Mateo. We\'ll swap out your old unit with a new one, ensuring all connections are watertight and secure.',
    faqs: [
      { q: 'Do you haul away the old disposal?', a: 'Yes, we can haul away and dispose of the old unit for your convenience.' },
      { q: 'How long does installation take?', a: 'A standard garbage disposal replacement typically takes about 1-2 hours.' }
    ]
  },
  'light-fixture-installation-san-mateo': {
    title: 'Light Fixture Installation in San Mateo',
    description: 'Professional lighting installation for chandeliers, pendants, and flush mounts in San Mateo.',
    content: 'Brighten up your home with our professional light fixture installation services in San Mateo. From elegant dining room chandeliers to modern kitchen pendants, we ensure safe and secure installation of all your lighting fixtures.',
    faqs: [
      { q: 'Can you install heavy chandeliers?', a: 'Yes, but very heavy fixtures may require us to install additional support in the ceiling.' },
      { q: 'Do you change light switches too?', a: 'Yes, we can upgrade your switches to dimmers or smart switches as part of the service.' }
    ]
  },
  'toilet-installation-san-mateo': {
    title: 'Toilet Installation & Replacement in San Mateo',
    description: 'Professional toilet replacement services in San Mateo. Clean, reliable, and perfectly sealed.',
    content: 'Upgrade your bathroom with a new toilet. We provide professional toilet installation and replacement in San Mateo. We carefully remove the old unit, ensure the flange is in good condition, and install the new toilet with a perfect wax ring seal to prevent any future leaks.',
    faqs: [
      { q: 'Do you dispose of the old toilet?', a: 'Yes, we offer haul-away services for your old toilet.' },
      { q: 'What if the floor underneath is damaged?', a: 'If we discover water damage to the subfloor, we will discuss the best repair options with you before proceeding.' }
    ]
  },
  'appliance-installation-san-mateo': {
    title: 'Appliance Installation in San Mateo',
    description: 'Expert installation of washers, dryers, dishwashers, and over-the-range microwaves in San Mateo.',
    content: 'Just bought new appliances? Nar Technique provides expert appliance installation in San Mateo. We install dishwashers, washers, dryers, and over-the-range microwaves, ensuring all water, drain, and electrical connections are perfectly secure.',
    faqs: [
      { q: 'Do you install built-in appliances?', a: 'Yes, we install built-in microwaves, dishwashers, and wall ovens.' },
      { q: 'Do you pick up the appliance from the store?', a: 'No, we require the appliance to be delivered to your home prior to our installation appointment.' }
    ]
  },
  'furniture-assembly-san-mateo': {
    title: 'Furniture Assembly in San Mateo',
    description: 'Fast and correct furniture assembly in San Mateo for IKEA, Wayfair, and custom pieces.',
    content: 'Save yourself the weekend headache. We offer professional furniture assembly in San Mateo. Whether it\'s a complex IKEA wardrobe, a Wayfair bed frame, or a heavy desk, we assemble it quickly, correctly, and sturdily.',
    faqs: [
      { q: 'Do you anchor furniture to the wall?', a: 'Yes, for safety, especially with children in the home, we highly recommend and provide wall anchoring for dressers and bookshelves.' },
      { q: 'Do you clean up the packaging?', a: 'We break down all cardboard boxes and organize the trash, leaving your space clean.' }
    ]
  },
  'art-installation-san-mateo': {
    title: 'Art & Mirror Installation in San Mateo',
    description: 'Professional picture hanging, heavy mirror mounting, and gallery wall installation in San Mateo. Level, secure, and clean.',
    content: 'Hanging heavy mirrors or creating the perfect gallery wall requires precision and the right hardware. We offer professional art and mirror installation services in San Mateo. Whether you need to securely anchor a massive mirror or perfectly align a series of frames, we have the tools and expertise to ensure your pieces are safe, level, and beautifully displayed.',
    faqs: [
      { q: 'Can you hang heavy mirrors on drywall?', a: 'Yes, we use specialized heavy-duty anchors designed specifically to hold substantial weight safely in drywall, even without a stud.' },
      { q: 'Do you design gallery walls?', a: 'While we don\'t provide interior design services, if you lay out the arrangement you want, we will measure, level, and hang them perfectly to your specifications.' }
    ]
  },
  'water-treatment-installation-san-mateo': {
    title: 'Water Treatment System Installation in San Mateo',
    description: 'Expert under-sink water filter and RO system installation and replacement services in San Mateo and the Bay Area.',
    content: 'Ensure your home has access to pure, clean drinking water with professional water treatment system installation in San Mateo. We specialize in cleanly installing under-sink Reverse Osmosis (RO) units, simple inline water filters, and replacing old filtration systems with zero leaks.',
    faqs: [
      { q: 'Do you install Reverse Osmosis (RO) systems?', a: 'Yes, we professionally install under-sink RO systems, including safely drilling holes in countertops for the dedicated drinking water faucet if necessary.' },
      { q: 'Can you replace my old water filter system?', a: 'Absolutely. We can cleanly remove your old system, dispose of it, and install a brand new modern water treatment system.' }
    ]
  },
  'window-ac-installation-san-mateo': {
    title: 'Window / Portable AC Installation in San Mateo',
    description: 'Professional window and portable air conditioning installation services in San Mateo and the Bay Area. Secure, properly sealed, and efficient cooling setup.',
    content: 'Stay cool during the summer heat with our professional window and portable air conditioning installation services. Installing an AC unit correctly is crucial for both efficiency and safety. We ensure your window unit is securely mounted, perfectly leveled for proper drainage, and tightly sealed to prevent drafts and bugs. For portable units, we correctly vent the exhaust securely through your window.',
    faqs: [
      { q: 'Do you provide the AC unit?', a: 'No, you provide the unit, and we handle the professional installation and sealing.' },
      { q: 'Can you install an AC in a sliding window?', a: 'Yes, we can install AC units in both traditional double-hung windows and horizontal sliding windows, though they require different installation techniques and sealing materials.' }
    ]
  }
};

export function generateStaticParams() {
  return Object.keys(servicePages).map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const page = servicePages[resolvedParams.slug];
  if (!page) return { title: 'Not Found' };

  return {
    title: `${page.title} | Nar Technique`,
    description: page.description,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const page = servicePages[resolvedParams.slug];

  if (!page) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>{page.title}</h1>
        <p className={styles.subtitle}>{page.description}</p>
      </div>

      <div className={styles.content}>
        <div className={styles.mainContent}>
          <h2>Expert Service You Can Trust</h2>
          <p>{page.content}</p>
          <p>At Nar Technique, we understand that inviting someone into your home requires trust. That's why we prioritize cleanliness, clear communication, and impeccable attention to detail on every single job. We serve San Mateo and the broader Bay Area with premium handyman services designed to make your life easier.</p>

          <div className={styles.faqSection}>
            <h2>Frequently Asked Questions</h2>
            {page.faqs.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.sidebar}>
          <h3>Ready to book your {page.title.split(' in ')[0].toLowerCase()}?</h3>
          <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-muted)' }}>
            Contact us today for a free, no-obligation quote. We often have same-day or next-day availability!
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Button href="tel:6507409472" fullWidth>Call: (650) 740-9472</Button>
            <Button href="sms:6507409472" variant="outline" fullWidth>Text Us Photos</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
