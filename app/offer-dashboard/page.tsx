'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, X, Check, Search, Filter, Grid, List, Upload, MapPin, Calendar, Users, Star, Eye, Heart, MoreHorizontal, Bookmark, ChevronLeft, ChevronRight } from 'lucide-react';
import { Listbox, Transition } from '@headlessui/react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'react-day-picker/dist/style.css';
import { Calendar as HeroCalendar } from "@heroui/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { Calendar as ShadCalendar } from "@/components/ui/calendar";
import { Checkbox } from "@heroui/react";

// Types
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

// Services disponibles
const servicesDisponibles = [
  'Billet d\'avion aller-retour',
  'Hébergement en hôtels',
  'Frais et procédures de visa',
  'Transport en bus climatisés',
  'Visites de Médine et La Mecque',
  'Encadrement religieux et technique'
];

const statusOptions = [
  { value: 'active', label: 'Actif' },
  { value: 'inactive', label: 'Inactif' },
  { value: 'brouillon', label: 'Brouillon' }
];

const filterStatusOptions = [
  { value: 'all', label: 'Tous les statuts' },
  { value: 'active', label: 'Actif' },
  { value: 'inactive', label: 'Inactif' },
  { value: 'brouillon', label: 'Brouillon' }
];

const categoryOptions = [
  { value: 'omra', label: 'Omra' },
  { value: 'hajj', label: 'Hajj' }
];

const filterCategoryOptions = [
  { value: 'all', label: 'Toutes les catégories' },
  { value: 'omra', label: 'Omra' },
  { value: 'hajj', label: 'Hajj' }
];

