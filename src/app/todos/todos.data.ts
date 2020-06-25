import { Injectable } from '@angular/core';
import { Todos } from './todos.model';

@Injectable({
  providedIn: 'root',
})
export class TodosData {
  get Todos(): Todos[] {
    return todoList;
  }
}

/**
 * This hardcoded TODO List must be maintained by the programmer during Development.
 */
const todoList: Todos[] = [
  {
    id: 1,
    todo: 'Komponente zur Verwaltung der Todos erstellen',
    category: 'Todos',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 2,
    todo: 'offene Aufgaben als hardcodierten Array erledgen',
    category: 'Todos',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 3,
    todo: 'Progressbar fuer offene Aufgaben',
    category: 'Todos',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 4,
    todo: 'Todos sortieren, filtern & Pagination',
    category: 'Todos',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 5,
    todo: 'Header, Menüs und Routing erstellen',
    category: 'Framework',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 6,
    todo: 'Sidenav erstellen',
    category: 'Framework',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 7,
    todo: 'Willkommens-Seite erstellen',
    category: 'Framework',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 8,
    todo: 'Login Formular erstellen',
    category: 'Login',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 9,
    todo: 'Login und Logout in firebase',
    category: 'Login',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 10,
    todo: 'Menüpunkte abhängig von Login anzeigen',
    category: 'Login',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 11,
    todo: 'Datenmodell in app und firebase erstellen',
    category: 'Kurse',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 12,
    todo: 'Testdaten für Anzeige in firebase erfassen',
    category: 'Kurse',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 13,
    todo: 'Kurs-Übersicht als aufklappbares Akkordeon anzeigen',
    category: 'Kurse',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 14,
    todo: 'Detaildaten eines Kurses anzeigen',
    category: 'Kurse',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 15,
    todo: 'Formular zum Erfassen/Ändern der Kursdaten erstellen',
    category: 'Kurse',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 16,
    todo: 'Kursdaten in firebase speichern',
    category: 'Kurse',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 17,
    todo: 'Kursbestätigungs-Image auswählen/anzeigen und speichern',
    category: 'Kurs-Bestätigung',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 18,
    todo: 'Datenerfassung: Kurse mittels App erfassen',
    category: 'Kurse',
    type: 'neu',
    status: 'offen',
  },
  {
    id: 19,
    todo: 'Konzept für Kursdatenanzeige erstellen',
    category: 'Kurse',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 20,
    todo: 'Konzept für Kursverwaltung erstellen',
    category: 'Kurse verwalten',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 21,
    todo: 'Entitäten für Dropdowns definieren, div. Tech.Stack',
    category: 'Optimierungen',
    type: 'neu',
    status: 'offen',
  },
  {
    id: 22,
    todo: 'Generisches Wartungs-Programm für Filter erstellen',
    category: 'Optimierungen',
    type: 'neu',
    status: 'offen',
  },
  {
    id: 23,
    todo: 'div. Entitäten in Firebase erstellen',
    category: 'Optimierungen',
    type: 'neu',
    status: 'offen',
  },
  {
    id: 24,
    todo: 'Einbinden der Stammdaten-Programme in Framework',
    category: 'Optimierungen',
    type: 'neu',
    status: 'offen',
  },
  {
    id: 25,
    todo: 'Temp.Solution: hardcodierte Filterarrays - später Speichern in DB',
    category: 'Kurse verwalten',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 26,
    todo: 'Kurs löschen',
    category: 'Kurse verwalten',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 27,
    todo:
      'eigenen Testuser erstellen, damit auch Kursverwaltung freigeschaltet wird',
    category: 'Admin-Funktion freigeben',
    type: 'neu',
    status: 'offen',
  },
  {
    id: 28,
    todo: 'eigene Collection für Kurse durch Testuser erstellen',
    category: 'Admin-Funktion freigeben',
    type: 'neu',
    status: 'offen',
  },
  {
    id: 29,
    todo: 'Switchen zwischen Zoe-Kursen und user-defierten Kursen',
    category: 'Admin-Funktion freigeben',
    type: 'neu',
    status: 'offen',
  },
  {
    id: 30,
    todo: 'User/Password je App in DB speichern, da Abweichung',
    category: 'Kurse verwalten',
    type: 'neu',
    status: 'offen',
  },
  {
    id: 31,
    todo: 'Datumscontrol verwenden ',
    category: 'Kurse verwalten',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 32,
    todo: 'Status-Informationen mittels Snackbar anzeigen',
    category: 'Kurse',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 33,
    todo: 'Header: sticky und 2zeilig',
    category: 'Optimierungen',
    type: 'neu',
    status: 'offen',
  },
  {
    id: 34,
    todo: 'Kursbestätigungs-Image aus FileSystem auswählen',
    category: 'Kurs-Bestätigung',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 35,
    todo: 'Kursbestätigungs-Image in Formular anzeigen',
    category: 'Kurs-Bestätigung',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 36,
    todo: 'Kursbestätigungs-Image in Firebase speichern',
    category: 'Kurs-Bestätigung',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 37,
    todo: 'Kursbestätigungs-Image aus Firebase abrufen',
    category: 'Kurs-Bestätigung',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 38,
    todo:
      'Alle Repos von zoe anzeigen mit wichtigsten Infos, zB $ curl -i https://api.github.com/users/zoechbauer/repos',
    category: 'Github-api',
    type: 'neu',
    status: 'offen',
  },
  {
    id: 39,
    todo:
      'Github Detailinfos zu best. Repo anzeigen zB. Zeitraum von-bis, zB. curl -i https://api.github.com/repos/zoechbauer/ng-courses',
    category: 'Github-api',
    type: 'neu',
    status: 'offen',
  },
  {
    id: 40,
    todo: 'Eigener Menüpunkt mit Untermenüs für autom. Github-Auswertungen',
    category: 'Github-api',
    type: 'neu',
    status: 'offen',
  },
  {
    id: 41,
    todo:
      'Kurs-Liste Kurs-Datum & Dauer verschwinden bei allen Kursen, wenn 1 Kurs geöffnet wird',
    category: 'Kurse',
    type: 'Bug',
    status: 'erledigt',
  },
  {
    id: 42,
    todo: 'Progress-Spinner bei Laden Image anzeigen',
    category: 'Kurse',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 44,
    todo: 'login in localStorage speichern - refresh',
    category: 'login',
    type: 'Optimierung',
    status: 'erledigt',
  },
  {
    id: 43,
    todo:
      'ui.service.ts - vgl. fitness-tracker vor ngrx => wurde anders gelöst',
    category: 'login',
    type: 'Optimierung',
    status: 'erledigt',
  },
  {
    id: 44,
    todo: 'Progress-Spinner bei DB-read anzeigen',
    category: 'Kurse',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 45,
    todo: 'Fehlermeldungen anzeigen',
    category: 'Kurse',
    type: 'Optimierung',
    status: 'erledigt',
  },
  {
    id: 46,
    todo: 'Umstellen auf Reactive Design',
    category: 'RxJs',
    type: 'Optimierung',
    status: 'erledigt',
  },
  {
    id: 47,
    todo: 'Image hochladen Control nur anzeigen wenn Click auf neuen Button',
    category: 'Kurs verwalten',
    type: 'Layout',
    status: 'erledigt',
  },
  {
    id: 48,
    todo: 'Menu Item und Formular implementieren',
    category: 'Kurs filtern',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 49,
    todo:
      'Alle Kurse aus Firebase lesen u im Speicher nach div. Kriterien filtern',
    category: 'Kurs filtern',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 50,
    todo: 'Master-Detail Design Pattern verwenden',
    category: 'Kurs filtern',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 51,
    todo: 'Logo Bezeichnung und Icon in Config speichern',
    category: 'Optimierung',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 52,
    todo: 'Tabellenspalten responsive definieren',
    category: 'Kurs filtern',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 53,
    todo: 'Responsive Layout bei TODO-Liste',
    category: 'Todos',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 54,
    todo: 'System-Doku mittels Compodoc erstellen',
    category: 'Dokumentation',
    type: 'neu',
    status: 'erledigt',
  },
  {
    id: 55,
    todo: 'Flackern bei Kursliste',
    category: 'Optimierung',
    type: 'Bug',
    status: 'erledigt',
  },
  {
    id: 56,
    todo: 'Einige Beispiele für Unit Test',
    category: 'Unit Test',
    type: 'neu',
    status: 'aktiv',
  },
];
