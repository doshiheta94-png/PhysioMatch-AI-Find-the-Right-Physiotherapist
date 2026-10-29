import React, { useState } from 'react';
import { ChevronDown, AlertTriangle, HelpCircle, ShieldCheck, Stethoscope } from 'lucide-react';

interface AccordionItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: string | React.ReactNode;
}

export const ClinicalAccordion: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['matching-logic']);

  const toggle = (id: string) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((item) => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  const items: AccordionItem[] = [
    {
      id: 'matching-logic',
      title: 'How does PhysioMatch AI calculate evidence-informed match scores?',
      icon: <Stethoscope className="w-4 h-4 text-teal-600" />,
      content:
        'Unlike basic geographic directories that rank by ad spend, PhysioMatch AI cross-references your anatomical zone (e.g. lumbar spine) with verified postgraduate clinical qualifications (e.g., Cert. MDT, OCS, M.P.Th.), symptom chronicity (>3 months requires senior complex care specialists), and targeted modalities (e.g. neurodynamics for radiating numbness, Mulligan MWM for spinal facet derangements).',
    },
    {
      id: 'credentials-guide',
      title: 'What do the letters behind a physiotherapist’s name actually mean?',
      icon: <ShieldCheck className="w-4 h-4 text-teal-600" />,
      content: (
        <div className="space-y-2 text-xs">
          <p>Postgraduate credentials signify rigorous subspecialty board examinations and fellowship training:</p>
          <ul className="list-disc pl-4 space-y-1 text-slate-700">
            <li><strong>M.P.Th. (Musculoskeletal & Sports)</strong>: Advanced Master’s degree specializing in biomechanics, sports pathology, and joint mobilization.</li>
            <li><strong>OCS (Orthopedic Certified Specialist)</strong>: Board-certified specialist in musculoskeletal, joint, and spinal disorders.</li>
            <li><strong>Cert. MDT (McKenzie Method)</strong>: Internationally certified in mechanical spinal diagnosis and radiating disc centralization.</li>
            <li><strong>FAAOMPT</strong>: Fellow of American Academy of Orthopaedic Manual Physical Therapists (highest tier of hands-on manual fellowship).</li>
            <li><strong>NCS (Neurologic Clinical Specialist)</strong>: Board-certified specialist in vestibular balance, concussion, and nerve disorders.</li>
            <li><strong>CHT (Certified Hand Therapist)</strong>: Elite credential for elbow, forearm, wrist, and tendon rehabilitation.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'red-flags',
      title: 'Clinical Red Flags — When to seek emergency medical attention',
      icon: <AlertTriangle className="w-4 h-4 text-rose-600" />,
      content: (
        <div className="space-y-2 text-xs text-slate-700">
          <p className="font-semibold text-rose-700">
            Physiotherapy is intended for non-emergency musculoskeletal, vestibular, and post-operative conditions. Go to an emergency department or contact your physician immediately if you experience:
          </p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Sudden loss of bowel or bladder control (saddle anesthesia / Cauda Equina Syndrome).</li>
            <li>Sudden weakness where you cannot lift your foot (foot drop) or cannot stand.</li>
            <li>Severe crushing chest pain, unexplained shortness of breath, or pain radiating into the jaw.</li>
            <li>High fever accompanied by severe unremitting spinal pain that does not change with position.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'telehealth-vs-inclinic',
      title: 'Should I choose an In-Clinic appointment or Telehealth video session?',
      icon: <HelpCircle className="w-4 h-4 text-teal-600" />,
      content:
        'In-clinic care is recommended when you need manual joint mobilization, dry needling, shockwave therapy, or acute post-operative passive range of motion. Telehealth is highly effective for directional preference exercise prescription (such as McKenzie extension/flexion), progressive load rehabilitation, ergonomic posture adjustments, and follow-up guidance.',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-4">
      <div className="pb-3 border-b border-slate-100">
        <span className="text-xs uppercase font-bold tracking-wider text-teal-800">
          Patient Clinical Guide & FAQ
        </span>
        <h3 className="text-lg font-bold text-slate-900 mt-0.5">
          Frequently Asked Questions & Evidence Standards
        </h3>
      </div>

      <div className="divide-y divide-slate-100">
        {items.map((item) => {
          const isOpen = openIds.includes(item.id);
          return (
            <div key={item.id} className="py-3.5">
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className="w-full flex items-center justify-between text-left text-sm font-semibold text-slate-900 hover:text-teal-800 transition-colors gap-3"
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.title}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-teal-700' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="mt-2.5 pl-6 text-xs text-slate-600 leading-relaxed animate-in fade-in duration-150">
                  {item.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
