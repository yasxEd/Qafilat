'use client';

import { useState, useEffect } from 'react';

// Types (same as in your dashboard)
interface TarifsChambre {
  quintuple: string;
  quadruple: string;
  triple: string;
  double: string;
}

interface Hotel {
  id: string;
  nom: string;
  distance?: string;
  tarifsChambre: TarifsChambre;
}

interface DateDisponible {
  id: string;
  dateDebut: string;
  dateFin: string;
  periode: string;
}

interface Offre {
  id: string;
  titre: string;
  periode: string;
  datesDisponibles: DateDisponible[];
  prixBase: string;
  compagniesAeriennes: string;
  hebergement: string;
  hotels: Hotel[];
  tarifsChambre: TarifsChambre;
  servicesInclus: string[];
  image: string;
  destination: string;
  duree: string;
  note: number;
  nombrePersonnes: string;
  dateCreation: string;
  statut: 'active' | 'inactive' | 'brouillon';
  category: 'omra' | 'hajj';
}

export const useOffersData = () => {
  const [offres, setOffres] = useState<Offre[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize data
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initializeData = () => {
      try {
        const savedOffres = localStorage.getItem('offres');
        
        if (!savedOffres || savedOffres === '[]') {
          // Load sample data if no data exists
          const sampleData = getSampleOffres();
          localStorage.setItem('offres', JSON.stringify(sampleData));
          setOffres(sampleData);
        } else {
          const parsedData = JSON.parse(savedOffres);
          setOffres(parsedData);
        }
      } catch (error) {
        console.error('Error loading offers data:', error);
        // Fallback to sample data if there's an error
        const sampleData = getSampleOffres();
        localStorage.setItem('offres', JSON.stringify(sampleData));
        setOffres(sampleData);
      } finally {
        setIsLoaded(true);
      }
    };

    initializeData();
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('offres', JSON.stringify(offres));
    }
  }, [offres, isLoaded]);

  const addOffre = (offre: Offre) => {
    setOffres(prev => [offre, ...prev]);
  };

  const updateOffre = (updatedOffre: Offre) => {
    setOffres(prev => prev.map(offre => 
      offre.id === updatedOffre.id ? updatedOffre : offre
    ));
  };

  const deleteOffre = (id: string) => {
    setOffres(prev => prev.filter(offre => offre.id !== id));
  };

  return {
    offres,
    isLoaded,
    addOffre,
    updateOffre,
    deleteOffre,
    setOffres
  };
};

