export interface Event {
  dayIndex: number;
  name: string;
  category: 'personal' | 'work' | 'other';
  time: string;
}
