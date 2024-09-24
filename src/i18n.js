// src/i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { SNACKBAR_ACTIONS } from './utils/constants';

// Translation files
const resources = {
  en: {
    translation: {
      title: 'Expense Tracker',
      language: 'Language',
      add: 'Add',
      delete: 'Delete',
      edit: 'Edit',
      save: 'Save',
      serialNo: 'Sno.',
      inflowType: 'INFLOW TYPE',
      outflowType: 'OUTFLOW TYPE',
      amount: 'AMOUNT',
      reset: 'RESET',
      actions: 'ACTIONS',
      noExpensesFound: 'NO EXPENSES FOUND',
      [SNACKBAR_ACTIONS.ADD_EXPENSE]: 'Expense added successfully',
      [SNACKBAR_ACTIONS.EDIT_EXPENSE]: 'Expense modified successfully',
      [SNACKBAR_ACTIONS.DELETE_EXPENSE]: 'Expense deleted successfully',
    },
  },
  fr: {
    translation: {
      title: 'Suivi des dépenses',
      language: 'Langue',
      add: 'Ajouter',
      delete: 'Supprimer',
      edit: 'Modifier',
      save: 'Sauvegarder',
      serialNo: 'Sn.',
      inflowType: "TYPE D'AFFLUX",
      outflowType: "TYPE DE SORTIE",
      amount: 'MONTANTE',
      reset: 'RÉINITIALISER',
      actions: 'ACTES',
      noExpensesFound: 'AUCUNE FRAIS TROUVÉ',
      [SNACKBAR_ACTIONS.ADD_EXPENSE]: 'Dépense ajoutée avec succès',
      [SNACKBAR_ACTIONS.EDIT_EXPENSE]: 'Dépense modifiée avec succès',
      [SNACKBAR_ACTIONS.DELETE_EXPENSE]: 'Dépense supprimée avec succès',
    },
  },
  // Add more languages here
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