// Sample data function
const getSampleOffres = (): Offre[] => {
  const servicesDisponibles = [
    'Billet d\'avion aller-retour',
    'Hébergement en hôtels',
    'Frais et procédures de visa',
    'Transport en bus climatisés',
    'Visites de Médine et La Mecque',
    'Encadrement religieux et technique'
  ];

  return [
    {
      id: 'omra-ramadan-1',
      titre: 'Omra du Ramadan',
      periode: 'Du 19 février au 26 mars',
      datesDisponibles: [
        {
          id: 'date1',
          dateDebut: '2024-02-19',
          dateFin: '2024-03-26',
          periode: 'Du 19 février au 26 mars 2024'
        }
      ],
      prixBase: 'À partir de 20 500 MAD',
      compagniesAeriennes: 'Aegean Airlines (Athènes – Djeddah – Athènes)',
      hebergement: 'Médine + La Mecque',
      hotels: [
        {
          id: 'hotel1',
          nom: 'Dyar Al-Orouba',
          distance: '800m de la Mosquée',
          tarifsChambre: {
            quintuple: '20500',
            quadruple: '23500',
            triple: '25500',
            double: '30500'
          }
        }
      ],
      tarifsChambre: {
        quintuple: '20500',
        quadruple: '23500',
        triple: '25500',
        double: '30500'
      },
      servicesInclus: [
        'Billet d\'avion aller-retour',
        'Hébergement dans les hôtels mentionnés ou similaires',
        'Frais et démarches de visa',
        'Transferts en bus climatisés',
        'Visites à Médine et La Mecque',
        'Encadrement religieux et technique'
      ],
      image: '/offers/1.jpg',
      destination: 'Arabie Saoudite',
      duree: '15 jours',
      note: 5,
      nombrePersonnes: '25-40',
      dateCreation: new Date().toISOString(),
      statut: 'active',
      category: 'omra'
    },
    {
      id: 'omra-chaabane-ramadan',
      titre: 'Omra de Chaâbane et Ramadan',
      periode: 'Du 05 au 22 février / du 07 au 24 février',
      datesDisponibles: [
        {
          id: 'date1',
          dateDebut: '2024-02-05',
          dateFin: '2024-02-22',
          periode: 'Du 05 au 22 février 2024'
        },
        {
          id: 'date2',
          dateDebut: '2024-02-07',
          dateFin: '2024-02-24',
          periode: 'Du 07 au 24 février 2024'
        }
      ],
      prixBase: 'À partir de 15 500 MAD',
      compagniesAeriennes: 'Saudia Airlines (Casablanca – Riyad – Médine)',
      hebergement: 'La Mecque',
      hotels: [
        {
          id: 'hotel1',
          nom: 'Abraj Al-Kiswah',
          distance: '950m de la Mosquée',
          tarifsChambre: {
            quintuple: '15500',
            quadruple: '16500',
            triple: '17500',
            double: '18500'
          }
        }
      ],
      tarifsChambre: {
        quintuple: '15500',
        quadruple: '16500',
        triple: '17500',
        double: '18500'
      },
      servicesInclus: [
        'Billet d\'avion aller-retour',
        'Hébergement dans les hôtels mentionnés ou similaires',
        'Frais et démarches de visa',
        'Transferts en bus climatisés',
        'Visites à Médine et La Mecque',
        'Encadrement religieux et technique'
      ],
      image: '/offers/2.jpg',
      destination: 'Arabie Saoudite',
      duree: '17 jours',
      note: 4.8,
      nombrePersonnes: '20-35',
      dateCreation: new Date().toISOString(),
      statut: 'active',
      category: 'omra'
    },
    {
      id: 'omra-vacances-scolaires',
      titre: 'Omra des vacances scolaires',
      periode: 'Du 18 au 25 octobre',
      datesDisponibles: [
        {
          id: 'date1',
          dateDebut: '2024-10-18',
          dateFin: '2024-10-25',
          periode: 'Du 18 au 25 octobre 2024'
        }
      ],
      prixBase: 'À partir de 11 500 MAD',
      compagniesAeriennes: 'Saudia Airlines (Djeddah – Médine via train Haramain)',
      hebergement: 'La Mecque - Plusieurs options disponibles',
      hotels: [
        {
          id: 'hotel1',
          nom: 'Mathaba',
          distance: '950m de la Mosquée',
          tarifsChambre: {
            quintuple: '',
            quadruple: '11500',
            triple: '12500',
            double: '13500'
          }
        },
        {
          id: 'hotel2',
          nom: 'Crowne Plaza',
          distance: 'Petit-déjeuner inclus',
          tarifsChambre: {
            quintuple: '',
            quadruple: '15500',
            triple: '16500',
            double: '18000'
          }
        },
        {
          id: 'hotel3',
          nom: 'Anjum',
          distance: 'Petit-déjeuner inclus',
          tarifsChambre: {
            quintuple: '',
            quadruple: '17500',
            triple: '18500',
            double: '20500'
          }
        }
      ],
      tarifsChambre: {
        quintuple: '',
        quadruple: '11500',
        triple: '12500',
        double: '13500'
      },
      servicesInclus: servicesDisponibles,
      image: '/offers/3.jpg',
      destination: 'Arabie Saoudite',
      duree: '7 jours',
      note: 4.7,
      nombrePersonnes: '15-30',
      dateCreation: new Date().toISOString(),
      statut: 'active',
      category: 'omra'
    },
    {
      id: 'omra-octobre-1',
      titre: 'Omra d\'octobre (02 – 14 octobre)',
      periode: 'Du 02 au 14 octobre',
      datesDisponibles: [
        {
          id: 'date1',
          dateDebut: '2024-10-02',
          dateFin: '2024-10-14',
          periode: 'Du 02 au 14 octobre 2024'
        }
      ],
      prixBase: 'À partir de 14 000 MAD',
      compagniesAeriennes: 'Saudia Airlines (vol direct vers Djeddah)',
      hebergement: 'La Mecque - Plusieurs options',
      hotels: [
        {
          id: 'hotel1',
          nom: 'Mathaba',
          distance: '950m de la Mosquée',
          tarifsChambre: {
            quintuple: '',
            quadruple: '14000',
            triple: '15000',
            double: '16000'
          }
        },
        {
          id: 'hotel2',
          nom: 'Anjum',
          distance: 'Petit-déjeuner inclus',
          tarifsChambre: {
            quintuple: '',
            quadruple: '21500',
            triple: '22500',
            double: '24000'
          }
        },
        {
          id: 'hotel3',
          nom: 'Swiss Makkah',
          distance: 'Petit-déjeuner inclus',
          tarifsChambre: {
            quintuple: '',
            quadruple: '24000',
            triple: '26000',
            double: '29000'
          }
        }
      ],
      tarifsChambre: {
        quintuple: '',
        quadruple: '14000',
        triple: '15000',
        double: '16000'
      },
      servicesInclus: servicesDisponibles,
      image: '/offers/4.jpg',
      destination: 'Arabie Saoudite',
      duree: '12 jours',
      note: 4.9,
      nombrePersonnes: '20-40',
      dateCreation: new Date().toISOString(),
      statut: 'active',
      category: 'omra'
    },
    {
      id: 'omra-septembre',
      titre: 'Omra de septembre (18 – 30 septembre)',
      periode: 'Du 18 au 30 septembre',
      datesDisponibles: [
        {
          id: 'date1',
          dateDebut: '2024-09-18',
          dateFin: '2024-09-30',
          periode: 'Du 18 au 30 septembre 2024'
        }
      ],
      prixBase: 'À partir de 14 500 MAD',
      compagniesAeriennes: 'Royal Air Maroc (vol direct Casablanca – Médine)',
      hebergement: 'La Mecque - Plusieurs options',
      hotels: [
        {
          id: 'hotel1',
          nom: 'Mathaba',
          distance: '900m de la Mosquée',
          tarifsChambre: {
            quintuple: '',
            quadruple: '14500',
            triple: '15500',
            double: '16500'
          }
        },
        {
          id: 'hotel2',
          nom: 'Anjum',
          distance: 'Petit-déjeuner inclus',
          tarifsChambre: {
            quintuple: '',
            quadruple: '21500',
            triple: '22500',
            double: '24000'
          }
        },
        {
          id: 'hotel3',
          nom: 'Swiss Makkah',
          distance: 'Petit-déjeuner inclus',
          tarifsChambre: {
            quintuple: '',
            quadruple: '24500',
            triple: '26500',
            double: '29500'
          }
        }
      ],
      tarifsChambre: {
        quintuple: '',
        quadruple: '14500',
        triple: '15500',
        double: '16500'
      },
      servicesInclus: servicesDisponibles,
      image: '/offers/5.jpg',
      destination: 'Arabie Saoudite',
      duree: '12 jours',
      note: 4.6,
      nombrePersonnes: '18-35',
      dateCreation: new Date().toISOString(),
      statut: 'active',
      category: 'omra'
    },
    {
      id: 'omra-octobre-2',
      titre: 'Omra d\'octobre (09 – 21 octobre)',
      periode: 'Du 09 au 21 octobre',
      datesDisponibles: [
        {
          id: 'date1',
          dateDebut: '2024-10-09',
          dateFin: '2024-10-21',
          periode: 'Du 09 au 21 octobre 2024'
        }
      ],
      prixBase: 'À partir de 14 500 MAD',
      compagniesAeriennes: 'Royal Air Maroc',
      hebergement: 'La Mecque - Options premium',
      hotels: [
        {
          id: 'hotel1',
          nom: 'Mathaba',
          distance: '950m de la Mosquée',
          tarifsChambre: {
            quintuple: '',
            quadruple: '14500',
            triple: '15500',
            double: '16500'
          }
        },
        {
          id: 'hotel2',
          nom: 'Anjum',
          distance: 'Petit-déjeuner inclus',
          tarifsChambre: {
            quintuple: '',
            quadruple: '22000',
            triple: '23000',
            double: '25000'
          }
        },
        {
          id: 'hotel3',
          nom: 'Swiss Makkah',
          distance: 'Petit-déjeuner inclus',
          tarifsChambre: {
            quintuple: '',
            quadruple: '24500',
            triple: '26500',
            double: '29500'
          }
        }
      ],
      tarifsChambre: {
        quintuple: '',
        quadruple: '14500',
        triple: '15500',
        double: '16500'
      },
      servicesInclus: servicesDisponibles,
      image: '/offers/6.jpg',
      destination: 'Arabie Saoudite',
      duree: '12 jours',
      note: 4.8,
      nombrePersonnes: '20-40',
      dateCreation: new Date().toISOString(),
      statut: 'active',
      category: 'omra'
    },
    {
      id: 'omra-octobre-3',
      titre: 'Omra d\'octobre (13 – 23 octobre)',
      periode: 'Du 13 au 23 octobre',
      datesDisponibles: [
        {
          id: 'date1',
          dateDebut: '2024-10-13',
          dateFin: '2024-10-23',
          periode: 'Du 13 au 23 octobre 2024'
        }
      ],
      prixBase: 'À partir de 13 500 MAD',
      compagniesAeriennes: 'Royal Air Maroc',
      hebergement: 'La Mecque - Excellence',
      hotels: [
        {
          id: 'hotel1',
          nom: 'Mathaba',
          distance: '950m de la Mosquée',
          tarifsChambre: {
            quintuple: '',
            quadruple: '13500',
            triple: '14500',
            double: '15500'
          }
        },
        {
          id: 'hotel2',
          nom: 'Anjum',
          distance: 'Petit-déjeuner inclus',
          tarifsChambre: {
            quintuple: '',
            quadruple: '19000',
            triple: '20000',
            double: '22000'
          }
        },
        {
          id: 'hotel3',
          nom: 'Swiss Makkah',
          distance: 'Petit-déjeuner inclus',
          tarifsChambre: {
            quintuple: '',
            quadruple: '21500',
            triple: '22500',
            double: '25500'
          }
        },
        {
          id: 'hotel4',
          nom: 'Fairmont',
          distance: 'Petit-déjeuner inclus',
          tarifsChambre: {
            quintuple: '',
            quadruple: '22500',
            triple: '23500',
            double: '26500'
          }
        }
      ],
      tarifsChambre: {
        quintuple: '',
        quadruple: '13500',
        triple: '14500',
        double: '15500'
      },
      servicesInclus: servicesDisponibles,
      image: '/offers/7.jpg',
      destination: 'Arabie Saoudite',
      duree: '10 jours',
      note: 4.7,
      nombrePersonnes: '15-35',
      dateCreation: new Date().toISOString(),
      statut: 'active',
      category: 'omra'
    },
    {
      id: 'omra-turkish-airlines',
      titre: 'Omra d\'octobre avec Turkish Airlines',
      periode: 'Du 27 septembre au 10 octobre',
      datesDisponibles: [
        {
          id: 'date1',
          dateDebut: '2024-09-27',
          dateFin: '2024-10-10',
          periode: 'Du 27 septembre au 10 octobre 2024'
        }
      ],
      prixBase: 'À partir de 10 500 MAD',
      compagniesAeriennes: 'Turkish Airlines - Départ Marrakech → Djeddah (via Istanbul)',
      hebergement: 'La Mecque',
      hotels: [
        {
          id: 'hotel1',
          nom: 'Abraj Al-Tayssir',
          distance: '950m de la Mosquée',
          tarifsChambre: {
            quintuple: '10500',
            quadruple: '12500',
            triple: '12800',
            double: '13500'
          }
        }
      ],
      tarifsChambre: {
        quintuple: '10500',
        quadruple: '12500',
        triple: '12800',
        double: '13500'
      },
      servicesInclus: servicesDisponibles,
      image: '/offers/8.jpg',
      destination: 'Arabie Saoudite',
      duree: '13 jours',
      note: 4.5,
      nombrePersonnes: '20-40',
      dateCreation: new Date().toISOString(),
      statut: 'active',
      category: 'omra'
    },
    {
      id: 'hajj-2026',
      titre: 'Programmes Hajj 1447H / 2026',
      periode: 'Juin 2026',
      datesDisponibles: [
        {
          id: 'date1',
          dateDebut: '2026-06-15',
          dateFin: '2026-07-05',
          periode: 'Juin - Juillet 2026'
        }
      ],
      prixBase: 'À partir de 73 500 MAD',
      compagniesAeriennes: 'Vols directs',
      hebergement: 'Médine + La Mecque - Hôtels de luxe',
      hotels: [
        {
          id: 'hotel1',
          nom: 'Shaza Rayhansy / Al-Batoul Ajyad',
          distance: 'Proche des lieux saints',
          tarifsChambre: {
            quintuple: '73500',
            quadruple: '85000',
            triple: '90000',
            double: '95000'
          }
        },
        {
          id: 'hotel2',
          nom: 'Rotana Manana / Sandoud Ajyad',
          distance: 'Proche des lieux saints',
          tarifsChambre: {
            quintuple: '83000',
            quadruple: '93000',
            triple: '98000',
            double: '103000'
          }
        },
        {
          id: 'hotel3',
          nom: 'Sofitel / Makarim Ajyad – Marriott',
          distance: 'Premium location',
          tarifsChambre: {
            quintuple: '109000',
            quadruple: '122000',
            triple: '128000',
            double: '135000'
          }
        },
        {
          id: 'hotel4',
          nom: 'Dar Al-Iman Intercontinental / Swiss Makkah',
          distance: 'Luxe',
          tarifsChambre: {
            quintuple: '130000',
            quadruple: '148000',
            triple: '157000',
            double: '166000'
          }
        },
        {
          id: 'hotel5',
          nom: 'Dar Al-Iman Intercontinental / Fairmont',
          distance: 'Ultra luxe',
          tarifsChambre: {
            quintuple: '142000',
            quadruple: '164000',
            triple: '175000',
            double: '186000'
          }
        }
      ],
      tarifsChambre: {
        quintuple: '73500',
        quadruple: '85000',
        triple: '90000',
        double: '95000'
      },
      servicesInclus: [
        'Billet d\'avion aller-retour avec vols directs',
        'Hébergement dans les hôtels mentionnés',
        'Frais et démarches de visa',
        'Transferts en bus climatisés',
        'Visites à Médine et La Mecque',
        'Encadrement religieux et technique',
        'Licence du Hajj (lieux saints + services spéciaux)'
      ],
      image: '/offers/9.jpg',
      destination: 'Arabie Saoudite',
      duree: '20 jours',
      note: 5,
      nombrePersonnes: '30-50',
      dateCreation: new Date().toISOString(),
      statut: 'active',
      category: 'hajj'
    }
  ];
};

export type { Offre, Hotel, DateDisponible, TarifsChambre };