const OffresDashboard = () => {
  const [offres, setOffres] = useState<Offre[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offre | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  
  const [formData, setFormData] = useState<Offre>({
    id: '',
    titre: '',
    periode: '',
    datesDisponibles: [],
    prixBase: '',
    compagniesAeriennes: '',
    hebergement: '',
    hotels: [],
    tarifsChambre: {
      quintuple: '',
      quadruple: '',
      triple: '',
      double: ''
    },
    servicesInclus: [],
    image: '',
    destination: '',
    duree: '',
    note: 5,
    nombrePersonnes: '',
    dateCreation: '',
    statut: 'active',
    category: 'omra'
  });

  const defaultDate = today(getLocalTimeZone());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateStep, setDateStep] = useState<'start' | 'end'>('start');
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [editingDateIndex, setEditingDateIndex] = useState<number>(-1);

  // Hotel management
  const [showHotelForm, setShowHotelForm] = useState(false);
  const [editingHotelIndex, setEditingHotelIndex] = useState<number>(-1);
  const [currentHotel, setCurrentHotel] = useState<Hotel>({
    id: '',
    nom: '',
    distance: '',
    tarifsChambre: {
      quintuple: '',
      quadruple: '',
      triple: '',
      double: ''
    }
  });

  const formatPeriode = (start?: Date, end?: Date) => {
    if (!start || !end) return '';
    const options = { day: '2-digit', month: 'long', year: 'numeric' } as const;
    return `Du ${start.toLocaleDateString('fr-FR', options)} au ${end.toLocaleDateString('fr-FR', options)}`;
  };

  // Load data
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedOffres = JSON.parse(localStorage.getItem('offres') || '[]');
      if (savedOffres.length === 0) {
        const sampleOffres: Offre[] = [
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
        setOffres(sampleOffres);
      } else {
        setOffres(savedOffres);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('offres', JSON.stringify(offres));
    }
  }, [offres]);

  const resetForm = () => {
    setFormData({
      id: '',
      titre: '',
      periode: '',
      datesDisponibles: [],
      prixBase: '',
      compagniesAeriennes: '',
      hebergement: '',
      hotels: [],
      tarifsChambre: {
        quintuple: '',
        quadruple: '',
        triple: '',
        double: ''
      },
      servicesInclus: [],
      image: '',
      destination: '',
      duree: '',
      note: 5,
      nombrePersonnes: '',
      dateCreation: '',
      statut: 'active',
      category: 'omra'
    });
    setEditingOffer(null);
  };

  const openAddForm = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const openEditForm = (offre: Offre) => {
    setFormData(offre);
    setEditingOffer(offre);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    resetForm();
  };

  const handleSubmit = () => {
    if (!formData.titre || !formData.destination) {
      return;
    }
    
    if (editingOffer) {
      setOffres(offres.map(offre => 
        offre.id === editingOffer.id ? formData : offre
      ));
    } else {
      const nouvelleOffre = {
        ...formData,
        id: Date.now().toString(),
        dateCreation: new Date().toISOString()
      };
      setOffres([nouvelleOffre, ...offres]);
    }
    
    closeForm();
  };

  const deleteOffre = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) {
      setOffres(offres.filter(offre => offre.id !== id));
    }
  };

  const handleServiceToggle = (service: string) => {
    const servicesUpdated = formData.servicesInclus.includes(service)
      ? formData.servicesInclus.filter(s => s !== service)
      : [...formData.servicesInclus, service];
    
    setFormData({
      ...formData,
      servicesInclus: servicesUpdated
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({
          ...formData,
          image: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Date management functions
  const addNewDate = () => {
    setShowDatePicker(true);
    setDateStep('start');
    setStartDate(undefined);
    setEndDate(undefined);
    setEditingDateIndex(-1);
  };

  const editDate = (index: number) => {
    const dateToEdit = formData.datesDisponibles[index];
    setStartDate(new Date(dateToEdit.dateDebut));
    setEndDate(new Date(dateToEdit.dateFin));
    setEditingDateIndex(index);
    setShowDatePicker(true);
    setDateStep('start');
  };

  const saveDate = () => {
    if (!startDate || !endDate) return;

    const newDate: DateDisponible = {
      id: editingDateIndex >= 0 ? formData.datesDisponibles[editingDateIndex].id : Date.now().toString(),
      dateDebut: startDate.toISOString().split('T')[0],
      dateFin: endDate.toISOString().split('T')[0],
      periode: formatPeriode(startDate, endDate)
    };

    let updatedDates = [...formData.datesDisponibles];
    if (editingDateIndex >= 0) {
      updatedDates[editingDateIndex] = newDate;
    } else {
      updatedDates.push(newDate);
    }

    setFormData({
      ...formData,
      datesDisponibles: updatedDates
    });

    setShowDatePicker(false);
    setEditingDateIndex(-1);
  };

  const deleteDate = (index: number) => {
    const updatedDates = formData.datesDisponibles.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      datesDisponibles: updatedDates
    });
  };

  // Hotel management functions
  const addNewHotel = () => {
    setCurrentHotel({
      id: '',
      nom: '',
      distance: '',
      tarifsChambre: {
        quintuple: '',
        quadruple: '',
        triple: '',
        double: ''
      }
    });
    setEditingHotelIndex(-1);
    setShowHotelForm(true);
  };

  const editHotel = (index: number) => {
    setCurrentHotel(formData.hotels[index]);
    setEditingHotelIndex(index);
    setShowHotelForm(true);
  };

  const saveHotel = () => {
    if (!currentHotel.nom) return;

    const hotel = {
      ...currentHotel,
      id: editingHotelIndex >= 0 ? currentHotel.id : Date.now().toString()
    };

    let updatedHotels = [...formData.hotels];
    if (editingHotelIndex >= 0) {
      updatedHotels[editingHotelIndex] = hotel;
    } else {
      updatedHotels.push(hotel);
    }

    setFormData({
      ...formData,
      hotels: updatedHotels
    });

    setShowHotelForm(false);
    setEditingHotelIndex(-1);
  };

  const deleteHotel = (index: number) => {
    const updatedHotels = formData.hotels.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      hotels: updatedHotels
    });
  };

  const filteredOffres = offres.filter(offre => {
    const matchesSearch = offre.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offre.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || offre.statut === filterStatus;
    const matchesCategory = filterCategory === 'all' || offre.category === filterCategory;
    return matchesSearch && matchesFilter && matchesCategory;
  });

  // Group offers by category
  const groupedOffres = filteredOffres.reduce((acc, offre) => {
    if (!acc[offre.category]) {
      acc[offre.category] = [];
    }
    acc[offre.category].push(offre);
    return acc;
  }, {} as Record<string, Offre[]>);

  const getCategoryTitle = (category: string) => {
    return category === 'omra' ? 'Offres Omra' : 'Offres Hajj';
  };

  const getCategoryIcon = (category: string) => {
    return category === 'omra' ? '🕌' : '🕋';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-20">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestion des Offres</h1>
              <p className="text-sm text-gray-500 mt-1">Créez et gérez vos offres de voyage</p>
            </div>
            
            <button
              onClick={openAddForm}
              className="bg-amber-400 hover:bg-amber-500 text-black px-6 py-2.5 rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              <span>Nouvelle Offre</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Filters */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent w-80 text-sm"
              />
            </div>
            
            <div className="w-56">
              <Listbox
                value={filterStatus}
                onChange={setFilterStatus}
              >
                <div className="relative">
                  <Listbox.Button className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-400 focus:border-transparent flex justify-between items-center">
                    {filterStatusOptions.find(opt => opt.value === filterStatus)?.label}
                    <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" viewBox="0 0 20 20">
                      <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Listbox.Button>
                  <Transition
                    as={React.Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                      {filterStatusOptions.map(option => (
                        <Listbox.Option
                          key={option.value}
                          value={option.value}
                          className={({ active }) =>
                            `cursor-pointer select-none px-4 py-2 text-sm ${
                              active ? 'bg-amber-50 text-amber-700' : 'text-gray-700'
                            }`
                          }
                        >
                          {option.label}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>

            <div className="w-56">
              <Listbox
                value={filterCategory}
                onChange={setFilterCategory}
              >
                <div className="relative">
                  <Listbox.Button className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-400 focus:border-transparent flex justify-between items-center">
                    {filterCategoryOptions.find(opt => opt.value === filterCategory)?.label}
                    <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" viewBox="0 0 20 20">
                      <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Listbox.Button>
                  <Transition
                    as={React.Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                      {filterCategoryOptions.map(option => (
                        <Listbox.Option
                          key={option.value}
                          value={option.value}
                          className={({ active }) =>
                            `cursor-pointer select-none px-4 py-2 text-sm ${
                              active ? 'bg-amber-50 text-amber-700' : 'text-gray-700'
                            }`
                          }
                        >
                          {option.label}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewMode === 'grid' 
                ? 'bg-amber-400 text-black' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewMode === 'list' 
                ? 'bg-amber-400 text-black' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        {filteredOffres.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune offre trouvée</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {searchTerm ? 'Aucune offre ne correspond à votre recherche.' : 'Commencez par créer votre première offre de voyage.'}
            </p>
            <button
              onClick={openAddForm}
              className="bg-amber-400 hover:bg-amber-500 text-black px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Créer une offre
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedOffres).map(([category, categoryOffres]) => (
              <div key={category}>
                {/* Category Title */}
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-2xl">{getCategoryIcon(category)}</span>
                  <h2 className="text-2xl font-bold text-gray-900">{getCategoryTitle(category)}</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent"></div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {categoryOffres.length} offre{categoryOffres.length > 1 ? 's' : ''}
                  </span>
                </div>

                {/* Category Offers */}
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-4'}>
                  {categoryOffres.map((offre) => (
                    <div
                      key={offre.id}
                      className={`group bg-white/80 backdrop-blur-sm rounded-3xl border border-neutral-200/60 overflow-hidden hover:shadow-2xl hover:border-neutral-300/60 transition-all duration-500 ${
                        viewMode === 'list' ? 'flex' : ''
                      }`}
                    >
                      <div className={`${viewMode === 'list' ? 'w-64 flex-shrink-0' : ''} relative`}>
                        <div className={`${viewMode === 'list' ? 'h-full' : 'h-64'} bg-gradient-to-br from-neutral-200 to-neutral-300 relative overflow-hidden`}>
                          <img
                            src={offre.image || 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&h=600&fit=crop'}
                            alt={offre.titre}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                          
                          <div className="absolute top-4 left-4 flex items-center space-x-2">
                            <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                              offre.statut === 'active' ? 'bg-emerald-100 text-emerald-700' :
                              offre.statut === 'inactive' ? 'bg-red-100 text-red-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {offre.statut === 'active' ? 'Actif' : offre.statut === 'inactive' ? 'Inactif' : 'Brouillon'}
                            </span>
                            <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                              offre.category === 'omra' ? 'bg-sky-100 text-sky-700' : 'bg-purple-100 text-purple-700'
                            }`}>
                              {offre.category === 'omra' ? 'Omra' : 'Hajj'}
                            </span>
                          </div>
                          
                          <div className="absolute top-4 right-4">
                            <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1.5">
                              <Star className="w-4 h-4 text-amber-400 fill-current" />
                              <span className="text-sm font-medium text-white">{offre.note}</span>
                            </div>
                          </div>

                          <div className="absolute bottom-4 right-4">
                            <div className="flex items-center space-x-2">
                              <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200">
                                <Heart className="w-4 h-4" />
                              </button>
                              <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200">
                                <Bookmark className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-8 flex-1">
                        <div className="mb-6">
                          <h3 className="text-2xl font-light text-neutral-800 mb-3 leading-tight">
                            {offre.titre}
                          </h3>
                          <p className="text-neutral-600 font-light">{offre.periode}</p>
                        </div>
                        
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center text-sm text-neutral-600">
                            <MapPin className="w-4 h-4 mr-3 text-emerald-500" />
                            <span className="font-light">{offre.destination}</span>
                          </div>
                          <div className="flex items-center text-sm text-neutral-600">
                            <Calendar className="w-4 h-4 mr-3 text-emerald-500" />
                            <span className="font-light">{offre.datesDisponibles.length > 0 ? `${offre.datesDisponibles.length} dates disponibles` : offre.duree}</span>
                          </div>
                          <div className="flex items-center text-sm text-neutral-600">
                            <Users className="w-4 h-4 mr-3 text-emerald-500" />
                            <span className="font-light">{offre.nombrePersonnes} personnes • {offre.duree}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {offre.servicesInclus.slice(0, 2).map((service, index) => (
                            <span
                              key={index}
                              className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs rounded-full font-light"
                            >
                              {service.length > 20 ? service.substring(0, 20) + '...' : service}
                            </span>
                          ))}
                          {offre.servicesInclus.length > 2 && (
                            <span className="px-3 py-1.5 bg-neutral-100 text-neutral-600 text-xs rounded-full font-light">
                              +{offre.servicesInclus.length - 2}
                            </span>
                          )}
                        </div>

                        {offre.hotels.length > 0 && (
                          <div className="mb-6">
                            <p className="text-xs text-neutral-500 mb-2 font-light">{offre.hotels.length} hôtel{offre.hotels.length > 1 ? 's' : ''} disponible{offre.hotels.length > 1 ? 's' : ''}</p>
                            <div className="flex flex-wrap gap-2">
                              {offre.hotels.slice(0, 2).map((hotel, index) => (
                                <span key={index} className="px-3 py-1 bg-sky-50 text-sky-700 text-xs rounded-full font-light">
                                  {hotel.nom}
                                </span>
                              ))}
                              {offre.hotels.length > 2 && (
                                <span className="px-3 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full font-light">
                                  +{offre.hotels.length - 2}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
                          <div>
                            <p className="text-2xl font-light text-neutral-800">
                              {offre.prixBase}
                            </p>
                            <p className="text-xs text-neutral-500 font-light">par personne</p>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => openEditForm(offre)}
                              className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-full transition-colors duration-200"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteOffre(offre.id)}
                              className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-full transition-colors duration-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <div className="flex items-center text-emerald-600 ml-2">
                              <span className="text-sm font-light mr-2">Gérer</span>
                              <MoreHorizontal className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900">
                {editingOffer ? 'Modifier l\'offre' : 'Nouvelle offre'}
              </h3>
              <button
                onClick={closeForm}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie *</label>
                      <Listbox
                        value={formData.category}
                        onChange={(value) => setFormData({...formData, category: value as any})}
                      >
                        <div className="relative">
                          <Listbox.Button className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-amber-400 focus:border-transparent flex justify-between items-center">
                            {categoryOptions.find(opt => opt.value === formData.category)?.label}
                            <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" viewBox="0 0 20 20">
                              <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </Listbox.Button>
                          <Transition
                            as={React.Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                              {categoryOptions.map(option => (
                                <Listbox.Option
                                  key={option.value}
                                  value={option.value}
                                  className={({ active }) =>
                                    `cursor-pointer select-none px-4 py-2 text-sm ${
                                      active ? 'bg-amber-50 text-amber-700' : 'text-gray-700'
                                    }`
                                  }
                                >
                                  {option.label}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                      <Listbox
                        value={formData.statut}
                        onChange={(value) => setFormData({...formData, statut: value as any})}
                      >
                        <div className="relative">
                          <Listbox.Button className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-amber-400 focus:border-transparent flex justify-between items-center">
                            {statusOptions.find(opt => opt.value === formData.statut)?.label}
                            <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" viewBox="0 0 20 20">
                              <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </Listbox.Button>
                          <Transition
                            as={React.Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                              {statusOptions.map(option => (
                                <Listbox.Option
                                  key={option.value}
                                  value={option.value}
                                  className={({ active }) =>
                                    `cursor-pointer select-none px-4 py-2 text-sm ${
                                      active ? 'bg-amber-50 text-amber-700' : 'text-gray-700'
                                    }`
                                  }
                                >
                                  {option.label}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Titre de l'offre *</label>
                    <input
                      type="text"
                      value={formData.titre}
                      onChange={(e) => setFormData({...formData, titre: e.target.value})}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm"
                      placeholder="Ex: Omra Premium - Ramadan 2024"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Destination *</label>
                      <input
                        type="text"
                        value={formData.destination}
                        onChange={(e) => setFormData({...formData, destination: e.target.value})}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm"
                        placeholder="Ex: Arabie Saoudite"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Durée</label>
                      <input
                        type="text"
                        value={formData.duree}
                        onChange={(e) => setFormData({...formData, duree: e.target.value})}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm"
                        placeholder="Ex: 15 jours"
                      />
                    </div>
                  </div>

                  {/* Dates disponibles */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-gray-700">Dates disponibles</label>
                      <button
                        type="button"
                        onClick={addNewDate}
                        className="text-sm bg-amber-400 hover:bg-amber-500 text-black px-3 py-1.5 rounded-lg font-medium flex items-center space-x-1 transition-colors duration-200"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Ajouter</span>
                      </button>
                    </div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {formData.datesDisponibles.map((date, index) => (
                        <div key={date.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                          <span className="text-sm text-gray-700">{date.periode}</span>
                          <div className="flex items-center space-x-1">
                            <button
                              type="button"
                              onClick={() => editDate(index)}
                              className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors duration-200"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteDate(index)}
                              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                      {formData.datesDisponibles.length === 0 && (
                        <p className="text-sm text-gray-500 text-center py-4">Aucune date ajoutée</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Prix de base</label>
                      <input
                        type="text"
                        value={formData.prixBase}
                        onChange={(e) => setFormData({...formData, prixBase: e.target.value})}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm"
                        placeholder="Ex: À partir de 20 500 DH"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de personnes</label>
                      <input
                        type="text"
                        value={formData.nombrePersonnes}
                        onChange={(e) => setFormData({...formData, nombrePersonnes: e.target.value})}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm"
                        placeholder="Ex: 25-40"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image de l'offre</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-amber-400 transition-colors duration-200">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        {formData.image ? (
                          <img src={formData.image} alt="Preview" className="w-full h-24 object-cover rounded-lg mb-2" />
                        ) : (
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        )}
                        <p className="text-sm text-gray-500">Cliquez pour ajouter une image</p>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Compagnies aériennes</label>
                    <input
                      type="text"
                      value={formData.compagniesAeriennes}
                      onChange={(e) => setFormData({...formData, compagniesAeriennes: e.target.value})}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm"
                      placeholder="Ex: Aegean Airlines (أثينا – جدة)"
                    />
                  </div>

                  {/* Hotels management */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-gray-700">Hôtels disponibles</label>
                      <button
                        type="button"
                        onClick={addNewHotel}
                        className="text-sm bg-amber-400 hover:bg-amber-500 text-black px-3 py-1.5 rounded-lg font-medium flex items-center space-x-1 transition-colors duration-200"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Ajouter</span>
                      </button>
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {formData.hotels.map((hotel, index) => (
                        <div key={hotel.id} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">{hotel.nom}</span>
                            <div className="flex items-center space-x-1">
                              <button
                                type="button"
                                onClick={() => editHotel(index)}
                                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors duration-200"
                              >
                                <Edit3 className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteHotel(index)}
                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          {hotel.distance && (
                            <p className="text-xs text-gray-500 mb-2">{hotel.distance}</p>
                          )}
                          <div className="grid grid-cols-2 gap-1 text-xs">
                            {Object.entries(hotel.tarifsChambre).map(([type, prix]) => (
                              prix && (
                                <span key={type} className="bg-white px-2 py-1 rounded text-gray-600">
                                  {type}: {prix} DH
                                </span>
                              )
                            ))}
                          </div>
                        </div>
                      ))}
                      {formData.hotels.length === 0 && (
                        <p className="text-sm text-gray-500 text-center py-4">Aucun hôtel ajouté</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hébergement général</label>
                    <textarea
                      value={formData.hebergement}
                      onChange={(e) => setFormData({...formData, hebergement: e.target.value})}
                      rows={2}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm resize-none"
                      placeholder="Ex: Médine + La Mecque"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tarifs généraux (DH)</label>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(formData.tarifsChambre).map(([type, prix]) => (
                        <div key={type}>
                          <label className="block text-xs font-medium text-gray-600 mb-1 capitalize">{type}</label>
                          <input
                            type="text"
                            value={prix}
                            onChange={(e) => setFormData({
                              ...formData,
                              tarifsChambre: {
                                ...formData.tarifsChambre,
                                [type]: e.target.value
                              }
                            })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm"
                            placeholder="Prix en DH"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Note</label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        value={formData.note}
                        onChange={(e) => setFormData({...formData, note: parseFloat(e.target.value)})}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm"
                      />
                    </div>
                    <div className="opacity-0 pointer-events-none">
                      {/* Spacer for layout */}
                    </div>
                  </div>
                </div>
              </div>

              {/* Services inclus */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Services inclus</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {servicesDisponibles.map((service) => (
                    <label key={service} className="flex items-center space-x-3 rounded-lg px-4 py-3 cursor-pointer hover:bg-amber-50 transition-colors duration-200">
                      <Checkbox
                        isSelected={formData.servicesInclus.includes(service)}
                        onChange={() => handleServiceToggle(service)}
                        className="h-4 w-4"
                        aria-label={service}
                      />
                      <span className="text-gray-700 text-sm">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end space-x-3 mt-8">
                <button
                  onClick={closeForm}
                  className="px-6 py-2.5 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors duration-200"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2.5 rounded-lg bg-amber-400 text-black font-medium hover:bg-amber-500 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingOffer ? 'Enregistrer' : 'Créer l\'offre'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Date Picker Modal */}
      {showDatePicker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-60">
          <div className="bg-white rounded-xl shadow-2xl">
            <div className="p-4">
              {dateStep === 'start' && (
                <>
                  <span className="block text-sm font-medium text-gray-700 mb-2">Date de début</span>
                  <ShadCalendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => {
                      if (date) {
                        setStartDate(date);
                        setDateStep('end');
                      }
                    }}
                    initialFocus
                    className="w-[280px] mx-auto text-xs"
                    components={{
                      Caption: ({ displayMonth, goToPreviousMonth, goToNextMonth }) => (
                        <CalendarHeader
                          month={displayMonth.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })}
                          onPrev={goToPreviousMonth}
                          onNext={goToNextMonth}
                        />
                      )
                    }}
                  />
                  <div className="flex justify-end mt-4">
                    <button
                      className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm"
                      onClick={() => setShowDatePicker(false)}
                    >
                      Annuler
                    </button>
                  </div>
                </>
              )}
              {dateStep === 'end' && (
                <>
                  <span className="block text-sm font-medium text-gray-700 mb-2">Date de fin</span>
                  <ShadCalendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={date => startDate ? date < startDate : false}
                    initialFocus
                    className="w-[280px] mx-auto text-xs"
                    components={{
                      Caption: ({ displayMonth, goToPreviousMonth, goToNextMonth }) => (
                        <CalendarHeader
                          month={displayMonth.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })}
                          onPrev={goToPreviousMonth}
                          onNext={goToNextMonth}
                        />
                      )
                    }}
                  />
                  <div className="flex justify-between mt-4">
                    <button
                      className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm"
                      onClick={() => {
                        setDateStep('start');
                        setEndDate(undefined);
                      }}
                    >
                      Retour
                    </button>
                    <button
                      className="px-4 py-2 rounded bg-amber-400 text-black hover:bg-amber-500 text-sm"
                      onClick={saveDate}
                      disabled={!startDate || !endDate}
                    >
                      Valider
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hotel Form Modal */}
      {showHotelForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-60">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingHotelIndex >= 0 ? 'Modifier l\'hôtel' : 'Ajouter un hôtel'}
              </h3>
              <button
                onClick={() => setShowHotelForm(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom de l'hôtel *</label>
                <input
                  type="text"
                  value={currentHotel.nom}
                  onChange={(e) => setCurrentHotel({...currentHotel, nom: e.target.value})}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm"
                  placeholder="Ex: Dyar Al-Orouba"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Distance / Localisation</label>
                <input
                  type="text"
                  value={currentHotel.distance || ''}
                  onChange={(e) => setCurrentHotel({...currentHotel, distance: e.target.value})}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm"
                  placeholder="Ex: 800m de la Mosquée"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tarifs par chambre (DH)</label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(currentHotel.tarifsChambre).map(([type, prix]) => (
                    <div key={type}>
                      <label className="block text-xs font-medium text-gray-600 mb-1 capitalize">{type}</label>
                      <input
                        type="text"
                        value={prix}
                        onChange={(e) => setCurrentHotel({
                          ...currentHotel,
                          tarifsChambre: {
                            ...currentHotel.tarifsChambre,
                            [type]: e.target.value
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm"
                        placeholder="Prix en DH"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowHotelForm(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors duration-200"
                >
                  Annuler
                </button>
                <button
                  onClick={saveHotel}
                  className="px-4 py-2 rounded-lg bg-amber-400 text-black font-medium hover:bg-amber-500 transition-colors duration-200"
                  disabled={!currentHotel.nom}
                >
                  {editingHotelIndex >= 0 ? 'Enregistrer' : 'Ajouter'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper for custom calendar header
function CalendarHeader({ month, onPrev, onNext }: { month: string; onPrev: () => void; onNext: () => void }) {
  return (
    <div className="flex items-center justify-between mb-2">
      <button
        type="button"
        className="p-1 rounded hover:bg-gray-100"
        onClick={onPrev}
        aria-label="Mois précédent"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <span className="text-sm font-medium text-gray-900">{month}</span>
      <button
        type="button"
        className="p-1 rounded hover:bg-gray-100"
        onClick={onNext}
        aria-label="Mois suivant"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export default OffresDashboard;